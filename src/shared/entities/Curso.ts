import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("curso", { schema: "academit_DB" })
export class Curso {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo", length: 200 })
  titulo: string;

  @Column("varchar", { name: "descripcion", length: 422 })
  descripcion: string;

  @Column("varchar", { name: "video", nullable: true, length: 255 })
  video: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true })
  updatedAt: string | null;
}
