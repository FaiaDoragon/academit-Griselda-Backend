import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('headers', { schema: 'academit_DB' })
export class Header {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'item1', length: 100 })
  item01: string;

  @Column('varchar', { name: 'NavegacionItem01', length: 100 })
  NavegacionItem01: string;

  @Column('varchar', { name: 'item2', length: 100 })
  item02: string;

  @Column('varchar', { name: 'NavegacionIitem02', length: 100 })
  NavegacionIitem02: string;

  @Column('varchar', { name: 'item3', length: 100 })
  item03: string;

  @Column('varchar', { name: 'NavegacionIitem03', length: 100 })
  NavegacionIitem03: string;

  @Column('varchar', { name: 'item4', length: 100 })
  item04: string;

  @Column('varchar', { name: 'NavegacionIitem04', length: 100 })
  NavegacionIitem04: string;

  @Column('varchar', { name: 'logo', nullable: true })
  logo: string | null;

  @Column('date', { name: 'created_at', nullable: true })
  createdAt: Date = new Date();

  @Column('date', { name: 'updated_at', nullable: true })
  updatedAt: Date = new Date();
}
