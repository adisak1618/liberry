import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { Transection } from "./Transection";
import { Category } from "./Category";
import { Writer } from "./Writer";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class Book extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ type: "text", nullable: true })
    detail: string;

    @Field()
    @Column("integer")
    page_count: number;

    @Field()
    @Column()
    publisher: string;

    @Field()
    @Column("integer")
    price: number;

    @Field()
    @Column({ type: "character varying", unique: true })
    isbnCode: string;

    @Field()
    @Column("integer")
    count: number;

    @Field()
    @Column("integer")
    remain: number;

    @Field()
    @Column({ type: "character varying", nullable: true })
    cover: string;

    @OneToMany(type => Transection, transection => transection.book)
    transections: Transection[];

    @ManyToOne(type => Category, category => category.books)
    category: Category

    @ManyToOne(type => Writer, writer => writer.books)
    writer: Writer

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date

    @Field()
    @VersionColumn()
    version: number;

}
