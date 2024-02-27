import { isString } from "lodash";

export const FormattingURL = (url: string | string[]) => {
        if (isString(url)) return url.replace(/"/g, "").replace(/\[|\]/g, "");
        return url.join(", ").replace(/"/g, "").replace(/\[|\]/g, "");
}