-- Insert Arcs
INSERT INTO "Arc" (name, sea) VALUES
('East Blue', 'EAST_BLUE'),
('Alabasta', 'GRAND_LINE'),
('Water 7', 'GRAND_LINE'),
('Enies Lobby', 'GRAND_LINE'),
('Thriller Bark', 'GRAND_LINE'),
('Sabaody Archipelago', 'GRAND_LINE'),
('Impel Down', 'GRAND_LINE'),
('Marineford', 'GRAND_LINE'),
('Fishman Island', 'NEW_WORLD'),
('Punk Hazard', 'NEW_WORLD');

-- Insert Characters
INSERT INTO "Character" (name, affiliation) VALUES
('Monkey D. Luffy', 'PIRATE'),
('Roronoa Zoro', 'PIRATE'),
('Nami', 'PIRATE'),
('Usopp', 'PIRATE'),
('Sanji', 'PIRATE'),
('Tony Tony Chopper', 'PIRATE'),
('Nico Robin', 'PIRATE'),
('Franky', 'PIRATE'),
('Brook', 'PIRATE'),
('Jinbe', 'PIRATE');

-- Insert Appearances
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Monkey D. Luffy' AND a.name = 'East Blue';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Monkey D. Luffy' AND a.name = 'Alabasta';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Monkey D. Luffy' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Monkey D. Luffy' AND a.name = 'Enies Lobby';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Roronoa Zoro' AND a.name = 'East Blue';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Roronoa Zoro' AND a.name = 'Alabasta';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Roronoa Zoro' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Nami' AND a.name = 'East Blue';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Nami' AND a.name = 'Alabasta';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Nami' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Usopp' AND a.name = 'East Blue';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Usopp' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Sanji' AND a.name = 'East Blue';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Sanji' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Tony Tony Chopper' AND a.name = 'Alabasta';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Tony Tony Chopper' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Nico Robin' AND a.name = 'Alabasta';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Nico Robin' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Franky' AND a.name = 'Water 7';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Franky' AND a.name = 'Enies Lobby';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Brook' AND a.name = 'Thriller Bark';
INSERT INTO "Appearance" (characterId, arcId)
SELECT c.id, a.id FROM "Character" c, "Arc" a WHERE c.name = 'Jinbe' AND a.name = 'Fishman Island';