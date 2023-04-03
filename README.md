# IDS328L-Proyecto-Final

## Technologies been used

- [Typescript](https://www.typescriptlang.org/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [GitLab](https://about.gitlab.com/)
- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- [Husky](https://typicode.github.io/husky/#/)
- [CommitLint](https://commitlint.js.org/#/)
- [Express.js](https://expressjs.com/es/)
- [MySQL](https://www.mysql.com/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Installation guide

1. First make sure you have [Node.js](https://nodejs.org/en) and [Git](https://git-scm.com/)
 installed running ```$ node -v``` and ```$ git -v``` respectively
2. Clone the repo

```
$ git clone https://gitlab.com/TineoChris/ids328l-proyecto-final
$ cd ids328-proyecto-final
```

3. Run these commands inside the project directory

```
$ npm run install
$ npm run dev
```

4. Your project is up and running 🎉

## Setup your dev environment

Now we're starting with the hard part

1. First make sure you have [Docker](https://www.docker.com/) installed in your machine.
2. Rename the file [.env.example](./.env.example) to just ".env"
   1. Here, you need to replace the ROOT_PASSWORD field for the password your project manager will give you.
3. Run ```docker compose up -d```
4. If everything went fine your db is started in localhost on port 3307
5. You can try connecting via Mysql Workbench or your favorite DB Management App with your root password.
6. Now you need to connect your db with prisma
7. For this, run 

```
$ npx prisma generate
```
8. Start requesting to the server on localhost:3000