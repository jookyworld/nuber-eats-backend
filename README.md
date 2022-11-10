# Nuber Eats

The Backend of Nuber Eats Clone

</br>

## Settings

##### 1. Nest Application 생성

``` $ nest generate application ```

##### 2. graphql 설치

1. ``` $ npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express ```

2. src/(controller, controller.spec, service) 삭제 => app.module의 해당 import도 삭제

3. app.module의 imports에 다음 코드 추가

```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
}),
```

</br></br>



## graphql

#### graphql 이란? 

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

``` $ nest generate module 모듈명 ```

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

ArgsType은 객체의 각 Field를 따로 보내고, 

* validation 으로 dto 유효성 검사 가능
  class-validation, class-transformer 설치 후 main.ts에 파이프라인 추가



</br>