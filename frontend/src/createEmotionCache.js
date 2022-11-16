/* eslint-disable import/no-default-export */
import createCache from "@emotion/cache";

export default function createEmotionCache() {
  return createCache({ key: "css" });
}
