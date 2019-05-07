import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Transection extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    return: boolean;

    @ManyToOne(type => User, user => user.transections)
    user: User;

    @ManyToOne(type => Book, book => book.transections)
    book: Book;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number;

}
