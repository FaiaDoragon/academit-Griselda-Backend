import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Videos } from "./Videos";

@Index("idx_material_video", ["idVideo"], {})
@Entity("MaterialesDeVideo", { schema: "academit_DB" })
export class MaterialesDeVideo {
  @PrimaryGeneratedColumn({ type: "int", name: "id_material" })
  idMaterial: number;

  @Column("int", { name: "id_video" })
  idVideo: number;

  @Column("varchar", { name: "nombre", length: 255 })
  nombre: string;

  @Column("text", { name: "contenido_material", nullable: true })
  contenidoMaterial: string | null;

  @Column("text", { name: "ruta", nullable: true })
  ruta: string | null;

  @ManyToOne(() => Videos, (videos) => videos.materialesDeVideos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_video", referencedColumnName: "idVideo" }])
  idVideo2: Videos;

  @ManyToMany(() => Videos, (videos) => videos.materialesDeVideos2)
  @JoinTable({
    name: "VideosMaterialesDeVideo",
    joinColumns: [{ name: "id_material", referencedColumnName: "idMaterial" }],
    inverseJoinColumns: [{ name: "id_video", referencedColumnName: "idVideo" }],
    schema: "academit_DB",
  })
  videos: Videos[];
}
