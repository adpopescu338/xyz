import axios from "axios";
import qs from "qs";

export enum SlackChannels {
  apiAlerts = "api-alerts",
  feAlerts = "fe-alerts",
}
export enum SlackIcons {
  info = ":information_source:",
  warning = ":warning:",
  error = ":error-icon:",
}

const lb = `
`;

type PostToSlackArgs = {
  icon?: SlackIcons;
  channel?: SlackChannels;
  text?: string | Record<string, unknown>;
  endpoint?: string;
  extra?: Record<string, string>;
  title?: string;
};

export const postMessageToSlack = async ({
  icon = SlackIcons.info,
  channel = SlackChannels.apiAlerts,
  text = "",
  endpoint,
  extra,
  title = "",
}: PostToSlackArgs) => {
  if (process.env.POST_TO_SLACK === "false") return;
  const titl = title ? `*${title}*\n` : "";

  let formattedText =
    typeof text === "string"
      ? text
      : JSON.stringify(text, null, "\n").replace(/\\n/g, lb);

  if (extra) {
    const extras = Object.entries(extra)
      .map(([key, val]) => `${key}: ${val}`)
      .join("\n");
    formattedText = `${formattedText}\n${extras}`;
  }

  formattedText = "```" + formattedText + "```";

  formattedText = formattedText.replace(/\n\n/g, "\n");

  formattedText = `${titl}${formattedText}\n\n`;

  text = `${icon} *${process.env.NODE_ENV.toUpperCase()}* ${
    endpoint ? " `" + endpoint + "`" : ""
  } \n${formattedText}`;

  try {
    const { data } = await axios.post(
      `https://slack.com/api/chat.postMessage`,
      qs.stringify({
        channel,
        text,
        token: process.env.SLACK_TOKEN,
      })
    );
    console.log("data", data);
  } catch (error) {
    console.error("Unable to send error to slack", error);
  }
};
