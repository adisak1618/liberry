import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

export enum StaffRole {
  ADMIN = "admin",
  STAFF = "staff",
}

@ObjectType()
@Entity()
export class Invite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  code: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({
    type: "boolean",
    default: true
  })
  success: string

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
  computeval(@Root() parent: Invite): string {
    return `${parent.name} = ${parent.role}`;
  }

  @Field()
  @VersionColumn()
  version: number;

}
