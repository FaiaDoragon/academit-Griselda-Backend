import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles", { schema: "academit_DB" })
export class Articles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo", length: 100 })
  titulo: string;

  @Column("varchar", { name: "NavegacionTitulo", length: 100 })
  navegacionTitulo: string;

  @Column("varchar", { name: "descripcion", length: 400 })
  descripcion: string;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true })
  updatedAt: string | null;
}
