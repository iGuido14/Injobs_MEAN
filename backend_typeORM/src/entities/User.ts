import { Entity, ObjectIdColumn, ObjectId, Column, ManyToMany, JoinTable, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";
// import { Product } from "./Product";
// import { Application } from "./Application";

@Entity()
export class User {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ unique: true })
    username!: string;

    // @Column()
    // password!: string;

    // @Column({ unique: true })
    // @Index()
    // email!: string;

    // @Column({ default: "" })
    // bio: string = "";

    // @Column({ default: "https://static.productionready.io/images/smiley-cyrus.jpg" })
    // image: string = "https://static.productionready.io/images/smiley-cyrus.jpg";

    // @ManyToMany(() => Product)
    // @JoinTable() // Required to create a relationship table
    // favouriteProducts: Product[];

    // @ManyToMany(() => User)
    // @JoinTable()
    // followingUsers: User[];

    // @ManyToMany(() => User)
    // @JoinTable()
    // followersUsers: User[];

    // @ManyToMany(() => Application)
    // @JoinTable()
    // applications: Application[];

    // @Column({ default: false })
    // isWorking: boolean = false;

    // @Column({ default: "client" })
    // userType: string = "client";

    // @CreateDateColumn()
    // createdAt!: Date;

    // @UpdateDateColumn()
    // updatedAt!: Date;
}
