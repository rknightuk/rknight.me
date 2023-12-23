import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: "http://localhost:4001/graphql", token: "283467873bb0f3d43a77e5b61ff6b84d845d53a9", queries });
export default client;
