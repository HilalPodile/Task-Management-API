import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';
import Organization from './models/organization.model.js';
import User from './models/user.model.js'; 
import Task from './models/task.model.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.mongoURI)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

await server.start();
server.applyMiddleware({ app });

//Route to fetch all organizations
app.get('/organizations/all', async (req, res) => {
    try {
      const organizations = await Organization.find();
      if (!organizations) {
        return res.status(404).json({ error: 'Organizations not found' });
      }
      res.json(organizations);
    } catch (error) {
      console.error('Failed to fetch organizations:', error.message);
      res.status(500).json({ error: 'Failed to fetch organizations' });
    }
});  

// Route to fetch all users
app.get('/users/all', async (req, res) => {
  try {
    const users = await User.find().populate('organizationId');
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to fetch all tasks
app.get('/tasks/all', async (req, res) => {
  try {
    const tasks = await Task.find().populate({
        path: 'userId',
        model: 'User'
    }).populate('organizationId');
    res.json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error.message);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
