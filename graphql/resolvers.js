import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Organizations from '../models/organization.model.js';
import Users from '../models/user.model.js';
import Tasks from '../models/task.model.js';
import { generateToken } from '../middlewares/token.jwt.js';

const resolvers = {
  Query: {
    organizations: async () => {
      try {
        const organizations = await Organizations.find();
        return organizations;
      } catch (error) {
        throw new Error(`Failed to fetch organizations: ${error.message}`);
      }
    },
    users: async () => {
      try {
        const users = await Users.find();
        return users;
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    },
    tasks: async () => {
      try {
        const tasks = await Tasks.find();
        return tasks;
      } catch (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
      }
    },
  },
  User: {
    organization: async (parent) => {
      try {
        const organization = await Organizations.findById(parent.organizationId);
        return organization;
      } catch (error) {
        throw new Error(`Failed to fetch organization for user ${parent.id}: ${error.message}`);
      }
    },
    tasks: async (parent) => {
      try {
        const tasks = await Tasks.find({ userId: parent.id });
        return tasks;
      } catch (error) {
        throw new Error(`Failed to fetch tasks for user ${parent.id}: ${error.message}`);
      }
    },
  },
  Mutation: {
    addOrganization: async (_, { name }) => {
      try {
        if (!name || typeof name !== 'string') {
          throw new Error("Name is required");
        }

        const organization = new Organizations({ name });
        await organization.save();
        return organization;
      } catch (error) {
        throw new Error(`Failed to add organization: ${error.message}`);
      }
    },
    updateOrganization: async (_, { id, name }) => {
      try {
        const organizationData = await Organizations.findById(id);
        if (!organizationData) {
          throw new Error('Organization not found');
        }

        if (!name) {
          throw new Error("Name cannot be empty");
        }

        organizationData.name = name;
        const updatedOrganization = await organizationData.save();
        return updatedOrganization;
      } catch (error) {
        throw new Error(`Failed to update organization: ${error.message}`);
      }
    },
    delOrganization: async (_, { id }) => {
      try {
        const deletedOrganization = await Organizations.findByIdAndDelete(id);
        if (!deletedOrganization) {
          throw new Error('Organization not found');
        }
        return `Organization ${deletedOrganization.name} deleted successfully`;
      } catch (error) {
        throw new Error(`Failed to delete organization: ${error.message}`);
      }
    },
    addUser: async (_, { username, password, role, organizationId }) => {
      try {
        if (!username || !password || !organizationId) {
          throw new Error("All fields are required");
        }

        if (!mongoose.Types.ObjectId.isValid(organizationId)) {
          throw new Error("Invalid organization ID");
        }

        const existingOrganization = await Organizations.findById(organizationId);

        if (!existingOrganization) {
          throw new Error("Organization does not exist");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Users({
          username,
          password: hashedPassword,
          role,
          organizationId: existingOrganization._id
        });

        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error(`Failed to add user: ${error.message}`);
      }
    },
    updateUser: async (_, { userId, username, password, role, organizationId }) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error("Invalid user ID");
        }

        const existingUser = await Users.findById(userId);

        if (!existingUser) {
          throw new Error("User not found");
        }

        // Update fields only if they are provided and different
        if (username) existingUser.username = username;
        if (role && existingUser.role !== role) existingUser.role = role;
        if (organizationId) existingUser.organizationId = organizationId;

        // Hash new password if provided
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 12);
          existingUser.password = hashedPassword;
        }

        await existingUser.save();
        return existingUser;
      } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
    },
    delUser: async (_, { id }) => {
      try {
        const deletedUser = await Users.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error('User not found');
        }
        return `User ${deletedUser.username} deleted successfully`;
      } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
    },
    userLogin: async (_, { username, password }) => {
      try {
        const user = await Users.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error('Invalid credentials');
        }

        // Generate JWT token for the user
        const token = generateToken(user);

        return {
          token,
          user: {
            id: user._id,
            username: user.username,
            role: user.role,
            organizationId: user.organizationId
          },
        };
      } catch (error) {
        throw new Error(`Failed to login: ${error.message}`);
      }
    },
    addTask: async (_, { title, description, status, dueDate, userId, organizationId }) => {
      try {
        if (!title || !description || !dueDate || !userId || !organizationId) {
          throw new Error("All fields are required");
        }

        const existingUser = await Users.findById(userId);
        const existingOrganization = await Organizations.findById(organizationId);

        if (!existingUser || !existingOrganization) {
          throw new Error("User or organization does not exist");
        }

        const newTask = new Tasks({
          title,
          description,
          status,
          dueDate,
          userId,
          organizationId
        });

        await newTask.save();
        return newTask;
      } catch (error) {
        throw new Error(`Failed to add task: ${error.message}`);
      }
    },
    updateTask: async (_, { id, userId, dueDate }) => {
      try {
        const existingTask = await Tasks.findById(id);

        if (!existingTask) {
          throw new Error("Task not found");
        }

        // Ensure only the owner or admins can update tasks
        if (existingTask.userId.toString() !== userId.toString()) {
          throw new Error("You do not have permission to update this task");
        }

        if (dueDate) {
          existingTask.dueDate = dueDate;
        }

        await existingTask.save();
        return existingTask;
      } catch (error) {
        throw new Error(`Failed to update task: ${error.message}`);
      }
    },
    deleteTask: async (_, { id, userId }) => {
      try {
        const existingTask = await Tasks.findById(id);

        if (!existingTask) {
          throw new Error("Task not found");
        }

        // Ensure only the owner or admins can delete tasks
        if (existingTask.userId.toString() !== userId.toString()) {
          throw new Error("You do not have permission to delete this task");
        }

        await Tasks.findByIdAndDelete(id);
        return `Task ${existingTask.title} deleted successfully`;
      } catch (error) {
        throw new Error(`Failed to delete task: ${error.message}`);
      }
    },
  },
};

export default resolvers;
