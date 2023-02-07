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
            const error = await this.userService.createAccount(createAccountInput);
            //createAccount의 return값이 있다면 계정 생성 실패한것
            if(error) {
                return {ok: false, error};
            }
            return {ok:true};
        } catch(e) {
            return{ok:false, error:e};
        }
    }

}