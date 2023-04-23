import { signup_otp } from "@emails";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "@lib";
import { common } from "@lib/middlewares";
import { client } from "@prismadb";
import { Role } from "@prisma/client";
import { generateOtp } from "@lib/utils";
import { getText } from "@lib";
import add from "date-fns/add";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  throw new ErrorResponse("Test error", 400);
  const { Errors } = getText();
  if (!req.body.email) {
    throw new ErrorResponse(Errors.signup_missing_email, 400);
  }

  if (!req.body.role) {
    throw new ErrorResponse(Errors.signup_missing_role, 400);
  }

  if (req.body.role === Role.Admin) {
    throw new ErrorResponse(Errors.signup_invalid_role, 400);
  }

  const otp = generateOtp();

  const user = await client.user.create({
    data: {
      email: req.body.email?.trim()?.toLowerCase(),
      role: req.body.role,
      resetPasswordOtp: String(otp),
      resetPasswordOtpExpire: add(new Date(), { days: 1 }),
    },
  });

  await signup_otp({
    to: user.email,
    otp: String(otp),
  });


  res.status(200).json({
    success: true,
    data: {
      otp,
    },
  });
};

const handler = common().post(signup);

export default handler;
