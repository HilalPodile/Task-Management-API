Description: This is a task-management-api mainly focussing on to perform crud operations on collections Organization, Users and Tasks based on rbac(role based access control)

Note: This is not a production ready code. There is one small bug in the code which failing to validate user using the jwt token. We are able to generate a jwt token while user log's in but failing to verify the token when he re-logs. Will wotk on that in mean time.

//Project set up

1. Create a empty folder 
2. Initialize the folder using `git init` command
3. Copy the link : https://github.com/HilalPodile/Task-Management-API.git
4. Clone the repo using the below commands: 
    4.1 git clone <repo_link>
5. After successful cloning of repo, open the folder and run the command in terminal : npm init(The npm init command install the node_modules in the folder)
6. Install the required packages to run the code using the command: npm i express apollo-server graphql bcrypt dotenv 
7. After successful installation of the packages, in the package.json file above scripts object add a key value pair "type": "module". This change is necessary as we are using module.js
8. Now create a .env file in the root folder and define variables: PORT and mongoURI
9. After declartion of variables you would be ready to execute the code.
10. To execute the code run the command: node filename(This filename is the file where the server is defined).

Note: If you are using the command node filename.js to run the code you need to start the server everytime you make changes in .js files.

To get rid of the above issue: Install nodemon using the command npm i nodemon --global

Nodemon: This api monitors the chnages in .js files and restart the server once the changes are saved.

API's we are using in proeject and their uses:

1. express.js: This is a node.js web-application-framework used for building web services and web API's
2. bcrypt: This is a popular framework mainly used for data encryption and decryption. We used bcrypt in the project for encryption and decryption of user password.
3. Apollo-Server: This is a open-source GraphQL server helps in creating production ready GraphQL API's.
4. graphql: This is a query language for API's and runtime for executing those queries.
5. dotenv: This api helps us in protecting sensitive data.

/* Working on making this project production ready and bug free. In future will push the code to the same repo with required changes.*/

----------Thank you. Happy coding-----------