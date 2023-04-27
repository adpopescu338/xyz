import nc from "next-connect";
import cors from "cors";
import { onErrorMiddleware } from "./error";
import { authMiddleware, adminMiddleware } from "./auth";
import { loggerMiddleware } from "./logger";
import { addSessionMiddleware } from "./add-session-middleware";
import { Role, Permission } from "@prisma/client";

const errorHandler = { onError: onErrorMiddleware };

export const common = () =>
  nc(errorHandler).use(cors()).use(loggerMiddleware).use(addSessionMiddleware);

export const authed = (roles?: Role | Role[]) =>
  nc(errorHandler)
    .use(cors())
    .use(loggerMiddleware)
    .use(addSessionMiddleware)
    .use(authMiddleware(Array.isArray(roles) ? roles : [roles]));

export const admin = (permissions?: Permission | Permission[]) =>
  nc(errorHandler)
    .use(cors())
    .use(loggerMiddleware)
    .use(addSessionMiddleware)
    .use(
      adminMiddleware(Array.isArray(permissions) ? permissions : [permissions])
    );
