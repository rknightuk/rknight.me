import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: "https://content.tinajs.io/1.4/content/c1ec0969-0bf5-4a80-8d35-b2f9fcd4c113/github/master", token: "283467873bb0f3d43a77e5b61ff6b84d845d53a9", queries });
export default client;
