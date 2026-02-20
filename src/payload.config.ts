// storage-adapter-import-placeholder
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { postgresAdapter } from '@payloadcms/db-postgres' // CHANGED
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Registrations } from './collections/Registrations'
import { Tickets } from './collections/Tickets'
import { Payments } from './collections/Payments'
import { Programs } from './collections/Programs'
import { Speakers } from './collections/Speakers'
import { Blogs } from './collections/Blogs'
import { PreviousSummits } from './collections/PreviousSummits'
import { Gallery } from './collections/Gallery'
import { SchoolSummit } from './collections/SchoolSummit'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Registrations,
    Tickets,
    Payments,
    Speakers,
    Programs,
    Blogs,
    PreviousSummits,
    Gallery,
    SchoolSummit,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // CHANGED: MongoDB → PostgreSQL
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
