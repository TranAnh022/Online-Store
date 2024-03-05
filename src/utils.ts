import { isString } from "lodash";

export const formattingURL = (url: string | string[]) => {
  if (isString(url)) return url.replace(/"/g, "").replace(/\[|\]/g, "");
  return url.join(", ").replace(/"/g, "").replace(/\[|\]/g, "");
};
