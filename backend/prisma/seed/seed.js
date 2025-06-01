const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Arcs
  const arcs = [
    { name: 'East Blue', sea: 'EAST_BLUE' },
    { name: 'Alabasta', sea: 'GRAND_LINE' },
    { name: 'Water 7', sea: 'GRAND_LINE' },
    { name: 'Enies Lobby', sea: 'GRAND_LINE' },
    { name: 'Thriller Bark', sea: 'GRAND_LINE' },
    { name: 'Sabaody Archipelago', sea: 'GRAND_LINE' },
    { name: 'Impel Down', sea: 'GRAND_LINE' },
    { name: 'Marineford', sea: 'GRAND_LINE' },
    { name: 'Fishman Island', sea: 'NEW_WORLD' },
    { name: 'Punk Hazard', sea: 'NEW_WORLD' },
  ];
  for (const arc of arcs) {
    await prisma.arc.create({ data: arc });
  }

  // Seed Characters
  const characters = [
    { name: 'Monkey D. Luffy', affiliation: 'PIRATE' },
    { name: 'Roronoa Zoro', affiliation: 'PIRATE' },
    { name: 'Nami', affiliation: 'PIRATE' },
    { name: 'Usopp', affiliation: 'PIRATE' },
    { name: 'Sanji', affiliation: 'PIRATE' },
    { name: 'Tony Tony Chopper', affiliation: 'PIRATE' },
    { name: 'Nico Robin', affiliation: 'PIRATE' },
    { name: 'Franky', affiliation: 'PIRATE' },
    { name: 'Brook', affiliation: 'PIRATE' },
    { name: 'Jinbe', affiliation: 'PIRATE' },
  ];
  for (const char of characters) {
    await prisma.character.create({ data: char });
  }

  // Seed Appearances
  const appearances = [
    { characterName: 'Monkey D. Luffy', arcName: 'East Blue' },
    { characterName: 'Monkey D. Luffy', arcName: 'Alabasta' },
    { characterName: 'Monkey D. Luffy', arcName: 'Water 7' },
    { characterName: 'Monkey D. Luffy', arcName: 'Enies Lobby' },
    { characterName: 'Roronoa Zoro', arcName: 'East Blue' },
    { characterName: 'Roronoa Zoro', arcName: 'Alabasta' },
    { characterName: 'Roronoa Zoro', arcName: 'Water 7' },
    { characterName: 'Nami', arcName: 'East Blue' },
    { characterName: 'Nami', arcName: 'Alabasta' },
    { characterName: 'Nami', arcName: 'Water 7' },
    { characterName: 'Usopp', arcName: 'East Blue' },
    { characterName: 'Usopp', arcName: 'Water 7' },
    { characterName: 'Sanji', arcName: 'East Blue' },
    { characterName: 'Sanji', arcName: 'Water 7' },
    { characterName: 'Tony Tony Chopper', arcName: 'Alabasta' },
    { characterName: 'Tony Tony Chopper', arcName: 'Water 7' },
    { characterName: 'Nico Robin', arcName: 'Alabasta' },
    { characterName: 'Nico Robin', arcName: 'Water 7' },
    { characterName: 'Franky', arcName: 'Water 7' },
    { characterName: 'Franky', arcName: 'Enies Lobby' },
    { characterName: 'Brook', arcName: 'Thriller Bark' },
    { characterName: 'Jinbe', arcName: 'Fishman Island' },
  ];
  for (const app of appearances) {
    const character = await prisma.character.findUnique({ where: { name: app.characterName } });
    const arc = await prisma.arc.findUnique({ where: { name: app.arcName } });
    if (character && arc) {
      await prisma.appearance.create({
        data: { characterId: character.id, arcId: arc.id }
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });