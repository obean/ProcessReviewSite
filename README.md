# ProcessReviewSite

```
    |.==============================,|
    ||  I LOVE CODING.              ||
    ||  I LOVE CODING.              ||
    ||  I LOVE CODING.              ||
    ||  I .----.ODING,              ||
    ||   / ><   \  /                ||
    ||  |        |/\                ||
    ||   \______//\/                ||
    ||   _(____)/ /                 ||
    ||__/ ,_ _  _/__________________||
    '===\___\_) |===================='
         |______|
         |  ||  |
         |__||__|

```


A web application designed for Makers students to ease the use of taking Process Reviews during their course. Students can sign in, book reviews and check metrics from their previous reviews to see how they progressing. Reviewers can sign in, create available time slots and view upcoming reviews.  

## User Stories
- As a Student,<br />
So that I can have a place to manage my reviews,<br />
I want to be able to login to my own profile.

- As a Student,<br />
So that I can attend a review,<br />
I want to be able to book a review.

- As a Student ,<br />
So I know how well I am doing,<br />
I want to be able to see my review metrics

- As a Reviewer ,<br />
So I can review the students,<br />
I want to be able to set an availability

- As a Reviewer ,<br />
So I can give students feedback,<br />
I want to be able comment on student's reviews


## Team Goals

We aimed to build a functional web application using a current tech stack, which is powerful and familiar to what we have learnt during the course. We had a limited time of 2 weeks to learn a brand new tech stack, but we agreed as a team to stick to it and learn as much as we can in that time. 

## Tech/frameworks used
### PERN stack
<b>Database</b>
- Postgresql
- Sequelize

<b>Front end</b>
- React
- React Bootstrap (Login and signup styling)
- Recharts (library for charts)

<b>Back end</b>
- Express
- Node JS
- Passport (user verification and authentication)
- Bcrypt (Password encryption)

<b>Deployment</b>
- Heroku
- TravisCI


## Installation
+ Visit current repository
```
  git clone git@github.com:obean/ProcessReviewSite.git 
  cd ProcessReviewSite
```
+ Install packages in both the client and server sides 
```
    cd api
    npm install
```
```
    cd client
    npm install
```

+ Create and populate the database  
```
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
```
+ Start the client and server
``` 
  cd api
  npm start
```

``` 
  cd client
  npm start
```
+ Visit the following url in your browser
```
http://localhost:3000/
```


## Nice To Have
* Video upload for students
* Embedded video


## Team members
* Courtenay Donald 
* Johnny Yip
* Ollie Beney
* Xavier Defontaine