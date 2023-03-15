import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import bcrypt, { getRounds } from "bcryptjs";
import { Schedule } from "./schedules.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    const isIncripted = getRounds(this.password);
    if (!isIncripted) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @OneToMany(() => Schedule, (schedules) => schedules.user)
  schedules: Schedule[];
}

export { User };
