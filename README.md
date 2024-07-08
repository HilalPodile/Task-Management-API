# Task Management API

## Description
This API is designed to manage tasks with CRUD (Create, Read, Update, Delete) operations on Organizations, Users, and Tasks collections, based on Role-Based Access Control (RBAC).

## Note
This code is not production-ready. There is a known issue with JWT token validation during re-login. The token generates correctly upon login but fails verification on re-login. This will be fixed soon.

## Project Setup

1. **Create a New Folder**
   - Create an empty folder for the project.

2. **Initialize Git Repository**
   - Navigate to the folder and run:
     ```bash
     git init
     ```

3. **Clone the Repository**
   - Copy the repository link: `https://github.com/HilalPodile/Task-Management-API.git`
   - Clone the repository:
     ```bash
     git clone <repo_link>
     ```

4. **Install Dependencies**
   - Navigate to the project folder and run:
     ```bash
     npm install
     ```
   - Install additional packages:
     ```bash
     npm install express apollo-server graphql bcrypt dotenv jsonwebtoken
     ```

5. **Update `package.json`**
   - In `package.json`, add the following key-value pair above the scripts object:
     ```json
     "type": "module"
     ```

6. **Create `.env` File**
   - In the root folder, create a `.env` file and define the following variables:
     ```
     PORT=your_port_number
     mongoURI=your_mongodb_uri
     ```

7. **Run the Server**
   - To execute the code, run:
     ```bash
     node filename
     ```
     (Replace `filename` with the file where the server is defined.)

8. **Using Nodemon**
   - To avoid restarting the server manually after every change, install Nodemon globally:
     ```bash
     npm install -g nodemon
     ```
   - Run the server using Nodemon:
     ```bash
     nodemon filename
     ```

## Technologies Used

1. **Express.js**
   - A Node.js web application framework for building web services and APIs.

2. **bcrypt**
   - A library for hashing and comparing passwords.

3. **Apollo Server**
   - An open-source GraphQL server for building production-ready GraphQL APIs.

4. **graphql**
   - A query language for APIs and a runtime for executing those queries.

5. **dotenv**
   - A module for loading environment variables from a `.env` file.

---

*Working on making this project production-ready and bug-free. Future updates will be pushed to the same repository.*

**Thank you. Happy coding!**
