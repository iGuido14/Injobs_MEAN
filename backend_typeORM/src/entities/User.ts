import { Entity, ObjectIdColumn, ObjectId, Column, ManyToMany, JoinTable, Index, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Products } from "./Product";
// import { Application } from "./Application";

@Entity()
export class Users {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({ type: "string", unique: true })
    username!: string;

    @Column({ type: "string" })
    password!: string;

    @Column({ type: "string", unique: true })
    @Index()
    email!: string;

    @Column({ type: "string", default: "" })
    bio: string = "";

    @Column({ type: "string", default: "https://static.productionready.io/images/smiley-cyrus.jpg" })
    image: string = "https://static.productionready.io/images/smiley-cyrus.jpg";

    @OneToMany(() => Products, (product) => product.author)
    products!: Products[];

    // @ManyToMany(() => Application)
    // @JoinTable()
    // applications: Application[];

    @Column({ type: "boolean", default: false })
    isWorking: boolean = false;

    @Column({ type: "string", default: "client" })
    userType: string = "client";
}
