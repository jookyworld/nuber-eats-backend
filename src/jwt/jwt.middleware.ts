import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { UsersService } from "src/users/users.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
    ) {}

    async use(req:Request, res: Response, next:NextFunction) {
        if("x-jwt" in req.headers) {            //http header에 tooken이 있다면
            const token = req.headers["x-jwt"]; //token을 저장
            try {
                const decoded = this.jwtService.verify(token.toString());   //token 검증 후
                if(typeof decoded === "object" && decoded.hasOwnProperty('id')) {   //object타입이고 id라는 프로퍼티가 있다면
                    const user = await this.userService.findById(decoded["id"]);    //해당 id를 가진 user를 조회 후
                    req['user'] = user;     //request object에 추가한다.
                }
            } catch(e) {}
        }
        next();
    }
}