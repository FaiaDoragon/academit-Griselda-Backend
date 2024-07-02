import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { MaterialesDeVideo } from "./MaterialesDeVideo";
import { Cursos } from "./Cursos";

@Index("idx_video_curso", ["idCurso"], {})
@Entity("Videos", { schema: "academit_DB" })
export class Videos {
  @PrimaryGeneratedColumn({ type: "int", name: "id_video" })
  idVideo: number;

  @Column("int", { name: "id_curso" })
  idCurso: number;

  @Column("varchar", { name: "titulo_video", length: 255 })
  tituloVideo: string;

  @Column("int", { name: "duracion_video", nullable: true })
  duracionVideo: number | null;

  @CreateDateColumn({ name: "fecha_de_subida" })
  fechaDeSubida?: Date;

  @Column("varchar", { name: "path_del_video", length: 255 })
  pathDelVideo: string;

  @Column("boolean", { name: "estado"})
  estado: boolean;

  @Column("varchar", { name: "categoria", length: 100 })
  categoria: string;

  @OneToMany(
    () => MaterialesDeVideo,
    (materialesDeVideo) => materialesDeVideo.idVideo2
  )
  materialesDeVideos: MaterialesDeVideo[];

  @ManyToOne(() => Cursos, (cursos) => cursos.videos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_curso", referencedColumnName: "idCurso" }])
  idCurso2: Cursos;

  @ManyToMany(
    () => MaterialesDeVideo,
    (materialesDeVideo) => materialesDeVideo.videos
  )
  materialesDeVideos2: MaterialesDeVideo[];
}
