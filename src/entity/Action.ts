import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { LineUser } from "./LineUser";

@Entity()
export class Action {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    job: string;

    @Column()
    success: boolean;

    @Column("jsonb")
    data: any;

    @Column()
    next: string;

    @ManyToOne(type => LineUser, lineuser => lineuser.actions)
    lineUser: LineUser;

}
