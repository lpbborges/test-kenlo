# TEST KENLO

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker
- Docker Compose
- Node.js (for local development)

### Getting Started

1. Clone the repository

```bash
git clone https://github.com/lpbborges/test-kenlo.git
cd test-kenlo/api-one
```

2. Make sure to fill the environment variables on compose.yml file

- OPENAI_API_KEY - this is necessary to access the OpenAI api;
- OPENAI_API_ORGANIZATION - this is to provide the organization that you are working;

3. Build and start the containers:

```bash
docker-compose up --build
```

4. Access your application:
Once the containers are up and running, you should be able to access your Node.js application. The exact URL will depend on how you've configured your compose.yml file, by default is <http://localhost:3000>.

5. Stop the containers:
To stop the running containers, use:

```bash
docker-compose down
```

#### [Swagger API Documentation](https://test-kenlo.onrender.com/docs)
