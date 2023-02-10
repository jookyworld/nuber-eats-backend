Nuber Eats

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

4. dotenv 설치

```zsh
$ npm i --save @nestjs/config
```

5. 루트 디렉토리에 .env.dev와 .env.test 파일 생성 (두 파일 모두 gitignore 추가)

6. package.json 파일 수정

```json
"start": "cross-env NODE_ENV=prod nest start",
"start:dev": "cross-env NODE_ENV=dev nest start --watch",
```

7. app.module에 모듈 추가

```typescript
ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', //배포시엔 환경변수 무시
    }),
```

8. .env.dev 에 다음 코드 추가

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=유저네임
DB_PASSWORD=비밀번호
DB_NAME=DB이름
```

9. app.module 수정

```typescript
TypeOrmModule.forRoot({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
}),
```

10. 환경변수 유효성 검사 joi

```zsh
$ npm install joi
```

app.module에 import 후 모듈 추가

```typescript
import * as Joi from 'joi';
```

```typescript
ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', //배포시엔 환경변수 무시
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
```









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

* ``` @ObjectType() ```  : 데이터 객체 단위

* ``` @ArgsType() ```  이나 ``` @InputType() ``` 으로 dto객체(?) 생성 가능

  graphql 요청시,

  InputType은 args 이름으로 하나의 객체로 보내고

  ArgsType은 객체의 각 Field를 따로 보낸다.

* validation 으로 dto 유효성 검사 가능

  class-validation, class-transformer 설치 후 main.ts에 파이프라인 추가



</br>

## TypeORM

Sequelize와 항상 언급되는 대표적인 ORM(Object Relational Mapping)

#### @Entity()

TypeORM을 쓰기 위한 매핑 객체 decorator

#### @Column()

Java에서와 같이 각 필드를 나타냄

#### TypeORM 적용

TypeOrmModule에 ``` entities: [모듈명]``` 추가

#### Service, Repository 등록

1. 사용하려는 위치의 모듈에 entity 추가, providers 추가

   ```typescript
   imports: [TypeOrmModule.forFeature([Restaurant])],
   providers: [RestaurantResolver, RestaurantService]
   ```

2. Service 생성

   ```typescript
   @Injectable()
   export class RestaurantService {}
   ```

3. resolver에 service 등록

   ```typescript
   constructor(private readonly restaurantService: RestaurantService) {}
   ```

4. service에 repository 등록

   ```typescript
   constructor(
       @InjectRepository(Restaurant)
       private readonly restaurantsRepository: Repository<Restaurant>,
   ) {}
   ```

#### Entity와 DTO간의 필드 불일치 해결

##### "OmitType" 사용으로 자동 일치(entity > dto)

1. OmitType은 제외할 필드를 지정한다.

2. dto 클래스에 OmitType extends

3. 이때 dto의 decorator는 @InputType()이어야한다.

4. Entity의 decorator가 @ObjectType()로 dto와 다르다면 이를 동일하게 명시해야함

   두 가지 방법이 있는데

   1. dto OmitType에 인자 추가로 명시

      ```typescript
      @InputType()
      export class CreateRestaurantDto extends OmitType(Restaurant, ['id'], InputType) {}
      ```

   2. entity에 decorator만 추가

      ```typescript
      @InputType()
      export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
      ```

      ```typescript
      @InputType({isAbstract: true})
      @ObjectType()
      @Entity()
      export class Restaurant {}
      ```

5. 마지막으로 Entity 클래스에서 dto를 위한 decorator를 추가한다.

   @IsString(), @Length(5) 등
   
   

## User

1. user module 설치

   ``` bash
   $ nest g mo users
   ```

   * User Entity 생성

2. common module 설치

   ``` bash
   $ nest g mo common
   ```

   * Core Entity 생성

3. users resolver, service, dto 생성

4. API 생성  > createAccount() {}

5. hasing password

   1. bcrypt 사용(설치 후 import)

      ``` bash
      $ npm i bcrypt
      $ npm i @types/bcrypt --dev-only
      ```

   2. user.entity.ts에 해싱 함수 추가

6. login API 생성

### JWT

1. jsonwebtoken 설치

   ``` bash
   $ npm i jsonwebtoken
   ```

   ``` bash
   $ npm i @types/jsonwebtoken --only-dev
   ```

2. token 지정을 위한 privateKey 선언 ([256-bit중 선택](https://randomkeygen.com/))

   * 사용자는 얼마든지 token 정보를 알 수 있다.

     따라서 중요한 정보는 절대 포함하지 않는다.

     서버는 token의 수정 여부를 확인하기 위한 목적으로 privateKey 선언.

   ``` typescript
   ConfigModule.forRoot({
     ...
     validationSchema: Joi.object({
       ...
   		SECRET_KEY: Joi.string().required()	//SECRET_KEY는 별도 파일 저장(.env.dev)
   	}),
   }),
   ```

3. ConfigService 의존성 주입

   ConfigService로 위에서 생성한 SECRET_KEY를 불러와 토큰을 생성할 수 있다.

   ``` typescript
   constructor(
   	@InjectRepository(User)
   	private readonly usersRepository: Repository<User>,
   	private readonly config: ConfigService,	//ConfigService 의존성 주입
   ) {}
   ```

4. 토큰 생성

   ``` typescript
   const token = jwt.sign({id: user.id}, this.config.get('SECRET_KEY'));
   ```



<hr>

1. ``` bash
   $ nest g mo jwt
   ```

   ``` bash
   $ nest g s jwt
   ```

   

