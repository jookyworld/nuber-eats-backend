import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { StringValueNode } from "graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant {

    @Field(is => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(is => String)
    @Column()
    name: string;

    @Field(is => Boolean)
    @Column()
    isVegan: boolean;

    @Field(is => String)
    @Column()
    address: string;

    @Field(is => String)
    @Column()
    ownerName: string;
    
    @Field(is => String)
    @Column()
    categoryName: string;
}