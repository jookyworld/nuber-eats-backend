# Nuber Eats

The Backend of Nuber Eats Clone

## Environment

Framework : NestJS

Backend : NestJS, typescript, node.js

Database : TypeORM, PostgreSQL

## Settings

[Nest](https://docs.nestjs.com/)

#### 1. Nest Application 생성

```zsh
$ nest generate application
```

#### 2. graphql 설치

1. ```zsh
   $ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
   ```

2. src/(controller, controller.spec, service) 삭제 => app.module의 해당 import도 삭제

3. app.module의 imports에 다음 코드 추가

```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
}),
```

#### 3. PostgreSQL 설치[MAC]

서버 : [postgresapp](https://postgresapp.com/downloads.html)

GUI : [postico](https://eggerapps.at/postico2/)

1. postico GUI에서 데이터베이스 생성

2. postgresapp에서 생성한 DB 접속

3. ``` postgresql
   # \du;
   ```

   로 유저명 확인 후

   ``` postgresql
   # ALTER USER 유저명 WITH PASSWORD '비밀번호';
   ```

   로 비밀번호 설정

#### 4. TypeORM 설치

[TypeORM](https://typeorm.io/)

1. ```zsh
   $ npm install --save @nestjs/typeorm typeorm pg
   ```

2. app.module 임포트 후 

   ```typescript
   import { TypeOrmModule } from '@nestjs/typeorm';
   ```

   imports에 아래 코드 추가

   ```typescript
   TypeOrmModule.forRoot({
     type: "postgres",
     host: "localhost",
     port: 5432,
     username: "jookwonyoung",
     password: "12345",  //PostgreSQL은 localhost에서 pass 필요 없음
     database: "nuber-eats",
     synchronize: true,
     logging: true,
   }),
   ```

3. ```zsh
   $ npm run start:dev
   ```

   로 연결 했을 때 에러 없으면 DB 연결 완료







</br></br>

## Graphql

#### Graphql 이란? 

메타에서 만든 쿼리 언어.

sql이 DB 데이터를 효과적으로 가져올 수 있다면,

graphql은 클라이언트가 서버에서 데이터를 효과적으로 가져오는 것이 목적이다.

</br>

클라이언트가 서버에서 데이터를 받아오는 대표적인 방식이 REST API인 만큼

graphql은 REST API를 대체한다.

</br>

#### CRUD

REST API와 달리 2가지를 사용하고 역할은 다음과 같다.

Query : get

Mutation : post, put, delete

[참고](https://velog.io/@do_dadu/GraphQL%EC%9D%80-%EC%99%84%EB%B2%BD%ED%95%A0%EA%B9%8C)

</br></br>

### graphql 시작

1. 모듈 생성

```zsh
$ nest generate module 모듈명
```

2. resolver 클래스 생성

``` typescript
@Resolver()
export class 클래스명 {}
```

3. module의 providers에 resolver 등록

``` typescript
@Module({
    providers: [클래스명]
})
export class 모듈명 {}
```

</br></br>

#### concept

* resolver : ``` @Resolver() ``` 로 쿼리문 날릴 클래스들이 위치

* ``` @Query(return => entity) ```  : 쿼리문 실행

* ``` @ObjectType() ```  : DB 엔티티

* ``` @ArgsType() ```  이나 ``` @InputType() ``` 으로 dto객체(?) 생성 가능

  graphql 요청시,

  InputType은 args 이름으로 하나의 객체로 보내고

  ArgsType은 객체의 각 Field를 따로 보낸다.

* validation 으로 dto 유효성 검사 가능

  class-validation, class-transformer 설치 후 main.ts에 파이프라인 추가



</br>

## TypeORM

설치 후 추가 설정

1. dotenv 설치

   ```zsh
   $ npm i --save @nestjs/config
   ```

2. 루트 디렉토리에 .env.dev와 .env.test 파일 생성 (두 파일 모두 gitignore 추가)

3. package.json 파일 수정

   ```json
   "start:dev": "cross-env ENV=dev nest start --watch",
   ```

4. app.module에 모듈 추가

   ```typescript
   ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: process.env.NODE_ENV ==='dev' ? '.dev.env' : '.test.env',
       }),
   ```

5. 