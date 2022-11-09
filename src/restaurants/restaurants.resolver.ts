import { Query, Resolver } from "@nestjs/graphql";
import { restaurant } from "./entities/restaurant.entity";

@Resolver()
export class RestaurantsResolver {
    // @Query(returns => Boolean)
    // isPizzaGood():Boolean {
    //     return true;
    // }
    @Query(returns => restaurant)
    myRestaurant() {
        return true;
    }
}