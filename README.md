# Nuber Eats

The Backend of Nuber Eats Clone

### Settings
1. nest application 생성

```zsh nest g application ```

2. git ignore 추가
3. graphql 설치
4. src/ controller, service 삭제
*  application은 app.module로 실행됨


### graphql
* module : DB의 말그대로 메인 모듈
* resolver : ``` @Resolver() ``` 로 쿼리문 날릴 클래스들이 위치
* ``` @Query(return => entity) ```  : 쿼리문 실행(?)
* ``` @ObjectType() ```  : DB 엔티티

