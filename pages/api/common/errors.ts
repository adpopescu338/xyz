import { Slack, ErrorPayload } from "@lib";
import { common } from "@lib/middlewares";
import { AuthedRequest } from "@lib/types";
import { NextApiResponse } from "next";

const sendErrorToSlack = async (req: AuthedRequest, res: NextApiResponse) => {
  const payload: ErrorPayload = req.body;

  await Slack({
    channel: "uiAlerts",
    icon: "error",
    text: payload.error,
    extra: {
      url: payload.url,
      lastEvent: payload.lastEvent,
      title: payload.title,
      lastElement: payload.lastElement,
      userId: req.session?.user?.id,
      userEmail: req.session?.user?.email,
      userRole: req.session?.user?.role,
    },
  });

  res.status(200).json({ success: true });
};
const handler = common().post(sendErrorToSlack);

export default handler;
