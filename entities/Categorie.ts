import { Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany, 
} from 'typeorm';
import { IsBoolean, IsEmail, IsInt, IsNumber, isNumber, IsString, Length } from 'class-validator';
import { Product } from './Product';

@Entity({
  name: "categories"
})
export class Categorie extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;
  
  @Column({type: 'varchar'})
  @IsString()
  name: string;

  @Column({type: 'varchar'})
  @IsNumber()
  @Length(11,11)
  cpf_user_created_at: string;

  @Column({type: 'varchar'})
  @IsNumber()
  @Length(11,11)
  cpf_user_updated_at: string;

  @Column('datetime',{nullable: true})
  created_at: Date;

  @Column('datetime', {nullable: true})
  updated_at : Date;

  @OneToMany(type => Product, product => product.category)
  products: Product[]
  
  @BeforeInsert()
  createDates() {
    this.created_at = new Date();
  }
  
  @BeforeUpdate()
  updateDates() {
    this.updated_at = new Date();
  }

}
