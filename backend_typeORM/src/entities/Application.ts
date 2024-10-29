import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ObjectIdColumn, ObjectId } from 'typeorm';
import { Products } from './Product';
import { Users } from './User';

@Entity()
export class Applications {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ type: "string", nullable: false }) // Use eager if you want the relation loaded automatically
    product!: ObjectId;

    @Column({ type: "string", nullable: false }) // Use eager if you want the relation loaded automatically
    user!: ObjectId;

    @Column({ type: "string", nullable: false }) // Use eager if you want the relation loaded automatically
    assignedRecruiter!: ObjectId;

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
