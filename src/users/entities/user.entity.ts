import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { string } from "joi";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum } from "class-validator";

enum UserRole {
    Client,     //DB에는 0
    Owner,      //1
    Delivery,   //2
}

//enum 타입인 UserRole을 GraphQL 스키마에서 사용할 수 있도록
registerEnumType(UserRole, {name: 'UserRole'});


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {

    @Column()               //DB
    @Field(type => String)  //GraphQL
    @IsEmail()
    email: string;

    @Column()
    @Field(type => String)
    password: string;

    @Column({type: 'enum', enum: UserRole})
    @Field(type => UserRole)
    @IsEnum(UserRole)
    role: UserRole;

    @Column({default: false})
    @Field(type => Boolean)
    verified: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() : Promise<void> {
        try {
            this.password = await bcrypt.hash(this.password, 10)
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

    async checkPassword(aPassword:string) : Promise<boolean> {
        try {
            const ok = await bcrypt.compare(aPassword, this.password);
            return ok;
        } catch(e) {
            console.log(e);
            throw new InternalServerErrorException();
        }
    }

}