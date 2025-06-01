CREATE TYPE "Affiliation" AS ENUM ('PIRATE', 'MARINE', 'REVOLUTIONARY', 'CIVILIAN');
CREATE TYPE "Sea" AS ENUM ('EAST_BLUE', 'GRAND_LINE', 'NEW_WORLD');

CREATE TABLE "Character" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "affiliation" "Affiliation" NOT NULL,
  CONSTRAINT check_name_length CHECK (LENGTH("name") >= 2)
);

CREATE TABLE "Arc" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "sea" "Sea" NOT NULL,
  CONSTRAINT check_name_length CHECK (LENGTH("name") >= 3)
);

CREATE TABLE "Appearance" (
  "id" SERIAL PRIMARY KEY,
  "characterId" INTEGER NOT NULL,
  "arcId" INTEGER NOT NULL,
  FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE,
  FOREIGN KEY ("arcId") REFERENCES "Arc"("id"),
  CONSTRAINT "Appearance_characterId_arcId_key" UNIQUE ("characterId", "arcId")
);

CREATE VIEW "CharacterArcs" AS
SELECT 
    c.id AS character_id, 
    c.name AS character_name, 
    c.affiliation AS character_affiliation,
    a.id AS arc_id, 
    a.name AS arc_name,
    a.sea AS arc_sea
FROM "Character" c
JOIN "Appearance" ap ON c.id = ap."characterId"
JOIN "Arc" a ON ap."arcId" = a.id;