import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BaseEntity, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export enum StaffRole {
  ADMIN = "admin",
  STAFF = "staff",
}

@Entity()
export class Staff extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string

  @Column()
  lineid: string

  @Column()
  profile_url: string

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
