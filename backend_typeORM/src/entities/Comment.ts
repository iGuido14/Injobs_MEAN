// src/entities/Comment.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectId,
    ObjectIdColumn
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity("comments")
export class Comment {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "text", nullable: false })
    body!: string;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "author_id" })
    author!: User;

    @ManyToOne(() => Product, (product) => product.comments, { nullable: false })
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
