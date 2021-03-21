# file-uploader-api
**Version 1.0.0**

A RESTful API that serves data to the trivia game. Using the Trivia API enables the user to add, delete, update, set questions, and play the game choosing a specific category.
S3 file uploader api with Nodejs.

> Note: JavaScript ES5 is used for this application.

## Getting Started

### Technology Used

- [Express](https://expressjs.com/)  is a lightweight backend microservices framework.

- [Sequalizer](https://sequelize.org/v3/) is the database ORM  used handle to build db schema and interact with mysql database server.

### Prerequisites

- Local or remote instance of MySQL running.

### Installion

#### Install Nodejs

Follow instructions to install the node on your machine [Node docs](https://nodejs.org/en/download/).

#### Clone Repository

Navigate to your project folder on local machine and execute the following command from your terminal to clone the repository into your current directory locally.

```bash
git clone https://github.com/ahmedmeshref/file-uploader-api.git
```

#### Install Dependencies

From your terminal, install all dependencies needed by executing ```npm install```.

#### Create ENV Variables 

- Create .env file in the main project directory to store all environment variables needed. If you are using linux, execute ```touch .env``` from your terminal.

- Copy and update the values of the following variables to your .env file.
```
DATABASE_HOST={db_host}
DATABASE={db_name}
DB_USERNAME={db_username}
DB_PASSWORD={db_password}
PORT={application_port}
AWS_BUCKET_NAME={s3_bucket_name}
AWS_ACCESS_ID={aws_access_id}
AWS_SECRET_ACCESS_KEY={aws_access_key}
```

> Example: DATABASE_HOST=localhost
 
#### Run API

To run the server, from your terminal execute:

```bash
npm start
```

### Interact with API 

Interact with the api via postman. The default URI is http://{your_url}:{port_number}/api/v1/your-route eg: http://localhost:8080/api/v1/upload





