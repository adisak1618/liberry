import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

export enum StaffRole {
  ADMIN = "admin",
  STAFF = "staff",
}

@ObjectType()
@Entity()
export class Staff extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  lineid: string

  @Field()
  @Column()
  profile_url: string

  @Field()
  @Column({
    type: "enum",
    enum: StaffRole,
    default: StaffRole.STAFF
  })
  role: StaffRole

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
