import { Schema } from "express-validator";

const signUp: Schema = {
  username: {
    in: ["body"],
    notEmpty: { errorMessage: "Username is required" },
    isLength: {
      options: { min: 4 },
      errorMessage: "Username must be at least 4 characters long",
    },
  },
  password: {
    in: ["body"],
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 4 },
      errorMessage: "Password must be at least 4 characters long",
    },
  },
};

const signIn: Schema = {
  username: {
    in: ["body"],
    notEmpty: { errorMessage: "Username is required" },
    isLength: {
      options: { min: 4 },
      errorMessage: "Username must be at least 4 characters long",
    },
  },
  password: {
    in: ["body"],
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 4 },
      errorMessage: "Password must be at least 4 characters long",
    },
  },
};

export const authSchema = { signUp, signIn };
