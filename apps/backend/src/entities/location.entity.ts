import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  lid: number;

  @Column()
  building: String;

  @Column()
  roomNumber: number;

  @OneToMany(() => Section, (section) => section.location)
  sections: Section[]
}