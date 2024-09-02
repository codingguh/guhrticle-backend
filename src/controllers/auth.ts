import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

// Sign-up function
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user with hashed password
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
};

// Login function
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Set an expiration time for better security
    );

    // Respond with the user and token
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
};
