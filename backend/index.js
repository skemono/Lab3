const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Get all characters with their arcs using Prisma's include
app.get('/characters', async (req, res) => {
  const characters = await prisma.character.findMany({
    include: {
      appearances: {
        include: {
          arc: true
        }
      }
    }
  });
  res.json(characters);
});

// Create a new character with arcs
app.post('/characters', async (req, res) => {
  const { name, affiliation, arcIds } = req.body;
  try {
    const character = await prisma.character.create({
      data: { name, affiliation }
    });
    if (arcIds && arcIds.length > 0) {
      for (const arcId of arcIds) {
        await prisma.appearance.create({
          data: { characterId: character.id, arcId }
        });
      }
    }
    res.status(201).json(character);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a character by ID with arcs
app.get('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const character = await prisma.character.findUnique({
    where: { id },
    include: { appearances: { include: { arc: true } } }
  });
  if (character) {
    res.json(character);
  } else {
    res.status(404).json({ error: 'Character not found' });
  }
});

// Update a character and their arcs
app.put('/characters/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, affiliation, arcIds } = req.body;
    try {
    await prisma.character.update({
        where: { id },
        data: { name, affiliation }
    });
    await prisma.appearance.deleteMany({ where: { characterId: id } });
    if (arcIds && arcIds.length > 0) {
        for (const arcId of arcIds) {
        await prisma.appearance.create({
            data: { characterId: id, arcId }
        });
        }
    }
    res.json({ message: 'Character updated' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

// Delete a character
app.delete('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.character.delete({ where: { id } });
    res.json({ message: 'Character deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));