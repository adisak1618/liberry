import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { LineUser } from "./LineUser";

@Entity()
export class Action extends BaseEntity {

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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number;

}
