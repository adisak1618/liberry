import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Action } from "./Action";
import { User } from "./User";

@Entity()
export class LineUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    lineid: string;

    @Column()
    path: string;

    @Column()
    follow: boolean;

    // @OneToOne(type => Action, action => action.lineUser)
    // action: Action;

    @OneToMany(type => Action, action => action.lineUser)
    actions: Action[];

    @OneToOne(type => User, user => user.lineUser)
    @JoinColumn()
    user: User;

}
