import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class restaurant {

    @Field(is => String)
    name: string;

    @Field(is => Boolean, {nullable:true})
    isGood?: boolean;
    
}