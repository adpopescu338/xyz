import { captureError } from "../capture-error";

export const captureUIErrorSetup = () => {
  window.addEventListener("error", captureError);
  window.addEventListener("unhandledrejection", captureError);

  // @ts-expect-error the lastEvent is an object that will be saved on the window object
  const saveEvent = (e) => (window.lastEvent = e);

  [
    "click",
    "mouseenter",
    "mouseleave",
    "keydown",
    "keyup",
    "blur",
    "change",
    "input",
    "dblclick",
    "focus",
    "focusin",
    "input",
    "keypress",
    "keyup",
    "resize",
    "touchend",
    "touchstart",
    "touchmove",
  ].forEach((e) => window.addEventListener(e, saveEvent));
};
