import { client } from "@prismadb";
import { ErrorResponse } from "@lib";
import bcrypt from "bcryptjs";
import { common } from "@lib/middlewares";
import { Prisma } from "@prisma/client";

const handler = common().post(login);

export const select: Prisma.UserSelect = {
  id: true,
  email: true,
  password: true,
  role: true,
  userProfile: {
    select: {
      name: true,
    },
  },
  traderProfile: {
    select: {
      name: true,
    },
  },
};

export async function getUserByEmailAndPassword(
  email: string,
  password: string
) {
  const user = await client.user.findUnique({
    where: { email },
    select,
  });

  if (!user) {
    throw new ErrorResponse("Invalid credential - user/email", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password as string);

  if (!isMatch) {
    throw new ErrorResponse("Invalid credential - email/pass", 401);
  }

  return {
    name: user.userProfile?.name || user.traderProfile?.name,
    email: user.email,
    role: user.role,
    id: user.id,
  };
}

async function login({ body: { email, password } }, res) {
  const data = await getUserByEmailAndPassword(email, password);

  return res.status(200).json({
    success: true,
    data,
  });
}

export default handler;
