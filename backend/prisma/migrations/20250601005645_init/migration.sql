-- CreateEnum
CREATE TYPE "Affiliation" AS ENUM ('PIRATE', 'MARINE', 'REVOLUTIONARY', 'CIVILIAN');

-- CreateEnum
CREATE TYPE "Sea" AS ENUM ('EAST_BLUE', 'GRAND_LINE', 'NEW_WORLD');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "affiliation" "Affiliation" NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arc" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sea" "Sea" NOT NULL,

    CONSTRAINT "Arc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appearance" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "arcId" INTEGER NOT NULL,

    CONSTRAINT "Appearance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Arc_name_key" ON "Arc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Appearance_characterId_arcId_key" ON "Appearance"("characterId", "arcId");

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_arcId_fkey" FOREIGN KEY ("arcId") REFERENCES "Arc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

