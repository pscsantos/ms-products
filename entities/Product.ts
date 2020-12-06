import { Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn, 
} from 'typeorm';
import { IsBoolean, IsEmail, IsInt, IsNumber, isNumber, IsString, Length } from 'class-validator';
import { Categorie } from './Categorie';

@Entity({
  name: "products"
})
export class Product extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;
  
  @Column({type: 'varchar'})
  @IsString()
  name: string;

  @Column({type: 'decimal'})
  @IsEmail()
  price: number;

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
  
  @BeforeInsert()
  createDates() {
    this.created_at = new Date();
  }
  
  @BeforeUpdate()
  updateDates() {
    this.updated_at = new Date();
  } 

  @ManyToOne(() => Categorie, categorie => categorie.products)
  @JoinColumn({ name: 'category_id' })
  category : Categorie;

}

