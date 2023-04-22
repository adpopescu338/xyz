import { CommonClient, CaptureErrorPayload } from "./requests";

export const captureError = (e: any, info?: string) => {
  const eObj = {
    type: e?.type,
    line_number: e.lineno,
    file_name: e.filename,
    message: e.message,
    stack: e.error?.stack,
    info,
  };

  const payload: CaptureErrorPayload = {
    error: eObj,
    url: window.location.href,
    title: e.message,
  };
  // @ts-expect-error
  if (window.lastEvent) {
    // @ts-expect-error
    payload.lastEvent = window.lastEvent.type;
    // @ts-expect-error
    payload.lastElement = window.lastEvent.target.tagName;
    // @ts-expect-error
    window.lastEvent.target?.getAttributeNames()?.forEach((att) => {
      // @ts-expect-error
      let elementAttribute = window.lastEvent.target.getAttribute(att);
      if (att === "style") {
        return;
      }

      if (
        att === "src" &&
        elementAttribute.includes("data:image/webp;base64")
      ) {
        elementAttribute = "data:image/webp;base64....";
      }

      payload.lastElement = `${payload.lastElement} [${att}=${elementAttribute}]`;
    });
  }

  CommonClient.sendCapturedError(payload);
};
