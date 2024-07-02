import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("main_article", { schema: "academit_DB" })
export class MainArticle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo", length: 200 })
  titulo: string;

  @Column("varchar", { name: "descripcion", length: 422 })
  descripcion: string;

  @Column("varchar", { name: "imagen", nullable: true, length: 255 })
  imagen: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true })
  updatedAt: string | null;

  @Column("varchar", { name: "textoBoton", length: 100 })
  textoBoton: string;

  @Column("varchar", { name: "NavegacionBoton", length: 100 })
  navegacionBoton: string;
}
