import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    noteText: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "datetime", nullable: true })
    updatedAt: Date | null;

    @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
    user: User;
}
