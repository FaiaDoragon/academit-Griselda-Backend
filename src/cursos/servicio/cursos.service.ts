import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cursos } from 'src/shared/entities/Cursos';
import { Repository } from 'typeorm';
import { CreateCursoDto, VideoDto, MaterialDto } from '../dto/create-curso.dto';
import { Videos } from 'src/shared/entities/Videos';
import { MaterialesDeVideo } from 'src/shared/entities/MaterialesDeVideo';

@Injectable()
export class CursosService {
  private readonly logger = new Logger(CursosService.name);

  constructor(
    @InjectRepository(Cursos)
    private cursoRepository: Repository<Cursos>,
    @InjectRepository(Videos)
    private videosRepository: Repository<Videos>,
    @InjectRepository(MaterialesDeVideo)
    private materialesRepository: Repository<MaterialesDeVideo>,
  ) { }

  async obtenerTodos(pagina: number, tamaño: number) {
    this.logger.log(`Obteniendo todos los cursos - Página: ${pagina}, Tamaño: ${tamaño}`);
    const [result, total] = await this.cursoRepository.findAndCount({
      skip: (pagina - 1) * tamaño,
      take: tamaño,
      relations: ['videos', 'materiales'], // Incluir las relaciones de videos y materiales
    });

    const cursosConDetalles = result.map(curso => {
      return {
        ...curso,
        videos: curso.videos.map(video => ({
          id: video.idCurso,
          titulo: video.tituloVideo,
          duracion: video.duracionVideo,
          ruta: video.pathDelVideo,
          estado: video.estado,
        })),
        materiales: curso.materiales.map(material => ({
          id: material.idMaterial,
          nombre: material.nombre,
          ruta: material.ruta,
        })),
      };
    });

    if (!result.length) {
      return {
        data: [],
        statusCode: 200,
        message: 'No se encontraron cursos',
        pagination: {
          total,
          pagina,
          tamaño,
          totalPaginas: Math.ceil(total / tamaño),
        },
      };
    }

    return {
      data: cursosConDetalles,
      statusCode: 200,
      message: 'Lista de cursos obtenida exitosamente',
      pagination: {
        total,
        pagina,
        tamaño,
        totalPaginas: Math.ceil(total / tamaño),
      },
    };
  }

  async crearCursos(cursoNuevo: CreateCursoDto, videosFiles: Express.Multer.File[], materialesFiles: Express.Multer.File[]) {
    this.logger.log('Creando un nuevo curso');
    const curso = this.cursoRepository.create({
      nombreCurso: cursoNuevo.titulo,
      descripcionCurso: cursoNuevo.descripcion,
      categoria: cursoNuevo.categoria,
      estatus: cursoNuevo.estado,
      nivel: cursoNuevo.nivel,
    });

    const cursoGuardado = await this.cursoRepository.save(curso);

    const dataVideo = await this.insertarVideosEnCurso(cursoGuardado, cursoNuevo.videos, videosFiles);
    await this.insertarMaterialesEnCurso(cursoGuardado, cursoNuevo.materiales, materialesFiles);

    return {
      data: cursoGuardado,
      statusCode: 201,
      message: 'Curso creado exitosamente',
    };
  }

  private async insertarVideosEnCurso(curso: Cursos, videos: VideoDto[], videosFiles: Express.Multer.File[]) {
    this.logger.log('Insertando videos en el curso');
    const videosEntidades = videos.map((video, index) => {
      return this.videosRepository.create({
        tituloVideo: video.titulo,
        duracionVideo: 0, // Podrías ajustar esto basado en el archivo
        pathDelVideo: videosFiles[index].path,
        estado: video.estatus,
        categoria: "videos",
        idCurso2: curso,
      });
    });

    await this.videosRepository.save(videosEntidades);
  }

  private async insertarMaterialesEnCurso(curso: Cursos, materiales: MaterialDto[], materialesFiles: Express.Multer.File[]) {
    this.logger.log('Insertando materiales en el curso');
    const materialesEntidades = materiales.map((material, index) => {
      return this.materialesRepository.create({
        nombre: material.nombre,
        ruta: materialesFiles[index].path,
        idMaterial: curso.idCurso, // Suponiendo que tienes una relación de curso con materiales
      });
    });

    await this.materialesRepository.save(materialesEntidades);
  }
}
