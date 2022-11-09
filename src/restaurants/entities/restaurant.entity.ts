import { Field, ObjectType } from "@nestjs/graphql";
import { StringValueNode } from "graphql";

@ObjectType()
export class Restaurant {

    @Field(is => String)
    name: string;

    @Field(is => Boolean)
    isVegan: boolean;

    @Field(is => String)
    address: string;

    @Field(is => String)
    ownerName: string;
    
}