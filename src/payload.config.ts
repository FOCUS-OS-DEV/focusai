import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudinaryStorage } from 'payload-cloudinary'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { Cohorts } from './collections/Cohorts'
import { Lessons } from './collections/Lessons'
import { Enrollments } from './collections/Enrollments'
import { Progress } from './collections/Progress'
import { Attendance } from './collections/Attendance'
import { Assignments } from './collections/Assignments'
import { Submissions } from './collections/Submissions'
import { Certificates } from './collections/Certificates'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Testimonials } from './collections/Testimonials'
import { Instructors } from './collections/Instructors'
import { Contacts } from './collections/Contacts'
import { Partners } from './collections/Partners'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Homepage } from './globals/Homepage'

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
    // Core
    Users,
    Media,
    // Academy
    Courses,
    Cohorts,
    Lessons,
    Enrollments,
    Progress,
    Attendance,
    Assignments,
    Submissions,
    Certificates,
    // Content
    Posts,
    Categories,
    Testimonials,
    Instructors,
    // Leads
    Contacts,
    Partners,
  ],
  globals: [SiteSettings, Navigation, Homepage],
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
  plugins: [
    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: process.env.CLOUDINARY_API_KEY || '',
        api_secret: process.env.CLOUDINARY_API_SECRET || '',
      },
      collections: {
        media: true,
      },
      folder: 'focusai-academy',
    }),
  ],
})
