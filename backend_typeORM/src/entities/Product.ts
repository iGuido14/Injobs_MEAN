import { Entity, Column, ObjectIdColumn, ObjectId, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./User";
// import { Comment } from "./Comment";

@Entity()
export class Products {
    @ObjectIdColumn()
    id!: ObjectId;

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

    @Column({ type: "string", nullable: false })
    author!: ObjectId;

    @Column({ type: "boolean", default: false })
    isClosed!: boolean;

    @Column({ type: "boolean", default: false })
    isAccepted!: boolean;
}
