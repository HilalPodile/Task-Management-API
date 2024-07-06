import { gql } from 'apollo-server';
import pkg from 'graphql-iso-date';
const { GraphQLDate } = pkg;

const typeDefs = gql`
  scalar Date

  type Organization {
    id: ID!
    name: String!
  }

  type User {
    username: String!
    password: String!
    role: String
    organizationId: ID
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String
    dueDate: Date!
    userId: ID!
    organizationId: ID!
  }

  type Query {
    organizations: [Organization]
    users: [User]
    tasks: [Task]
  }

  type Mutation {
    addOrganization(name: String!): Organization

    updateOrganization(id: ID!, name: String!): Organization

    delOrganization(id: ID!): String

    addUser(username: String!, password: String!, role: String, organizationId: ID!): User

    updateUser(userId: ID!, username: String!, password: String!, role: String, organizationId: ID!): User

    userLogin(username: String!, password: String!): AuthPayload

    delUser(id: ID!):String

    addTask(title: String!, description: String!, status: String, dueDate: Date!, userId: ID!, organizationId: ID!): Task

    updateTask(id: ID!, userId: ID!, dueDate: Date!): Task

    deleteTask(id: ID!, userId: ID!): String
  }
`;

export default typeDefs;
