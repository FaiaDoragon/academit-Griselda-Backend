import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("headers", { schema: "academit_DB" })
export class Headers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "item1", length: 100 })
  item1: string;

  @Column("varchar", { name: "item2", length: 100 })
  item2: string;

  @Column("varchar", { name: "item3", length: 100 })
  item3: string;

  @Column("varchar", { name: "item4", length: 100 })
  item4: string;

  @Column("varchar", { name: "logo", nullable: true, length: 255 })
  logo: string | null;

  @Column("date", { name: "created_at", nullable: true })
  createdAt: string | null;

  @Column("date", { name: "updated_at", nullable: true })
  updatedAt: string | null;

  @Column("varchar", { name: "NavegacionItem01", length: 100 })
  navegacionItem01: string;

  @Column("varchar", { name: "NavegacionIitem02", length: 100 })
  navegacionIitem02: string;

  @Column("varchar", { name: "NavegacionIitem03", length: 100 })
  navegacionIitem03: string;

  @Column("varchar", { name: "NavegacionIitem04", length: 100 })
  navegacionIitem04: string;
}
