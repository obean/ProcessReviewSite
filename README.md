# ProcessReviewSite

## DB Setup

* Create table:
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```
* DB migrate:
```
npx sequelize-cli db:migrate
```