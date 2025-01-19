import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  postDate: Date;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mediaUrl?: string;
}
