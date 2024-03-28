import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
/**
 * Represents a department entity.
 */
export class Department {
  @PrimaryGeneratedColumn()
    did: number;

  @Column()
    name: string;

  @Column()
    abbreviation: string;
}
