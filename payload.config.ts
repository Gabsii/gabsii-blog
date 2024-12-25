// storage-adapter-import-placeholder
import path from "path";
import sharp from "sharp";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { fieldsSelect } from "@payload-enchants/fields-select";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Projects } from "@/collections/Projects";
import { Contact } from "@/collections/Contact";
import { NewsletterSignups } from "@/collections/NewsletterSignups";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  graphQL: {
    disable: true,
  },
  collections: [Users, Media, Projects, Contact, NewsletterSignups],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: `${process.env.NODE_ENV}/media/`,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "eu-central-1",
      },
    }),
    // ! follow https://github.com/payloadcms/payload/pull/5942 for when to remove this plugin
    fieldsSelect(),
  ],
});