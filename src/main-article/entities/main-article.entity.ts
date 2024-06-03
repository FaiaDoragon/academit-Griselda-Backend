import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mainarticle', { schema: 'academit_DB' })
export class MainArticle {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'titulo', length: 100 })
    title: string;

    @Column('varchar', { name: 'descripcion', length: 100 })
    description: string;

    @Column('varchar', { name: 'textoBoton', length: 100 })
    textButton: string;

    @Column('varchar', { name: 'imagen', nullable: true })
    image: Buffer;

    @Column('date', { name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: Date = new Date();
}