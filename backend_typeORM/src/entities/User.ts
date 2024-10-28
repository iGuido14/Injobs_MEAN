// src/entities/User.ts

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
    ObjectId,
    ObjectIdColumn
} from "typeorm";
import { Product } from "./Product";
import { Application } from "./Application";

@Entity("users")
export class User {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ type: "varchar", unique: true, nullable: false })
    username!: string;

    @Column({ type: "varchar", nullable: false })
    password!: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    email!: string;

    @Column({ type: "varchar", default: "" })
    bio!: string;

    @Column({ type: "varchar", default: "https://static.productionready.io/images/smiley-cyrus.jpg" })
    image!: string;

    @ManyToMany(() => Product)
    @JoinTable()
    favouriteProducts!: Product[];

    @ManyToMany(() => User, (user) => user.followingUsers)
    @JoinTable()
    followingUsers!: User[];

    @ManyToMany(() => User, (user) => user.followersUsers)
    followersUsers!: User[];

    @OneToMany(() => Application, (application) => application.user)
    applications!: Application[];

    @Column({ type: "boolean", default: false })
    isWorking!: boolean;

    @Column({ type: "varchar", default: "client" })
    userType!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    lowercaseFields() {
        this.username = this.username.toLowerCase();
        this.email = this.email.toLowerCase();
    }
}
