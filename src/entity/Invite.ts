import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export enum StaffRole {
  ADMIN = "admin",
  STAFF = "staff",
}

@Entity()
export class Invite extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string

  @Column()
  name: string

  @Column({
    type: "boolean",
    default: true
  })
  success: string

  @Column({
    type: "enum",
    enum: StaffRole,
    default: StaffRole.STAFF
  })
  role: StaffRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @VersionColumn()
  version: number;

}
