import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Products {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ type: "string", nullable: false }) // Use eager if you want the relation loaded automatically
    author!: ObjectId;

    @Column({ type: "string", unique: true })
    slug!: string;

    @Column({ type: "string", nullable: false })
    name!: string;

    @Column({ type: "number", nullable: false })
    price!: number;

    @Column({ type: "string", nullable: false })
    description!: string;

    @Column({ type: "string", nullable: false })
    img!: string;

    @Column({ type: "boolean", default: false })
    isClosed!: boolean;

    @Column({ type: "boolean", default: false })
    isAccepted!: boolean;
}
