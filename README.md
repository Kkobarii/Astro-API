# Astro-API

A small API &amp; React app implementation based on the Astroneer game, created for OUR JavaScript course.
And here is the specification of the project: [Astro-API](https://docs.google.com/document/d/1mbYYzY0j7Xq8KX8a2ei2_Ta1AQUWpfcpD0tORZt8AD4).

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


### TODO

**Back-end (NodeJS):**
- 5 Functional requirements
    - [x] At least 2 resources (2 tables connected to each other via key)
    - [x] All CRUD operations on one resource
    - [x] At least 2 operations on second resource
- 5 ORM Layer
    - [x] Connection to the DB via a ORM library 
    - [ ] Error handling
- 5 Express REST API layer 
    - [ ] Valid API up to the REST specification for all operations on resources
    - [ ] Status handling & error messages

**Front-end (React):**
- 5 Functional requirements
    - [ ] App Layout with Navigation (Routing)
    - [ ] Main page with information about the app
    - [ ] All CRUD operations on one resource (Create Form, Edit Form, List/Table, Delete, Detail View) 
- 5 Component structure
    - [ ] Split your application into several components. Don’t make huge ones. 
- 5 Client-side routing
    - [ ] There should be proper routes for all pages
    - [ ] Best practices according to react router 
- 5 Data fetching
    - [ ] Custom API functions
    - [ ] Proper loading states
    - [ ] Proper error handling / states 

**Overall:**
- 5 Code quality / project setup
    - [ ] README, Prettier, Able to run the whole project easily! 