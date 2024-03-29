# Astro-API
A small API &amp; React app implementation based on the Astroneer game, created for OUR JavaScript course.

## Run
- Clone the repository
- Create an `.env` file with `cp .env.example .env`
    - No need to change anything actually
- Run `npm i` in the root directory

### Backend
- For first build, you have to setup prisma
    - Install prisma with `npm i prisma --save-dev`
    - Run `npm run migrate` to create the database
    - Then, run `npm run seed` to insert some test data
- Working with the database
    - To update the schema, run `npm run migrate`
    - Optionally, run `npx prisma studio` to open the prisma studio
- **Run dev**: `npm run be`

### Frontend (TODO)
- Run dev: `npm run fe` in the root directory