import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(type => Book, book => book.category)
    books: Book

}
