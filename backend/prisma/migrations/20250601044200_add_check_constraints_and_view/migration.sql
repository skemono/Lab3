-- Add CHECK constraint to Character table, if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'check_name_length'
        AND conrelid = '"Character"'::regclass
    ) THEN
        ALTER TABLE "Character"
        ADD CONSTRAINT check_name_length CHECK (LENGTH("name") >= 2);
    END IF;
END $$;

-- Add CHECK constraint to Arc table, if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'check_name_length'
        AND conrelid = '"Arc"'::regclass
    ) THEN
        ALTER TABLE "Arc"
        ADD CONSTRAINT check_name_length CHECK (LENGTH("name") >= 3);
    END IF;
END $$;

-- Ensure CharacterArcs is a VIEW, not a table
DROP TABLE IF EXISTS "CharacterArcs";
CREATE OR REPLACE VIEW "CharacterArcs" AS
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