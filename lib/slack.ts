import { WebClient } from "@slack/web-api";
const token = process.env.SLACK_TOKEN;

const channels = {
  apiAlerts: "C053PLTE9S8",
  uiAlerts: "C054AT373AL",
};
const icons = {
  info: ":information_source:",
  warning: ":warning:",
  error: ":error:",
};

const lb = `
`;

type PostToSlackArgs = {
  icon?: "info" | "warning" | "error";
  channel?: "apiAlerts" | "uiAlerts" | "newCompany" | "general";
  text?: string | Record<string, unknown>;
  endpoint?: string;
  extra?: Record<string, string>;
  title?: string;
};

export const Slack = async ({
  icon = "info",
  channel = "apiAlerts",
  text = "",
  endpoint,
  extra,
  title = "",
}: PostToSlackArgs) => {
  if (process.env.POST_TO_SLACK === "false") return;
  const client = new WebClient(token);
  const channelId = channels[channel];
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

  try {
    await client.chat.postMessage({
      channel: channelId,
      text: `${icons[icon]} *${process.env.NODE_ENV.toUpperCase()}* ${
        endpoint ? " `" + endpoint + "`" : ""
      } \n${formattedText}`,
    });
  } catch (error) {
    console.error(error);
  }
};
