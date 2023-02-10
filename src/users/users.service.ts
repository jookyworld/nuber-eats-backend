import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
        
    }

    //계정 생성에 실패하면 return String, 성공하면 return x
    async createAccount({email, password, role}: CreateAccountInput) 
    : Promise<{ok:boolean, error?:string}> {
        try{
            const exists = await this.usersRepository.findOneBy({email});   // 1.계정 조회
            if(exists) {
                return {ok:false, error:'이미 존재하는 계정입니다.'};
            }
            await this.usersRepository.save(this.usersRepository.create({email, password, role}));  // 2.계정 생성
            return {ok:true};
        } catch(e) {
            return {ok:false,error:'계정을 생성하지 못했습니다.'};
        }
    }

    async login({email, password}: LoginInput) 
    : Promise<{ok:boolean, error?:string, token?:string}> {
        try {
            const user = await this.usersRepository.findOneBy({email}); // 1.계정 조회
            if(!user) {
                return {ok:false, error:'존재하지 않는 계정입니다.'};
            }

            const passwordCorrect = await user.checkPassword(password); // 2.비밀번호 확인
            if(!passwordCorrect) {
                return {ok:false, error:'비밀번호가 틀렸습니다.'};
            }

            const token = this.jwtService.sign(user.id);
            return {ok:true, token};    // 3.토큰 반환
        } catch(e) {
            return {ok:false, error:e};
        }
    }

}