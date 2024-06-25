import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('new_article', { schema: 'academit_DB' })
export class NewArticle {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'titulo_seccion', length: 100 })
  sectiontitle: string;

  @Column('varchar', { name: 'titulo_articulo', length: 100 })
  articletitle: string;

  @Column('varchar', { name: 'NavegacionArticleTitle', length: 100 })
  NavegacionArticleTitle: string;

  @Column('varchar', { name: 'descripcion', length: 400 })
  description: string;

  @Column('date', { name: 'created_at', nullable: true })
  createdAt: Date = new Date();

  @Column('date', { name: 'updated_at', nullable: true })
  updatedAt: Date = new Date();
}
