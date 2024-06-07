import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('curso', { schema: 'academit_DB' })
export class Curso {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'titulo', length: 200 })
    title: string;

    @Column('varchar', { name: 'descripcion', length: 422 })
    description: string;

    @Column('varchar', { name: 'video', nullable: true })
    video: string;

    @Column('date', { name: 'created_at', nullable: true })
    createdAt: Date = new Date();

    @Column('date', { name: 'updated_at', nullable: true })
    updatedAt: Date = new Date();
}