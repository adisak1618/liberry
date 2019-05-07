import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @OneToMany(type => Book, book => book.category)
    books: Book

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @VersionColumn()
    version: number;

}
