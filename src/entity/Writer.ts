import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Writer extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @OneToMany(type => Book, book => book.writer)
    books: Book

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number;

}
