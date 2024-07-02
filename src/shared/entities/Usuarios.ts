import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cursos } from "./Cursos";

@Index("email_usuario", ["emailUsuario"], { unique: true })
@Entity("Usuarios", { schema: "academit_DB" })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: "int", name: "id_usuario" })
  idUsuario: number;

  @Column("varchar", { name: "nombre_usuario", length: 255 })
  nombreUsuario: string;

  @Column("varchar", { name: "email_usuario", unique: true, length: 255 })
  emailUsuario: string;

  @ManyToMany(() => Cursos, (cursos) => cursos.usuarios)
  cursos: Cursos[];
}
