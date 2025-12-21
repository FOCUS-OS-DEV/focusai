import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { Lessons } from './collections/Lessons'
import { Enrollments } from './collections/Enrollments'
import { Progress } from './collections/Progress'
import { Purchases } from './collections/Purchases'
import { Messages } from './collections/Messages'
import { Certificates } from './collections/Certificates'
import { Coupons } from './collections/Coupons'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Contacts } from './collections/Contacts'
import { Recordings } from './collections/Recordings'

import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'

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
    Courses,
    Lessons,
    Enrollments,
    Progress,
    Purchases,
    Messages,
    Certificates,
    Coupons,
    Pages,
    Posts,
    Contacts,
    Recordings,
  ],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
  plugins: [],
})
