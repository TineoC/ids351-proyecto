# IDS351-Proyecto-Final

## Installation guide

1. First make sure you have [Node.js](https://nodejs.org/en), [Git](https://git-scm.com/) and [Docker](https://www.docker.com/)
 installed and running.

    ```bash
    node -v
    git -v
    docker compose version
    ```

2. Clone the repo.

    ```bash
    git clone https://github.com/TineoC/ids351-proyecto
    cd ids351-proyecto
    ```

3. Copy the [.env.example](./.env.example) file and name it to just ".env"
4. Inside ".env" rename both ROOT_PASSWORD from DB_PASSWORD and DATABASE_URL.
5. Run ```npm run dev```
6. Start requesting to the server on localhost:3000.
7. Your project is up and running 🎉.
