
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles', { schema: 'academit_DB' })
export class Article {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'titulo', length: 100 })
    title: string;

    @Column('varchar', { name: 'descripcion', length: 100 })
    description: string;

    @Column('longblob', { name: 'imagen', nullable: true })
    image: Buffer | null;

    @Column('date', { name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: Date = new Date();
}
