import { readFileSync } from "fs";

export const getText = () => {
  return JSON.parse(readFileSync("text.json", "utf8"));
};
