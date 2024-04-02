# Astro-API

A small API &amp; React app implementation based on the Astroneer game, created for OUR JavaScript course.
and here is the specification of the project: [Astro-API](https://docs.google.com/document/d/1mbYYzY0j7Xq8KX8a2ei2_Ta1AQUWpfcpD0tORZt8AD4)

## Run

- Clone the repository
- Create an `.env` file with `cp .env.example .env`
  - No need to change anything actually
- You can setup it by yourself or **just run `npm run setup`**

### Backend

- First, install dependencies with `npm i`

- For first build, you have to setup prisma
  - Install prisma with `npm i prisma --save-dev` (you don't have to you already have it)
  - Run `npm run migrate` to create the database
  - Then, run `npm run seed` to insert some test data
- Working with the database
  - To update the schema, run `npm run migrate`
  - Optionally, run `npx prisma studio` to open the prisma studio
- **Run dev**: `npm run be`

### Frontend (TODO)

- **Run dev**: `npm run fe` in the root directory
