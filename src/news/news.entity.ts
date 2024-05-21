import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  @Column('text')
  author: string;
}
