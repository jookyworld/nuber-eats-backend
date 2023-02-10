import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';
import * as jwt from "jsonwebtoken";


@Injectable()
export class JwtService {

    constructor(@Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions) {

    }

    //token 생성
    sign(userId: number): string{
        return jwt.sign({id: userId}, this.options.privateKey);
    }

    //token 검증
    verify(token:string) {
        return jwt.verify(token, this.options.privateKey);
    }

}
