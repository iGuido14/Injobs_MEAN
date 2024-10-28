// src/entities/Product.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    ObjectId,
    ObjectIdColumn
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("products")
export class Product {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "varchar", unique: true })
    slug!: string;

    @Column({ type: "varchar", nullable: false })
    name!: string;

    @Column({ type: "decimal", nullable: false })
    price!: number;

    @Column({ type: "text", nullable: false })
    description!: string;

    @Column("simple-array")
    images!: string[];

    @Column({ type: "varchar", nullable: false })
    img!: string;

    @Column({ type: "varchar", nullable: false })
    id_cat!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "author_id" })
    author!: User;

    @Column({ type: "int", default: 0 })
    favouritesCount!: number;

    @OneToMany(() => Comment, (comment) => comment.product)
    comments!: Comment[];

    @Column({ type: "boolean", default: false })
    isClosed!: boolean;

    @Column({ type: "boolean", default: false })
    isAccepted!: boolean;
}
