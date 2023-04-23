import { ErrorResponse } from "../requests";
import { postMessageToSlack, SlackIcons } from "../slack";

export const onErrorMiddleware = async (err, req, res) => {
  let error = { ...err };

  console.log("onErrorMiddleware", { err, error });
  // Prisma Record not found
  if (err.code === "P2025") {
    const message = err.meta.cause;
    error = new ErrorResponse(message, 404);
  }

  await postMessageToSlack({
    icon: SlackIcons.error,
    text: error,
    endpoint: req.url,
    extra: { method: req.method, referer: req.headers.referer },
  });

  const message =
    err instanceof ErrorResponse ? err.message : "An error occurred";

  res.status(error.statusCode || 500).json({
    success: false,
    error: message,
  });
};
