import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class Transection {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    return: boolean;

    @ManyToOne(type => User, user => user.transections)
    user: User;

    @ManyToOne(type => Book, book => book.transections)
    book: Book;

}
