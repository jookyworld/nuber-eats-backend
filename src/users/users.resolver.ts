import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(User)
export class UsersResolver {

    constructor(private readonly userService: UsersService) {}

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput) 
    : Promise<CreateAccountOutput> {
        try {
            return await this.userService.createAccount(createAccountInput);
        } catch(e) {
            return{ok:false, error:e};
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput) : Promise<LoginOutput> {
        try {
            return await this.userService.login(loginInput);
        } catch(error) {
            return {ok:false, error};
        }
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser;
    } 

    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        try {
            const user = await this.userService.findById(userProfileInput.userId);
            if(!user) {
                throw Error();
            }
            return {
                ok: true,
                user,
            };
        } catch(e) {
            return {
                error: '사용자를 찾을 수 없습니다.',
                ok: false,
            };
        }
    }

    @UseGuards(AuthGuard)
    @Mutation(returns => EditProfileOutput)
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput)
    :Promise<EditProfileOutput> {
        try {
            await this.userService.editProfile(authUser.id, editProfileInput);
            return {
                ok:true,
            };
        } catch(error) {
            return {
                ok:false,
                error,
            };
        }
     }


}