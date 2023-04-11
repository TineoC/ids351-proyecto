# IDS328L-Proyecto-Final

## Installation guide

1. First make sure you have [Node.js](https://nodejs.org/en), [Git](https://git-scm.com/) and [Docker](https://www.docker.com/)
 installed running 
 
 ```
$ node -v
$ git -v
$ docker compose version
```

2. Clone the repo

```
$ git clone https://gitlab.com/TineoChris/ids328l-proyecto-final
$ cd ids328-proyecto-final
```

3. Copy the [.env.example](./.env.example) file and name it to just ".env"
> **IMPORTANT. Rename both ROOT_PASSWORD from DB_PASSWORD and DATABASE_URL.**
4. Run these commands inside the project directory

```
$ docker compose up -d
```

5. Start requesting to the server on localhost:3000
6. Your project is up and running 🎉
