import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import {Section} from './section.entity';

@Entity()
/**
 * Represents a location entity.
 */
export class Location {
  @PrimaryGeneratedColumn()
    lid: number;

  @Column()
    building: string;

  @Column()
    roomNumber: number;

  @OneToMany(() => Section, (section) => section.location)
    sections: Relation<Section[]>;
}
