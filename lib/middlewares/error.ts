import { ErrorResponse, Slack } from "@lib";

export const onErrorMiddleware = async (err, req, res) => {
  let error = { ...err };
  error.message = err.message;

  // Prisma Record not found
  if (err.code === "P2025") {
    const message = err.meta.cause;
    error = new ErrorResponse(message, 404);
  }

  await Slack({
    icon: "error",
    text: error,
    endpoint: req.url,
    extra: { method: req.method, referer: req.headers.referer },
  });

  const message =
    error instanceof ErrorResponse ? error.message : "An error occurred";

  res.status(error.statusCode || 500).json({
    success: false,
    error: message,
  });
};
