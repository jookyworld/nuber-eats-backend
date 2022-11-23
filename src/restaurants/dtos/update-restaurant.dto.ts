import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { number } from "joi";
import { type } from "os";
import { CreateRestaurantDto } from "./create-restaurant.dto";


@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}


@InputType()
export class UpdateRestaurantDto {
    
    @Field(type => Number)
    id: number;

    @Field(type => UpdateRestaurantInputType)
    data: UpdateRestaurantInputType;
}