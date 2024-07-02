import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { Videos } from "./Videos";
import { MaterialesDeVideo } from "./MaterialesDeVideo";

@Entity("Cursos", { schema: "academit_DB" })
export class Cursos {
  @PrimaryGeneratedColumn({ type: "int", name: "id_curso" })
  idCurso: number;

  @Column("varchar", { name: "nombre_curso", length: 255 })
  nombreCurso: string;

  @Column("varchar", { name: "categoria", length: 255 })
  categoria: string;

  @Column("boolean", { name: "estatus" })
  estatus: boolean;

  @Column("varchar", { name: "nivel", length: 255 })
  nivel: string;

  @Column("text", { name: "descripcion_curso", nullable: true })
  descripcionCurso: string | null;

  @ManyToMany(() => Usuarios, (usuarios) => usuarios.cursos)
  @JoinTable({
    name: "CursosUsuarios",
    joinColumns: [{ name: "id_curso", referencedColumnName: "idCurso" }],
    inverseJoinColumns: [
      { name: "id_usuario", referencedColumnName: "idUsuario" },
    ],
    schema: "academit_DB",
  })
  usuarios: Usuarios[];

  @OneToMany(() => Videos, (videos) => videos.idCurso2)
  videos: Videos[];

  @OneToMany(() => MaterialesDeVideo, (materiales) => materiales.idMaterial)
  materiales: MaterialesDeVideo[];
}
