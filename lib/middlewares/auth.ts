import { ErrorResponse } from "@lib";
import { Role, Permission } from "@prisma/client";

export const authMiddleware = (roles: Role[]) => async (req, res, next) => {
  if (!req.session?.user) {
    return next(new ErrorResponse("Unauthorized", 401));
  }

  if (roles?.length && !roles.includes(req.session.user.role)) {
    return next(new ErrorResponse("Unauthorized", 401));
  }

  next();
};

export const adminMiddleware =
  (permissions: Permission[]) => async (req, res, next) => {
    const session = req.session;

    if (session?.user?.role !== Role.Admin) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    if (permissions?.length) {
      const hasPermission = session.user.permissions.some((permission) => {
        return permissions.includes(permission);
      });

      if (!hasPermission) {
        return next(new ErrorResponse("Unauthorized", 401));
      }
    }

    next();
  };
