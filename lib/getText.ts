import { readFileSync } from "fs";
import { TEXT_FILE_PATH } from "@constants";

export const getText = () => {
  return JSON.parse(readFileSync(TEXT_FILE_PATH, "utf8"));
};
