# Boggle

## Purpose

현재 인포팀에서 스마트폰으로 알림을 보내는 로직은 scheduling이 있는데도 불구하고, 각 서비스마다 각자 구현을 해야한다는 단점이 있다. 따라서 이를 통합하고, 각 서비스에서 더 편하게 push 알림을 보낼 수 있도록 하는 어플리케이션이 필요하다. 따라서 BOGGLE 어플리케이션에는 인포팀의 모든 어플리케이션에서 사용되는 firebase push 알람을 통합하는 역할을 담당할 것이다.

## Database Structure

dbml로 구현된 ERD는 다음과 같다.
링크

## Endpoints

### Service

POST /service  
body에 service에 관한 모든 내용이 있어야함.(name, private key, project name, email)

### User FCM

POST /user
fcm에 관한 정보도 같이 들어가야 함. + user의 uuid까지는 들어가야함.(uuid, service id, fcmtoken)

### Push

POST /service/:id/push
해당 서비스의 모두에게 푸시를 하는 방법과, 일부에게 푸시를 하는 방법이 둘다 있어야 함.  
push를 한 후에 이를 log에 저장해야함.

### 실제 push 구현방법

두가지가 있음 하나는 요청을 받자 마자 바로 푸시를 하는 법, 나머지 하나는 Cron을 따로 돌려서 겹치는 알림을 핸들링 하는 것.
