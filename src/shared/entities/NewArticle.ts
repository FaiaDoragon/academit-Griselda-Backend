import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("new_article", { schema: "academit_DB" })
export class NewArticle {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo_seccion", length: 100 })
  tituloSeccion: string;

  @Column("varchar", { name: "titulo_articulo", length: 100 })
  tituloArticulo: string;

  @Column("varchar", { name: "NavegacionArticleTitle", length: 100 })
  navegacionArticleTitle: string;

  @Column("varchar", { name: "descripcion", length: 400 })
  descripcion: string;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true })
  updatedAt: string | null;
}
