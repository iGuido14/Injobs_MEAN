// src/entities/Application.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ObjectId,
    ObjectIdColumn
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("applications")
export class Application {
    @ObjectIdColumn()
    id: ObjectId;

    @ManyToOne(() => Product, { nullable: false })
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @ManyToOne(() => User, (user) => user.applications, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "asigned_recruiter_id" })
    asignedRecruiter!: User;

    @Column({ type: "varchar", default: "pending", nullable: false })
    status!: string;

    @Column({ type: "boolean", default: false })
    isUserAccepted!: boolean;
}
