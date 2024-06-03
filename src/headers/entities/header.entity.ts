import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('headers', { schema: 'academit_DB' })
export class Header {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'item1', length: 100 })
  item1: string;

  @Column('varchar', { name: 'item2', length: 100 })
  item2: string;

  @Column('varchar', { name: 'item3', length: 100 })
  item3: string;

  @Column('varchar', { name: 'item4', length: 100 })
  item4: string;

  @Column('longblob', { name: 'logo', nullable: true })
  logo: Buffer | null;

  @Column('date', { name: 'created_at', nullable: true })
  createdAt: Date = new Date();

  @Column('date', { name: 'updated_at', nullable: true })
  updatedAt: Date = new Date();
}
