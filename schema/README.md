# Stately Schema
This directory contains a sample schema for use in the Vercel starter template for StatelyDB. The schema itself is defined in [schema.ts].

## Prerequisites
- You've already setup a Stately account at [https://console.stately.cloud](https://console.stately.cloud)
- You have installed the `stately` CLI from [here](https://stately.cloud/downloads) and it's available on your `PATH`
- You have installed [nodejs and npm](https://nodejs.org/en/download/package-manager), or any other package manager of your choice
- You've run `npm install` in this directory to install the required dependencies

## Getting started
- Once you've completed the prerequisites above you can start editing your schema in the [schema.ts](./schema.ts) file
- Validate your schema with `stately schema validate schema.ts`
- Print your schema with `stately schema print schema.ts`
- Generate a client library in your desired language with `stately schema generate --language <ts|ruby|go> schema.ts <output-dir>`

## Applying your schema
- Login to Stately with `stately login`
- Apply the schema to your store with `stately schema put --store-id=<your-store-id> schema.ts`
  - You can get your StoreID from the [Stately Web Console](https://console.stately.cloud)

## Other useful commands
- `stately schema get --store-id=<your-store-id>` will print the current schema for the provided StoreID

## Need help?
- Email us at [support@stately.cloud](mailto:support@stately.cloud)