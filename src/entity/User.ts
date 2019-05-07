import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { LineUser } from "./LineUser";
import { Transection } from "./Transection";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userCode: string;

    @Column()
    nickname: string;

    @Column()
    fullname: string;

    @Column()
    userClass: string;

    @Column("integer")
    age: number;

    @Column()
    tel: string;

    @Column()
    profilePicture: string;

    @OneToOne(type => LineUser, lineuser => lineuser.user)
    lineUser: LineUser

    @OneToMany(type => Transection, transection => transection.user)
    transections: Transection[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number;

}
