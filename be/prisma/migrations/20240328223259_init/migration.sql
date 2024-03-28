/*
  Warnings:

  - Added the required column `byteValue` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scrapValue` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficulty` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sun` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Planet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wind` to the `Planet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PlanetResource" (
    "planetId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,

    PRIMARY KEY ("planetId", "resourceId"),
    CONSTRAINT "PlanetResource_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanetResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "byteValue" INTEGER NOT NULL,
    "usedIn" TEXT,
    "iconUrl" TEXT,
    "imageUrl" TEXT
);

-- CreateTable
CREATE TABLE "PlanetGas" (
    "planetId" INTEGER NOT NULL,
    "gasId" INTEGER NOT NULL,
    "partsPerUnit" INTEGER NOT NULL,

    PRIMARY KEY ("planetId", "gasId"),
    CONSTRAINT "PlanetGas_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "Planet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlanetGas_gasId_fkey" FOREIGN KEY ("gasId") REFERENCES "Gas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "byteValue" INTEGER NOT NULL,
    "scrapValue" INTEGER NOT NULL,
    "smeltsInto" TEXT,
    "iconUrl" TEXT,
    "imageUrl" TEXT
);
INSERT INTO "new_Resource" ("id", "name") SELECT "id", "name" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE UNIQUE INDEX "Resource_name_key" ON "Resource"("name");
CREATE TABLE "new_Planet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "sun" TEXT NOT NULL,
    "wind" TEXT NOT NULL,
    "iconUrl" TEXT,
    "imageUrl" TEXT
);
INSERT INTO "new_Planet" ("id", "name") SELECT "id", "name" FROM "Planet";
DROP TABLE "Planet";
ALTER TABLE "new_Planet" RENAME TO "Planet";
CREATE UNIQUE INDEX "Planet_name_key" ON "Planet"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Gas_name_key" ON "Gas"("name");
