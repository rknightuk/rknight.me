import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const dateTime = (new Date()).toISOString().split('T')[0];

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "public",
    publicFolder: "src",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "src/assets",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "link",
        label: "Links",
        path: "src/links",
        ui: {
          defaultItem: {
            date: new Date().toISOString(),
          },
          layout: {
            readonly: true,
          },
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${dateTime}-${values.title
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "link",
            label: "Link",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "comment",
            label: "Comment",
          }
        ]
      },
      {
        name: "post",
        label: "Posts",
        path: "src/posts",
        indexes: [{
          name: "date",
          fields: [
            { name: "date" }
          ],
        }],
        ui: {
          defaultItem: {
            layout: "post",
            date: new Date().toISOString(),
          },
          layout: {
            readonly: true,
          },
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${dateTime}-${values.title
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "permalink",
            label: "Permalink",
            required: true,
            ui: {
              format: (value) => {
                return `${value
                  ?.toLowerCase()}`
              },
            }
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            required: true,
            ui: {
              readonly: true,
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            label: 'Tags',
            name: 'tags',
            type: 'string',
            list: true,
            options: [
              { value: 'ActivityPub', label: 'ActivityPub' },
              { value: 'AdventOfCode', label: 'AdventOfCode' },
              { value: 'AI', label: 'AI' },
              { value: 'Alfred', label: 'Alfred' },
              { value: 'Apps', label: 'Apps' },
              { value: 'BabyKnight', label: 'BabyKnight' },
              { value: 'Development', label: 'Development' },
              { value: 'DIY', label: 'DIY' },
              { value: 'Eleventy', label: 'Eleventy' },
              { value: 'Food', label: 'Food' },
              { value: 'Games', label: 'Games' },
              { value: 'Hackathon', label: 'Hackathon' },
              { value: 'Homescreen', label: 'Homescreen' },
              { value: 'Lego', label: 'Lego' },
              { value: 'Letters', label: 'Letters' },
              { value: 'MacOS', label: 'MacOS' },
              { value: 'Mastodon', label: 'Mastodon' },
              { value: 'Movies', label: 'Movies' },
              { value: 'Music', label: 'Music' },
              { value: 'OpenWeb', label: 'OpenWeb' },
              { value: 'Personal', label: 'Personal' },
              { value: 'Podcasting', label: 'Podcasting' },
              { value: 'Recipes', label: 'Recipes' },
              { value: 'Shortcuts', label: 'Shortcuts' },
              { value: 'SocialMedia', label: 'SocialMedia' },
              { value: 'StJude', label: 'StJude' },
              { value: 'TV', label: 'TV' },
              { value: 'YearInReview', label: 'YearInReview' },
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
