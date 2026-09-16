import { revalidateTag } from "next/cache";

import { globalCacheTag } from "../lib/globals";
import { GlobalAfterChangeHook, GlobalConfig } from "payload";

const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating header`)
  revalidateTag(globalCacheTag('homepage-settings'))

  return doc
}

export const HomepageSettings: GlobalConfig = {
  slug: "homepage-settings",
  fields: [
    {
      name: "availability",
      label: "Availability",
      type: "text",
      localized: true,
    },
    {
      name: "availabilityIcon",
      label: "Availability Icon",
      type: "text",
      localized: true,
    }
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
