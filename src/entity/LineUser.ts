import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Action } from "./Action";
import { User } from "./User";

@Entity()
export class LineUser extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    lineid: string;

    @Column()
    path: string;

    @Column({
        type: "boolean",
        default: true,
    })
    follow: boolean;

    // @OneToOne(type => Action, action => action.lineUser)
    // action: Action;

    @OneToMany(type => Action, action => action.lineUser)
    actions: Action[];

    @OneToOne(type => User, user => user.lineUser)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number;

}
