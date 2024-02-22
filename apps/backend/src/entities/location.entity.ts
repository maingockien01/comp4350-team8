import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
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
  sections: Relation<Section[]>;
}