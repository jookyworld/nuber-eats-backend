import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { string } from "joi";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";

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
    email: string;

    @Column()
    @Field(type => String)
    password: string;

    @Column({type: 'enum', enum: UserRole})
    @Field(type => UserRole)
    role: UserRole;

}