import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Transection } from "./Transection";
import { Category } from "./Category";
import { Writer } from "./Writer";

@Entity()
export class Book {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("integer")
    page_count: number;

    @Column()
    publisher: string;

    @Column("integer")
    price: number;

    @Column()
    isbnCode: string;

    @Column("integer")
    count: number;

    @Column()
    cover: string;

    @OneToMany(type => Transection, transection => transection.book)
    transections: Transection[];

    @ManyToOne(type => Category, category => category.books)
    category: Category

    @ManyToOne(type => Writer, writer => writer.books)
    writer: Writer

}
