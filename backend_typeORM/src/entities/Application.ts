import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ObjectIdColumn, ObjectId } from 'typeorm';
import { Products } from './Product';
import { Users } from './User';

@Entity()
export class Applications {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ type: "string", nullable: false })
    slug!: string;

    @Column({ type: "string", nullable: false })
    product!: ObjectId;

    @Column({ type: "string", nullable: false })
    user!: ObjectId;

    @Column({ type: "string", nullable: false })
    asignedRecruiter!: ObjectId;

    @Column({
        type: 'varchar',
        default: 'pending'
    })
    status!: string;

    @Column({
        type: 'boolean',
        default: false
    })
    isUserAccepted!: boolean;
}
