import {
  postMessageToSlack,
  SlackIcons,
  SlackChannels,
  CaptureErrorPayload,
} from "@lib";
import { common } from "@lib/middlewares";
import { AuthedRequest } from "@lib/types";
import { NextApiResponse } from "next";

const sendErrorToSlack = async (req: AuthedRequest, res: NextApiResponse) => {
  const payload: CaptureErrorPayload = req.body;

  await postMessageToSlack({
    channel: SlackChannels.feAlerts,
    icon: SlackIcons.error,
    text: payload.error,
    extra: {
      ...(payload.url && { url: payload.url }),
      ...(payload.lastEvent && { lastEvent: payload.lastEvent }),
      ...(payload.title && { title: payload.title }),
      ...(payload.lastElement && {
        lastElementText: payload.lastElement,
      }),
      ...(req.session?.user?.id && { userId: req.session?.user?.id }),
      ...(req.session?.user?.email && { userEmail: req.session?.user?.email }),
      ...(req.session?.user?.role && { userRole: req.session?.user?.role }),
    },
  });

  res.status(200).json({ success: true });
};
const handler = common().post(sendErrorToSlack);

export default handler;
