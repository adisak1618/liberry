import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Writer {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @OneToMany(type => Book, book => book.writer)
    books: Book

}
