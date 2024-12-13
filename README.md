[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FStatelyCloud%2Fvercel-starter-template-auth&env=STATELY_STORE_ID,STATELY_ACCESS_KEY,NEXTAUTH_URL,AUTH_SECRET,AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET&envDescription=API%20keys%20and%20Store%20configuration.&envLink=https%3A%2F%2Fdocs.stately.cloud%2Fguides%2Fconnect%2F&skippable-integrations=1)

# Vercel Starter Template with Auth

This is a sample NextJS webapp that uses StatelyDB.

*NOTE:* You MUST set up your StatelyDB store and schema following the instructions below before deploying to Vercel!

## Features

- Uses a [sample schema](./schema/schema.ts) that defines the `Golink` Item type, and [related generated typescript types](./src/lib/generated).
- Create and manage go-links (short string to URL associations)
- Redirect to the associated URL when visiting a go-link path
- Display a list of all go-links, ordered by most recently created
- Uses Google OAuth to authenticate users. Each `GoLink` Item in the StatelyDB store belongs to a user.

## Prerequisites

- Node.js 14.x or later
- Vercel account
- Stately Cloud account and access to a StatelyDB Store

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Follow the instructions below under _StatelyDB Schema Setup_ to configure your StatelyDB Store and associated schema.
4. This project uses [NextAuth.js](https://next-auth.js.org/) for authentication. You will need to [configure Google OAuth credentials](https://next-auth.js.org/providers/google).
5. You will need to generate a secret value for the [`AUTH_SECRET`](https://next-auth.js.org/configuration/options#nextauth_secret) value:
   ```
   npx auth secret
   ```
6. For local development, create a `.env.local` file in the root directory with the following content:
   ```
   STATELY_ACCESS_KEY=your_access_key
   STATELY_STORE_ID=12345
   NEXTAUTH_URL=your_base_url
   AUTH_GOOGLE_ID=your_google_oauth_id
   AUTH_GOOGLE_SECRET=your_google_oauth_secret
   AUTH_SECRET=your_auth_secret
   ```
   Replace `your_access_key` and `12345` with your actual StatelyDB credentials and store ID.  Replace `your_base_url` with the base url of your app (e.g. `http://localhost:3000` or `https://myapp.vercel.app`).
   
   See `.env.local.example` for more details on the other configuration options.

## StatelyDB Schema Setup

1. Install the Stately CLI:
   ```
   curl -sL https://stately.cloud/install | sh
   ```
2. Log in to your Stately account:
   ```
   stately login
   ```
3. Navigate to the `schema` directory:
   ```
   cd schema
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Publish the schema:
   ```
   stately schema put --schema-id <your_schema_id> schema.ts
   ```
6. Bind the schema to your store:
   ```
   stately schema bind --schema-id <your_schema_id> --store-id 12345
   ```
7. Generate the TypeScript client:
   ```
   stately schema generate --language ts --schema-id <your_schema_id> --version <schema_version> ../src/lib/generated
   ```

## Development

Run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Vercel

1. Install the Vercel CLI:
   ```
   npm i -g vercel
   ```
2. Log in to your Vercel account:
   ```
   vercel login
   ```
3. Deploy the application:
   ```
   vercel
   ```
4. Follow the prompts to configure your project
5. Set up environment variables in the Vercel dashboard

Your application is now deployed and ready to use!
