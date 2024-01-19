import {z} from "zod"

export const registrationSchema = z.object({
    username: z.string().min(3).max(30).optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  //you can use while sending back to data