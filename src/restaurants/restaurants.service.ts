import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Repository, UpdateResult } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantsRepository: Repository<Restaurant>,
    ) {}

    getAll(): Promise<Restaurant[]>{
        return this.restaurantsRepository.find();
    }

    createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        const newRestaurant = this.restaurantsRepository.create(createRestaurantDto);
        return this.restaurantsRepository.save(newRestaurant);
    }

    updateRestaurant({id, data}: UpdateRestaurantDto) {
        return this.restaurantsRepository.update(id, { ...data }); 
    }

}