import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ok } from "assert";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(User)
export class UsersResolver {

    constructor(private readonly userService: UsersService) {}

    @Query(returns => Boolean)
    hi() {
        return true;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput) 
    : Promise<CreateAccountOutput> {
        try {
            const [ok, error] = await this.userService.createAccount(createAccountInput);
            return {ok, error};
        } catch(e) {
            return{ok:false, error:e};
        }
    }

}