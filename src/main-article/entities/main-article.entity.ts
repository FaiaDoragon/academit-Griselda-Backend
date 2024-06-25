import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('main_article', { schema: 'academit_DB' })
export class MainArticle {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'titulo', length: 200 })
  title: string;

  @Column('varchar', { name: 'descripcion', length: 422 })
  description: string;

  @Column('varchar', { name: 'textoBoton', length: 100 })
  textButton: string;

  @Column('varchar', { name: 'NavegacionBoton', length: 100 })
  NavegacionBoton: string;

  @Column('varchar', { name: 'imagen', nullable: true })
  image: string;

  @Column('date', { name: 'created_at', nullable: true })
  createdAt: Date = new Date();

  @Column('date', { name: 'updated_at', nullable: true })
  updatedAt: Date = new Date();
}
