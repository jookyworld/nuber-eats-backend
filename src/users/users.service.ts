import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    //계정 생성에 실패하면 return String, 성공하면 return x
    async createAccount({email, password, role}: CreateAccountInput) 
    : Promise<string | undefined> {
        try{
            const exists = await this.usersRepository.findOneBy({email});   //계정 조회
            if(exists) {
                return '이미 존재하는 계정입니다.';
            }
            await this.usersRepository.save(this.usersRepository.create({email, password, role}));
        } catch(e) {
            return '계정을 생성하지 못했습니다.';
        }
    }


}