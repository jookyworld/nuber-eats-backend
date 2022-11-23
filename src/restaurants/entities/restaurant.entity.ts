import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
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
    @IsString()
    @Length(5)
    name: string;

    @Field(is => Boolean, {nullable: true})
    @Column({default: false})
    @IsBoolean()
    @IsOptional()
    isVegan: boolean;

    @Field(is => String, {defaultValue: "seoul"})
    @Column()
    @IsString()
    address: string;

    // @Field(is => String)
    // @Column()
    // @IsString()
    // ownerName: string;
    
    // @Field(is => String)
    // @Column()
    // @IsString()
    // categoryName: string;
}