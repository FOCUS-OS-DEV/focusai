# Payload CMS Development Rules

You are an expert Payload CMS developer. When working with Payload projects, follow these rules:

## Core Principles

1. **TypeScript-First**: Always use TypeScript with proper types from Payload
2. **Security-Critical**: Follow all security patterns, especially access control
3. **Type Generation**: Run `generate:types` script after schema changes
4. **Transaction Safety**: Always pass `req` to nested operations in hooks
5. **Access Control**: Understand Local API bypasses access control by default
6. **Access Control**: Ensure roles exist when modifiyng collection or globals with access controls

### Code Validation

- To validate typescript correctness after modifying code run `tsc --noEmit`
- Generate import maps after creating or modifying components.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Frontend routes
│   └── (payload)/           # Payload admin routes
├── collections/             # Collection configs
├── globals/                 # Global configs
├── components/              # Custom React components
├── hooks/                   # Hook functions
├── access/                  # Access control functions
└── payload.config.ts        # Main config
```

## Configuration

### Minimal Config Pattern

```typescript
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL,
  }),
})
```

## Collections

### Basic Collection

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'createdAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, index: true },
    { name: 'content', type: 'richText' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
  ],
  timestamps: true,
}
```

### Auth Collection with RBAC

```typescript
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'editor', 'user'],
      defaultValue: ['user'],
      required: true,
      saveToJWT: true, // Include in JWT for fast access checks
      access: {
        update: ({ req: { user } }) => user?.roles?.includes('admin'),
      },
    },
  ],
}
```

## Fields

### Common Patterns

```typescript
// Auto-generate slugs
import { slugField } from 'payload'
slugField({ fieldToUse: 'title' })

// Relationship with filtering
{
  name: 'category',
  type: 'relationship',
  relationTo: 'categories',
  filterOptions: { active: { equals: true } },
}

// Conditional field
{
  name: 'featuredImage',
  type: 'upload',
  relationTo: 'media',
  admin: {
    condition: (data) => data.featured === true,
  },
}

// Virtual field
{
  name: 'fullName',
  type: 'text',
  virtual: true,
  hooks: {
    afterRead: [({ siblingData }) => `${siblingData.firstName} ${siblingData.lastName}`],
  },
}
```

## CRITICAL SECURITY PATTERNS

### 1. Local API Access Control (MOST IMPORTANT)

```typescript
// ❌ SECURITY BUG: Access control bypassed
await payload.find({
  collection: 'posts',
  user: someUser, // Ignored! Operation runs with ADMIN privileges
})

// ✅ SECURE: Enforces user permissions
await payload.find({
  collection: 'posts',
  user: someUser,
  overrideAccess: false, // REQUIRED
})

// ✅ Administrative operation (intentional bypass)
await payload.find({
  collection: 'posts',
  // No user, overrideAccess defaults to true
})
```

**Rule**: When passing `user` to Local API, ALWAYS set `overrideAccess: false`

### 2. Transaction Safety in Hooks

```typescript
// ❌ DATA CORRUPTION RISK: Separate transaction
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        // Missing req - runs in separate transaction!
      })
    },
  ],
}

// ✅ ATOMIC: Same transaction
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.create({
        collection: 'audit-log',
        data: { docId: doc.id },
        req, // Maintains atomicity
      })
    },
  ],
}
```

**Rule**: ALWAYS pass `req` to nested operations in hooks

### 3. Prevent Infinite Hook Loops

```typescript
// ❌ INFINITE LOOP
hooks: {
  afterChange: [
    async ({ doc, req }) => {
      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { views: doc.views + 1 },
        req,
      }) // Triggers afterChange again!
    },
  ],
}

// ✅ SAFE: Use context flag
hooks: {
  afterChange: [
    async ({ doc, req, context }) => {
      if (context.skipHooks) return

      await req.payload.update({
        collection: 'posts',
        id: doc.id,
        data: { views: doc.views + 1 },
        context: { skipHooks: true },
        req,
      })
    },
  ],
}
```

## Access Control

### Collection-Level Access

```typescript
import type { Access } from 'payload'

// Boolean return
const authenticated: Access = ({ req: { user } }) => Boolean(user)

// Query constraint (row-level security)
const ownPostsOnly: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user?.roles?.includes('admin')) return true

  return {
    author: { equals: user.id },
  }
}

// Async access check
const projectMemberAccess: Access = async ({ req, id }) => {
  const { user, payload } = req

  if (!user) return false
  if (user.roles?.includes('admin')) return true

  const project = await payload.findByID({
    collection: 'projects',
    id: id as string,
    depth: 0,
  })

  return project.members?.includes(user.id)
}
```

### Field-Level Access

```typescript
// Field access ONLY returns boolean (no query constraints)
{
  name: 'salary',
  type: 'number',
  access: {
    read: ({ req: { user }, doc }) => {
      // Self can read own salary
      if (user?.id === doc?.id) return true
      // Admin can read all
      return user?.roles?.includes('admin')
    },
    update: ({ req: { user } }) => {
      // Only admins can update
      return user?.roles?.includes('admin')
    },
  },
}
```

### Common Access Patterns

```typescript
// Anyone
export const anyone: Access = () => true

// Authenticated only
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

// Admin only
export const adminOnly: Access = ({ req: { user } }) => {
  return user?.roles?.includes('admin')
}

// Admin or self
export const adminOrSelf: Access = ({ req: { user } }) => {
  if (user?.roles?.includes('admin')) return true
  return { id: { equals: user?.id } }
}

// Published or authenticated
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
```

## Hooks

### Common Hook Patterns

```typescript
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    // Before validation - format data
    beforeValidate: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],

    // Before save - business logic
    beforeChange: [
      async ({ data, req, operation, originalDoc }) => {
        if (operation === 'update' && data.status === 'published') {
          data.publishedAt = new Date()
        }
        return data
      },
    ],

    // After save - side effects
    afterChange: [
      async ({ doc, req, operation, previousDoc, context }) => {
        // Check context to prevent loops
        if (context.skipNotification) return

        if (operation === 'create') {
          await sendNotification(doc)
        }
        return doc
      },
    ],

    // After read - computed fields
    afterRead: [
      async ({ doc, req }) => {
        doc.viewCount = await getViewCount(doc.id)
        return doc
      },
    ],

    // Before delete - cascading deletes
    beforeDelete: [
      async ({ req, id }) => {
        await req.payload.delete({
          collection: 'comments',
          where: { post: { equals: id } },
          req, // Important for transaction
        })
      },
    ],
  },
}
```

## Queries

### Local API

```typescript
// Find with complex query
const posts = await payload.find({
  collection: 'posts',
  where: {
    and: [{ status: { equals: 'published' } }, { 'author.name': { contains: 'john' } }],
  },
  depth: 2, // Populate relationships
  limit: 10,
  sort: '-createdAt',
  select: {
    title: true,
    author: true,
  },
})

// Find by ID
const post = await payload.findByID({
  collection: 'posts',
  id: '123',
  depth: 2,
})

// Create
const newPost = await payload.create({
  collection: 'posts',
  data: {
    title: 'New Post',
    status: 'draft',
  },
})

// Update
await payload.update({
  collection: 'posts',
  id: '123',
  data: { status: 'published' },
})

// Delete
await payload.delete({
  collection: 'posts',
  id: '123',
})
```

### Query Operators

```typescript
// Equals
{ status: { equals: 'published' } }

// Not equals
{ status: { not_equals: 'draft' } }

// Greater than / less than
{ price: { greater_than: 100 } }
{ age: { less_than_equal: 65 } }

// Contains (case-insensitive)
{ title: { contains: 'payload' } }

// Like (all words present)
{ description: { like: 'cms headless' } }

// In array
{ category: { in: ['tech', 'news'] } }

// Exists
{ image: { exists: true } }

// Near (geospatial)
{ location: { near: [-122.4194, 37.7749, 10000] } }
```

### AND/OR Logic

```typescript
{
  or: [
    { status: { equals: 'published' } },
    { author: { equals: user.id } },
  ],
}

{
  and: [
    { status: { equals: 'published' } },
    { featured: { equals: true } },
  ],
}
```

## Getting Payload Instance

```typescript
// In API routes (Next.js)
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
  })

  return Response.json(posts)
}

// In Server Components
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'posts' })

  return <div>{docs.map(post => <h1 key={post.id}>{post.title}</h1>)}</div>
}
```

## Components

The Admin Panel can be extensively customized using React Components. Custom Components can be Server Components (default) or Client Components.

### Defining Components

Components are defined using **file paths** (not direct imports) in your config:

**Component Path Rules:**

- Paths are relative to project root or `config.admin.importMap.baseDir`
- Named exports: use `#ExportName` suffix or `exportName` property
- Default exports: no suffix needed
- File extensions can be omitted

```typescript
import { buildConfig } from 'payload'

export default buildConfig({
  admin: {
    components: {
      // Logo and branding
      graphics: {
        Logo: '/components/Logo',
        Icon: '/components/Icon',
      },

      // Navigation
      Nav: '/components/CustomNav',
      beforeNavLinks: ['/components/CustomNavItem'],
      afterNavLinks: ['/components/NavFooter'],

      // Header
      header: ['/components/AnnouncementBanner'],
      actions: ['/components/ClearCache', '/components/Preview'],

      // Dashboard
      beforeDashboard: ['/components/WelcomeMessage'],
      afterDashboard: ['/components/Analytics'],

      // Auth
      beforeLogin: ['/components/SSOButtons'],
      logout: { Button: '/components/LogoutButton' },

      // Settings
      settingsMenu: ['/components/SettingsMenu'],

      // Views
      views: {
        dashboard: { Component: '/components/CustomDashboard' },
      },
    },
  },
})
```

**Component Path Rules:**

- Paths are relative to project root or `config.admin.importMap.baseDir`
- Named exports: use `#ExportName` suffix or `exportName` property
- Default exports: no suffix needed
- File extensions can be omitted

### Component Types

1. **Root Components** - Global Admin Panel (logo, nav, header)
2. **Collection Components** - Collection-specific (edit view, list view)
3. **Global Components** - Global document views
4. **Field Components** - Custom field UI and cells

### Component Types

1. **Root Components** - Global Admin Panel (logo, nav, header)
2. **Collection Components** - Collection-specific (edit view, list view)
3. **Global Components** - Global document views
4. **Field Components** - Custom field UI and cells

### Server vs Client Components

**All components are Server Components by default** (can use Local API directly):

```tsx
// Server Component (default)
import type { Payload } from 'payload'

async function MyServerComponent({ payload }: { payload: Payload }) {
  const posts = await payload.find({ collection: 'posts' })
  return <div>{posts.totalDocs} posts</div>
}

export default MyServerComponent
```

**Client Components** need the `'use client'` directive:

```tsx
'use client'
import { useState } from 'react'
import { useAuth } from '@payloadcms/ui'

export function MyClientComponent() {
  const [count, setCount] = useState(0)
  const { user } = useAuth()

  return (
    <button onClick={() => setCount(count + 1)}>
      {user?.email}: Clicked {count} times
    </button>
  )
}
```

### Using Hooks (Client Components Only)

```tsx
'use client'
import {
  useAuth, // Current user
  useConfig, // Payload config (client-safe)
  useDocumentInfo, // Document info (id, collection, etc.)
  useField, // Field value and setter
  useForm, // Form state
  useFormFields, // Multiple field values (optimized)
  useLocale, // Current locale
  useTranslation, // i18n translations
  usePayload, // Local API methods
} from '@payloadcms/ui'

export function MyComponent() {
  const { user } = useAuth()
  const { config } = useConfig()
  const { id, collection } = useDocumentInfo()
  const locale = useLocale()
  const { t } = useTranslation()

  return <div>Hello {user?.email}</div>
}
```

### Collection/Global Components

```typescript
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    components: {
      // Edit view
      edit: {
        PreviewButton: '/components/PostPreview',
        SaveButton: '/components/CustomSave',
        SaveDraftButton: '/components/SaveDraft',
        PublishButton: '/components/Publish',
      },

      // List view
      list: {
        Header: '/components/ListHeader',
        beforeList: ['/components/BulkActions'],
        afterList: ['/components/ListFooter'],
      },
    },
  },
}
```

### Field Components

```typescript
{
  name: 'status',
  type: 'select',
  options: ['draft', 'published'],
  admin: {
    components: {
      // Edit view field
      Field: '/components/StatusField',
      // List view cell
      Cell: '/components/StatusCell',
      // Field label
      Label: '/components/StatusLabel',
      // Field description
      Description: '/components/StatusDescription',
      // Error message
      Error: '/components/StatusError',
    },
  },
}
```

**UI Field** (presentational only, no data):

```typescript
{
  name: 'refundButton',
  type: 'ui',
  admin: {
    components: {
      Field: '/components/RefundButton',
    },
  },
}
```

### Performance Best Practices

1. **Import correctly:**

   - Admin Panel: `import { Button } from '@payloadcms/ui'`
   - Frontend: `import { Button } from '@payloadcms/ui/elements/Button'`

2. **Optimize re-renders:**

   ```tsx
   // ❌ BAD: Re-renders on every form change
   const { fields } = useForm()

   // ✅ GOOD: Only re-renders when specific field changes
   const value = useFormFields(([fields]) => fields[path])
   ```

3. **Prefer Server Components** - Only use Client Components when you need:

   - State (useState, useReducer)
   - Effects (useEffect)
   - Event handlers (onClick, onChange)
   - Browser APIs (localStorage, window)

4. **Minimize serialized props** - Server Components serialize props sent to client

### Styling Components

```tsx
import './styles.scss'

export function MyComponent() {
  return <div className="my-component">Content</div>
}
```

```scss
// Use Payload's CSS variables
.my-component {
  background-color: var(--theme-elevation-500);
  color: var(--theme-text);
  padding: var(--base);
  border-radius: var(--border-radius-m);
}

// Import Payload's SCSS library
@import '~@payloadcms/ui/scss';

.my-component {
  @include mid-break {
    background-color: var(--theme-elevation-900);
  }
}
```

### Type Safety

```tsx
import type {
  TextFieldServerComponent,
  TextFieldClientComponent,
  TextFieldCellComponent,
  SelectFieldServerComponent,
  // ... etc
} from 'payload'

export const MyField: TextFieldClientComponent = (props) => {
  // Fully typed props
}
```

### Import Map

Payload auto-generates `app/(payload)/admin/importMap.js` to resolve component paths.

**Regenerate manually:**

```bash
payload generate:importmap
```

**Set custom location:**

```typescript
export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
      importMapFile: path.resolve(dirname, 'app', 'custom-import-map.js'),
    },
  },
})
```

## Custom Endpoints

```typescript
import type { Endpoint } from 'payload'
import { APIError } from 'payload'

// Always check authentication
export const protectedEndpoint: Endpoint = {
  path: '/protected',
  method: 'get',
  handler: async (req) => {
    if (!req.user) {
      throw new APIError('Unauthorized', 401)
    }

    // Use req.payload for database operations
    const data = await req.payload.find({
      collection: 'posts',
      where: { author: { equals: req.user.id } },
    })

    return Response.json(data)
  },
}

// Route parameters
export const trackingEndpoint: Endpoint = {
  path: '/:id/tracking',
  method: 'get',
  handler: async (req) => {
    const { id } = req.routeParams

    const tracking = await getTrackingInfo(id)

    if (!tracking) {
      return Response.json({ error: 'not found' }, { status: 404 })
    }

    return Response.json(tracking)
  },
}
```

## Drafts & Versions

```typescript
export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
      validate: false, // Don't validate drafts
    },
    maxPerDoc: 100,
  },
  access: {
    read: ({ req: { user } }) => {
      // Public sees only published
      if (!user) return { _status: { equals: 'published' } }
      // Authenticated sees all
      return true
    },
  },
}

// Create draft
await payload.create({
  collection: 'pages',
  data: { title: 'Draft Page' },
  draft: true, // Skips required field validation
})

// Read with drafts
const page = await payload.findByID({
  collection: 'pages',
  id: '123',
  draft: true, // Returns draft if available
})
```

## Field Type Guards

```typescript
import {
  fieldAffectsData,
  fieldHasSubFields,
  fieldIsArrayType,
  fieldIsBlockType,
  fieldSupportsMany,
  fieldHasMaxDepth,
} from 'payload'

function processField(field: Field) {
  // Check if field stores data
  if (fieldAffectsData(field)) {
    console.log(field.name) // Safe to access
  }

  // Check if field has nested fields
  if (fieldHasSubFields(field)) {
    field.fields.forEach(processField) // Safe to access
  }

  // Check field type
  if (fieldIsArrayType(field)) {
    console.log(field.minRows, field.maxRows)
  }

  // Check capabilities
  if (fieldSupportsMany(field) && field.hasMany) {
    console.log('Multiple values supported')
  }
}
```

## Plugins

### Using Plugins

```typescript
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'

export default buildConfig({
  plugins: [
    seoPlugin({
      collections: ['posts', 'pages'],
    }),
    redirectsPlugin({
      collections: ['pages'],
    }),
  ],
})
```

### Creating Plugins

```typescript
import type { Config, Plugin } from 'payload'

interface MyPluginConfig {
  collections?: string[]
  enabled?: boolean
}

export const myPlugin =
  (options: MyPluginConfig): Plugin =>
  (config: Config): Config => ({
    ...config,
    collections: config.collections?.map((collection) => {
      if (options.collections?.includes(collection.slug)) {
        return {
          ...collection,
          fields: [...collection.fields, { name: 'pluginField', type: 'text' }],
        }
      }
      return collection
    }),
  })
```

## Best Practices

### Security

1. Always set `overrideAccess: false` when passing `user` to Local API
2. Field-level access only returns boolean (no query constraints)
3. Default to restrictive access, gradually add permissions
4. Never trust client-provided data
5. Use `saveToJWT: true` for roles to avoid database lookups

### Performance

1. Index frequently queried fields
2. Use `select` to limit returned fields
3. Set `maxDepth` on relationships to prevent over-fetching
4. Use query constraints over async operations in access control
5. Cache expensive operations in `req.context`

### Data Integrity

1. Always pass `req` to nested operations in hooks
2. Use context flags to prevent infinite hook loops
3. Enable transactions for MongoDB (requires replica set) and Postgres
4. Use `beforeValidate` for data formatting
5. Use `beforeChange` for business logic

### Type Safety

1. Run `generate:types` after schema changes
2. Import types from generated `payload-types.ts`
3. Type your user object: `import type { User } from '@/payload-types'`
4. Use `as const` for field options
5. Use field type guards for runtime type checking

### Organization

1. Keep collections in separate files
2. Extract access control to `access/` directory
3. Extract hooks to `hooks/` directory
4. Use reusable field factories for common patterns
5. Document complex access control with comments

## Common Gotchas

1. **Local API Default**: Access control bypassed unless `overrideAccess: false`
2. **Transaction Safety**: Missing `req` in nested operations breaks atomicity
3. **Hook Loops**: Operations in hooks can trigger the same hooks
4. **Field Access**: Cannot use query constraints, only boolean
5. **Relationship Depth**: Default depth is 2, set to 0 for IDs only
6. **Draft Status**: `_status` field auto-injected when drafts enabled
7. **Type Generation**: Types not updated until `generate:types` runs
8. **MongoDB Transactions**: Require replica set configuration
9. **SQLite Transactions**: Disabled by default, enable with `transactionOptions: {}`
10. **Point Fields**: Not supported in SQLite

## Additional Context Files

For deeper exploration of specific topics, refer to the context files located in `.cursor/rules/`:

### Available Context Files

1. **`payload-overview.md`** - High-level architecture and core concepts

   - Payload structure and initialization
   - Configuration fundamentals
   - Database adapters overview

2. **`security-critical.md`** - Critical security patterns (⚠️ IMPORTANT)

   - Local API access control
   - Transaction safety in hooks
   - Preventing infinite hook loops

3. **`collections.md`** - Collection configurations

   - Basic collection patterns
   - Auth collections with RBAC
   - Upload collections
   - Drafts and versioning
   - Globals

4. **`fields.md`** - Field types and patterns

   - All field types with examples
   - Conditional fields
   - Virtual fields
   - Field validation
   - Common field patterns

5. **`field-type-guards.md`** - TypeScript field type utilities

   - Field type checking utilities
   - Safe type narrowing
   - Runtime field validation

6. **`access-control.md`** - Permission patterns

   - Collection-level access
   - Field-level access
   - Row-level security
   - RBAC patterns
   - Multi-tenant access control

7. **`access-control-advanced.md`** - Complex access patterns

   - Nested document access
   - Cross-collection permissions
   - Dynamic role hierarchies
   - Performance optimization

8. **`hooks.md`** - Lifecycle hooks

   - Collection hooks
   - Field hooks
   - Hook context patterns
   - Common hook recipes

9. **`queries.md`** - Database operations

   - Local API usage
   - Query operators
   - Complex queries with AND/OR
   - Performance optimization

10. **`endpoints.md`** - Custom API endpoints

    - REST endpoint patterns
    - Authentication in endpoints
    - Error handling
    - Route parameters

11. **`adapters.md`** - Database and storage adapters

    - MongoDB, PostgreSQL, SQLite patterns
    - Storage adapter usage (S3, Azure, GCS, etc.)
    - Custom adapter development

12. **`plugin-development.md`** - Creating plugins

    - Plugin architecture
    - Modifying configuration
    - Plugin hooks
    - Best practices

13. **`components.md`** - Custom Components

    - Component types (Root, Collection, Global, Field)
    - Server vs Client Components
    - Component paths and definition
    - Default and custom props
    - Using hooks
    - Performance best practices
    - Styling components

## 🗄️ בטיחות דאטאבייס - קריטי!

### ההבדל בין פיתוח ל-Production:

| פיתוח (Development) | Production |
|---------------------|------------|
| אפשר למחוק דאטא | **אסור למחוק דאטא** |
| אפשר DROP TABLE | **אסור DROP TABLE** |
| אפשר לאפס הכל | **הדאטא הוא אמיתי** |
| push: true בסדר | **push: true מסוכן** |

### קבצים שרצים בכל הפעלה של השרת:
```
start.sh          ← רץ בכל container restart
init-db.cjs       ← רץ מתוך start.sh
init-db.sql       ← נקרא מתוך init-db.cjs
```

**כלל ברזל:** קבצים אלה **לעולם לא** יכילו:
- `DROP TABLE`
- `DELETE FROM`
- `TRUNCATE`
- כל פקודה שמוחקת דאטא

### מה מותר בקבצי אתחול:
```sql
-- ✅ מותר - בטוח להריץ כמה פעמים שרוצים
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS ... ;  -- IF NOT EXISTS = בטוח
```

### מה אסור בקבצי אתחול:
```sql
-- ❌ אסור - מוחק דאטא בכל restart!
DROP TABLE IF EXISTS "users" CASCADE;
DELETE FROM users;
TRUNCATE users;
```

### לפני שינוי בקבצי DB:
1. **שאל את עצמך:** "מה יקרה אם זה ירוץ 100 פעמים?"
2. אם התשובה "הדאטא יימחק" → **אל תעשה את זה**
3. אם התשובה "כלום, זה idempotent" → בטוח

### Migrations נכונות:
```
src/migrations/
├── 001_initial.sql      ← CREATE TABLE IF NOT EXISTS
├── 002_add_field.sql    ← ALTER TABLE ADD COLUMN IF NOT EXISTS
└── ...
```

**Migrations רצות פעם אחת** - Payload עוקב אחרי מה כבר רץ.
**קבצי init רצים בכל פעם** - חייבים להיות בטוחים לריצה חוזרת.

---

## 🔄 push: true vs Migrations

### push: true (ב-payload.config.ts):
```typescript
db: postgresAdapter({
  pool: { connectionString: ... },
  push: true,  // ← מסוכן ב-production!
})
```

**מה זה עושה:** משנה את הסכמה אוטומטית בכל הפעלה
**הבעיה:** יכול למחוק עמודות/דאטא אם הסכמה השתנתה
**מתי להשתמש:** רק בפיתוח מקומי

### Migrations (הדרך הנכונה ל-production):
```typescript
db: postgresAdapter({
  pool: { connectionString: ... },
  // בלי push: true
})
```

**מה זה עושה:** שינויי סכמה רק דרך קבצי migration מבוקרים
**יתרון:** שליטה מלאה, אין מחיקות אוטומטיות
**מתי להשתמש:** תמיד ב-production

---

## 🚨 אם מצאת DROP TABLE בקוד

### צעדים מיידיים:
1. **הסר את הפקודה** מהקובץ
2. בדוק אם יש עוד פקודות מחיקה
3. החלף ב-`CREATE ... IF NOT EXISTS`
4. בדוק את start.sh - מה עוד רץ שם?
5. commit עם הודעה ברורה: `fix: remove dangerous DROP TABLE from init`

### דוגמה לתיקון:
```sql
-- ❌ לפני (מסוכן):
DROP TABLE IF EXISTS "users" CASCADE;
CREATE TABLE "users" (...);

-- ✅ אחרי (בטוח):
CREATE TABLE IF NOT EXISTS "users" (...);
```

---

## 📋 צ'קליסט לשינויי דאטאבייס

לפני כל שינוי בקבצים: `init-db.*`, `start.sh`, `migrations/*`

- [ ] האם יש DROP TABLE? → הסר
- [ ] האם יש DELETE FROM? → הסר
- [ ] האם יש TRUNCATE? → הסר
- [ ] האם כל CREATE הוא IF NOT EXISTS?
- [ ] האם זה בטוח לרוץ 100 פעמים?
- [ ] האם בדקתי ב-git diff מה השתנה?

---

**זכור: בproduction, הדאטא שייך ללקוחות. מחיקה = אובדן אמון.**

---

## 🏗️ ארכיטקטורת אתר מורכב

### שכבות המערכת:
```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────┤
│  Public Pages  │  Protected Pages  │  Admin Dashboard   │
│  (כולם)        │  (משתמשים רשומים) │  (אדמינים בלבד)    │
├─────────────────────────────────────────────────────────┤
│                    API Layer                             │
│  REST API  │  GraphQL  │  Server Actions                │
├─────────────────────────────────────────────────────────┤
│                  Payload CMS                             │
│  Collections  │  Globals  │  Access Control             │
├─────────────────────────────────────────────────────────┤
│                  PostgreSQL                              │
└─────────────────────────────────────────────────────────┘
```

### מבנה תיקיות מורחב:
```
src/
├── app/
│   ├── (frontend)/
│   │   ├── (public)/           # דפים ציבוריים
│   │   │   ├── page.tsx        # דף הבית
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   ├── (auth)/             # דפי התחברות
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (protected)/        # דפים למשתמשים מחוברים
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── my-courses/
│   │   ├── (admin)/            # אזור אדמין מותאם
│   │   │   ├── layout.tsx      # עם בדיקת הרשאות
│   │   │   ├── page.tsx        # Dashboard
│   │   │   ├── users/
│   │   │   ├── content/
│   │   │   └── analytics/
│   │   └── layout.tsx          # Layout ראשי
│   ├── (payload)/              # 🚫 Payload Admin - לא לגעת
│   └── api/
│       ├── auth/               # Authentication endpoints
│       ├── upload/             # העלאת קבצים
│       └── webhooks/           # Webhooks חיצוניים
├── collections/
│   ├── Users.ts                # משתמשים עם roles
│   ├── Media.ts                # מדיה מורחב
│   ├── Pages.ts
│   ├── Posts.ts
│   ├── Services.ts
│   ├── Courses.ts
│   ├── Contacts.ts
│   └── Settings.ts             # הגדרות גלובליות
├── globals/
│   ├── SiteSettings.ts         # הגדרות אתר
│   ├── Navigation.ts           # תפריטים
│   └── Footer.ts               # פוטר
├── components/
│   ├── layout/
│   ├── ui/
│   ├── forms/
│   ├── sections/
│   └── providers/              # Context providers
├── hooks/                      # Custom React hooks
├── lib/
│   ├── auth.ts                 # פונקציות auth
│   ├── utils.ts
│   └── constants.ts
├── contexts/                   # React contexts
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── i18n/                       # תרגומים
│   ├── he.json
│   ├── en.json
│   └── config.ts
└── styles/
    └── globals.css
```

---

## 👤 ניהול משתמשים ו-Roles

### Users Collection מורחב:
```typescript
// src/collections/Users.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 שעות
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 דקות
    useAPIKey: true,
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'role', 'createdAt'],
  },
  access: {
    // כולם יכולים ליצור חשבון
    create: () => true,
    // קריאה: עצמי או אדמין
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // עדכון: עצמי או אדמין
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // מחיקה: אדמין בלבד
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        { label: 'משתמש', value: 'user' },
        { label: 'עורך', value: 'editor' },
        { label: 'מנהל', value: 'admin' },
      ],
      access: {
        // רק אדמין יכול לשנות role
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'preferences',
      type: 'group',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'he',
          options: [
            { label: 'עברית', value: 'he' },
            { label: 'English', value: 'en' },
          ],
        },
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'system',
          options: [
            { label: 'מערכת', value: 'system' },
            { label: 'בהיר', value: 'light' },
            { label: 'כהה', value: 'dark' },
          ],
        },
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
```

### בדיקת הרשאות בדפים:
```typescript
// src/app/(frontend)/(protected)/layout.tsx
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers, cookies } from 'next/headers'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config })

  try {
    const { user } = await payload.auth({ headers: await headers(), cookies: await cookies() })

    if (!user) {
      redirect('/login?redirect=' + encodeURIComponent(/* current path */))
    }

    return <>{children}</>
  } catch {
    redirect('/login')
  }
}

// src/app/(frontend)/(admin)/layout.tsx
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config })

  try {
    const { user } = await payload.auth({ headers: await headers(), cookies: await cookies() })

    if (!user) {
      redirect('/login')
    }

    if (user.role !== 'admin') {
      redirect('/dashboard') // לא מורשה
    }

    return <>{children}</>
  } catch {
    redirect('/login')
  }
}
```

---

## 🌍 רב-לשוניות (i18n) - עברית/אנגלית

### קבצי תרגום:
```json
// src/i18n/he.json
{
  "common": {
    "home": "בית",
    "about": "אודות",
    "services": "שירותים",
    "contact": "צור קשר",
    "login": "התחברות",
    "logout": "התנתקות",
    "register": "הרשמה",
    "submit": "שלח",
    "cancel": "ביטול",
    "save": "שמור",
    "delete": "מחק",
    "edit": "ערוך",
    "loading": "טוען...",
    "error": "שגיאה",
    "success": "הצלחה"
  },
  "auth": {
    "email": "אימייל",
    "password": "סיסמה",
    "confirmPassword": "אשר סיסמה",
    "forgotPassword": "שכחת סיסמה?",
    "rememberMe": "זכור אותי",
    "noAccount": "אין לך חשבון?",
    "hasAccount": "יש לך חשבון?",
    "loginTitle": "התחברות לחשבון",
    "registerTitle": "יצירת חשבון חדש"
  },
  "errors": {
    "required": "שדה חובה",
    "invalidEmail": "אימייל לא תקין",
    "passwordMismatch": "הסיסמאות לא תואמות",
    "loginFailed": "התחברות נכשלה",
    "serverError": "שגיאת שרת, נסה שוב"
  }
}

// src/i18n/en.json
{
  "common": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "contact": "Contact",
    "login": "Login",
    "logout": "Logout",
    "register": "Register",
    "submit": "Submit",
    "cancel": "Cancel",
    "save": "Save",
    "delete": "Delete",
    "edit": "Edit",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  },
  "auth": {
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "forgotPassword": "Forgot password?",
    "rememberMe": "Remember me",
    "noAccount": "Don't have an account?",
    "hasAccount": "Already have an account?",
    "loginTitle": "Login to your account",
    "registerTitle": "Create new account"
  },
  "errors": {
    "required": "Required field",
    "invalidEmail": "Invalid email",
    "passwordMismatch": "Passwords don't match",
    "loginFailed": "Login failed",
    "serverError": "Server error, try again"
  }
}
```

### Language Context:
```typescript
// src/contexts/LanguageContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import he from '@/i18n/he.json'
import en from '@/i18n/en.json'

type Language = 'he' | 'en'
type Translations = typeof he

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: 'rtl' | 'ltr'
}

const translations: Record<Language, Translations> = { he, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('he')

  useEffect(() => {
    // טען מ-localStorage או מהעדפות משתמש
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'he' || saved === 'en')) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    // שמור ועדכן את כיוון הדף
    localStorage.setItem('language', language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr'
  }, [language])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dir: language === 'he' ? 'rtl' : 'ltr'
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
```

### כפתור החלפת שפה:
```typescript
// src/components/ui/LanguageSwitch.tsx
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
      aria-label="Switch language"
    >
      {language === 'he' ? 'EN' : 'עב'}
    </button>
  )
}
```

### שימוש בתרגומים:
```typescript
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export function LoginForm() {
  const { t, dir } = useLanguage()

  return (
    <form dir={dir}>
      <h1>{t('auth.loginTitle')}</h1>
      <input placeholder={t('auth.email')} />
      <input placeholder={t('auth.password')} type="password" />
      <button type="submit">{t('common.login')}</button>
    </form>
  )
}
```

---

## 🌓 Dark Mode / Light Mode

### Theme Context:
```typescript
// src/contexts/ThemeContext.tsx
'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)

    const updateTheme = () => {
      let resolved: 'light' | 'dark'

      if (theme === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      } else {
        resolved = theme
      }

      setResolvedTheme(resolved)
      document.documentElement.classList.remove('light', 'dark')
      document.documentElement.classList.add(resolved)
    }

    updateTheme()

    // האזן לשינויים בהעדפות מערכת
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateTheme)

    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

### כפתור החלפת תמה:
```typescript
// src/components/ui/ThemeSwitch.tsx
'use client'
import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  const options = [
    { value: 'light', icon: Sun, label: 'בהיר' },
    { value: 'dark', icon: Moon, label: 'כהה' },
    { value: 'system', icon: Monitor, label: 'מערכת' },
  ] as const

  return (
    <div className="flex gap-1 p-1 rounded-full bg-white/10">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded-full transition ${
            theme === value
              ? 'bg-white/20 text-white'
              : 'text-white/60 hover:text-white'
          }`}
          aria-label={label}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  )
}
```

### Tailwind config לתמיכה ב-dark mode:
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // שימוש ב-class ולא media
  theme: {
    extend: {
      colors: {
        // צבעים מותאמים לשני המצבים
        background: {
          light: '#ffffff',
          dark: '#0F0F23',
        },
        foreground: {
          light: '#1a1a2e',
          dark: '#ffffff',
        },
      },
    },
  },
}
```

### שימוש ב-CSS:
```css
/* globals.css */
:root {
  --background: #ffffff;
  --foreground: #1a1a2e;
  --primary: #8B5CF6;
  --secondary: #EC4899;
}

.dark {
  --background: #0F0F23;
  --foreground: #ffffff;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}
```

### Tailwind classes לתמיכה בשני המצבים:
```tsx
// ✅ נכון - מגדיר לשני המצבים
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// ✅ נכון - שימוש במשתנים
<div className="bg-[var(--background)] text-[var(--foreground)]">
```

---

## 🖼️ ניהול מדיה מתקדם

### Media Collection מורחב:
```typescript
// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
      },
      {
        name: 'card',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*', 'application/pdf', 'video/*'],
    // הגבלת גודל
    filesizeLimit: 10 * 1024 * 1024, // 10MB
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'תמונות', value: 'images' },
        { label: 'מסמכים', value: 'documents' },
        { label: 'וידאו', value: 'videos' },
        { label: 'אחר', value: 'other' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text' },
      ],
    },
  ],
}
```

### Component לתצוגת תמונות:
```typescript
// src/components/ui/PayloadImage.tsx
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface PayloadImageProps {
  media: Media | string | null | undefined
  size?: 'thumbnail' | 'card' | 'hero' | 'full'
  className?: string
  priority?: boolean
}

export function PayloadImage({
  media,
  size = 'card',
  className = '',
  priority = false
}: PayloadImageProps) {
  if (!media || typeof media === 'string') {
    return <div className={`bg-gray-200 dark:bg-gray-800 ${className}`} />
  }

  const imageSize = media.sizes?.[size]
  const src = imageSize?.url || media.url
  const width = imageSize?.width || media.width || 800
  const height = imageSize?.height || media.height || 600

  if (!src) return null

  return (
    <Image
      src={src}
      alt={media.alt || ''}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
```

---

## 📱 Responsive Design

### Breakpoints סטנדרטיים:
```tsx
// Tailwind breakpoints:
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// דוגמה לשימוש:
<div className="
  grid
  grid-cols-1      // מובייל: עמודה אחת
  sm:grid-cols-2   // טאבלט קטן: 2 עמודות
  lg:grid-cols-3   // דסקטופ: 3 עמודות
  xl:grid-cols-4   // מסך גדול: 4 עמודות
  gap-4
  md:gap-6
  lg:gap-8
">

// ניווט responsive:
<nav className="
  fixed bottom-0 left-0 right-0  // מובייל: למטה
  md:static md:top-0             // דסקטופ: למעלה
">
```

### Mobile-first approach:
```tsx
// ✅ נכון - מתחילים ממובייל
<div className="text-sm md:text-base lg:text-lg">

// ❌ לא מומלץ - מתחילים מדסקטופ
<div className="text-lg md:text-base sm:text-sm">
```

---

## 🔔 התראות ו-Toasts

### Toast Context:
```typescript
// src/contexts/ToastContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])

    // הסר אוטומטית אחרי 5 שניות
    setTimeout(() => removeToast(id), 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' :
            toast.type === 'error' ? 'bg-red-500' :
            toast.type === 'warning' ? 'bg-yellow-500' :
            'bg-blue-500'
          } text-white`}
        >
          <div className="flex justify-between items-center">
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
```

### שימוש:
```typescript
'use client'
import { useToast } from '@/contexts/ToastContext'

export function ContactForm() {
  const { addToast } = useToast()

  const handleSubmit = async (data) => {
    try {
      await submitForm(data)
      addToast('הטופס נשלח בהצלחה!', 'success')
    } catch (error) {
      addToast('שגיאה בשליחת הטופס', 'error')
    }
  }
}
```

---

## 🔐 אבטחה

### כללי אבטחה:
```typescript
// 1. לעולם לא לחשוף סודות בצד לקוח
// ❌ שגיאה
const apiKey = process.env.SECRET_API_KEY // זמין גם בclient!

// ✅ נכון - רק בצד שרת
const apiKey = process.env.SECRET_API_KEY // רק בserver components/API

// 2. וולידציה בצד שרת - תמיד!
// ❌ לא מספיק
const isValid = formData.email.includes('@') // רק client

// ✅ נכון - וולידציה בשרת
// בAPI route או Server Action
import { z } from 'zod'
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// 3. Sanitize input
// השתמש בספריות כמו DOMPurify לתוכן HTML

// 4. CSRF Protection - Payload מטפל בזה אוטומטית

// 5. Rate Limiting - הוסף לAPI routes רגישים
```

### Access Control Patterns:
```typescript
// src/access/index.ts
import type { Access } from 'payload'

// כולם
export const anyone: Access = () => true

// רק מחוברים
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

// רק אדמינים
export const admins: Access = ({ req: { user } }) => user?.role === 'admin'

// אדמינים או עורכים
export const adminsOrEditors: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor'

// עצמי או אדמין
export const selfOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}

// יוצר התוכן או אדמין
export const ownerOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { createdBy: { equals: user.id } }
}
```

---

## ⚙️ Globals להגדרות אתר

### Site Settings Global:
```typescript
// src/globals/SiteSettings.ts
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'whatsapp', type: 'text' },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'defaultTitle', type: 'text', localized: true },
        { name: 'titleSuffix', type: 'text' },
        { name: 'defaultDescription', type: 'textarea', localized: true },
        { name: 'defaultImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
```

### Navigation Global:
```typescript
// src/globals/Navigation.ts
import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footerMenu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
  ],
}
```

---

## 🧩 Providers Setup

### שילוב כל ה-Providers:
```typescript
// src/components/providers/Providers.tsx
'use client'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
```

### שימוש ב-Layout:
```typescript
// src/app/(frontend)/layout.tsx
import { Providers } from '@/components/providers/Providers'
import { Heebo } from 'next/font/google'
import '@/styles/globals.css'

const heebo = Heebo({ subsets: ['hebrew', 'latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className={heebo.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

---

## ✅ צ'קליסט לפני פרודקשן

### פונקציונליות:
- [ ] כל הדפים עובדים
- [ ] התחברות/הרשמה עובדים
- [ ] שחזור סיסמה עובד
- [ ] הרשאות משתמשים תקינות
- [ ] טפסים שולחים בהצלחה
- [ ] החלפת שפה עובדת
- [ ] Dark/Light mode עובד
- [ ] תמונות נטענות

### אבטחה:
- [ ] אין סודות בצד לקוח
- [ ] Access control מוגדר נכון
- [ ] וולידציה בצד שרת
- [ ] HTTPS מופעל

### ביצועים:
- [ ] תמונות אופטימיזציה (next/image)
- [ ] Lazy loading לתוכן כבד
- [ ] אין console.log בפרודקשן

### SEO:
- [ ] Meta tags בכל דף
- [ ] Alt text לכל תמונה
- [ ] sitemap.xml
- [ ] robots.txt

### נגישות:
- [ ] ניווט במקלדת
- [ ] Aria labels
- [ ] קונטרסט צבעים

---

**זכור: אתר מורכב = יותר נקודות כשל. בדוק הכל לפני deploy!**

## Resources

- Docs: https://payloadcms.com/docs
- LLM Context: https://payloadcms.com/llms-full.txt
- GitHub: https://github.com/payloadcms/payload
- Examples: https://github.com/payloadcms/payload/tree/main/examples
- Templates: https://github.com/payloadcms/payload/tree/main/templates
