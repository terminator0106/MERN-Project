import z from "zod";

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3,{message: "Email must be at least 3 characters long"})
    .max(50,{message: "Email must not be more than 50 characters long"}),

    password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8,{message: "Password must be at least 8 characters long"})
    .max(20,{message: "Password must not be more than 20 characters long"}),
});

const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3,{message: "Username must be at least 3 characters long"})
    .max(20,{message: "Username must not be more than 20 characters long"}),
    
    contact: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10,{message: "Phone must be at least 10 characters long"})
    .max(10,{message: "Phone must not be more than 15 characters long"}),
    
});

export {loginSchema, signupSchema};