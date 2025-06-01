const express = require('express');
const { PrismaClient } = require('@prisma/client');
const Joi = require('joi');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Esquema de validación para personajes
const characterSchema = Joi.object({
  name: Joi.string().min(2).required(),
  affiliation: Joi.string()
    .valid('PIRATE', 'MARINE', 'REVOLUTIONARY', 'CIVILIAN')
    .required(),
  arcIds: Joi.array().items(Joi.number().integer().positive()).optional(),
});

// Get all characters with their arcs using the CharacterArcs VIEW
app.get('/characters', async (req, res) => {
  try {
    const characterArcs = await prisma.characterArcs.findMany();
    const grouped = characterArcs.reduce((acc, row) => {
      if (!acc[row.character_id]) {
        acc[row.character_id] = {
          id: row.character_id,
          name: row.character_name,
          affiliation: row.character_affiliation,
          appearances: [],
        };
      }
      acc[row.character_id].appearances.push({
        id: row.arc_id,
        arc: {
          id: row.arc_id,
          name: row.arc_name,
          sea: row.arc_sea,
        },
      });
      return acc;
    }, {});
    res.json(Object.values(grouped));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new character with arcs
app.post('/characters', async (req, res) => {
  const { error, value } = characterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, affiliation, arcIds } = value;
  try {
    // Validar que los arcIds existan
    if (arcIds && arcIds.length > 0) {
      const arcs = await prisma.arc.findMany({ where: { id: { in: arcIds } } });
      if (arcs.length !== arcIds.length) {
        return res.status(400).json({ error: 'Uno o más arcIds no son válidos' });
      }
    }
    const character = await prisma.character.create({
      data: { name, affiliation },
    });
    if (arcIds && arcIds.length > 0) {
      for (const arcId of arcIds) {
        await prisma.appearance.create({
          data: { characterId: character.id, arcId },
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
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de personaje inválido' });
  }
  try {
    const character = await prisma.character.findUnique({
      where: { id },
      include: { appearances: { include: { arc: true } } },
    });
    if (character) {
      res.json(character);
    } else {
      res.status(404).json({ error: 'Personaje no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a character and their arcs
app.put('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de personaje inválido' });
  }
  const { error, value } = characterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, affiliation, arcIds } = value;
  try {
    // Validar que los arcIds existan
    if (arcIds && arcIds.length > 0) {
      const arcs = await prisma.arc.findMany({ where: { id: { in: arcIds } } });
      if (arcs.length !== arcIds.length) {
        return res.status(400).json({ error: 'Uno o más arcIds no son válidos' });
      }
    }
    await prisma.character.update({
      where: { id },
      data: { name, affiliation },
    });
    await prisma.appearance.deleteMany({ where: { characterId: id } });
    if (arcIds && arcIds.length > 0) {
      for (const arcId of arcIds) {
        await prisma.appearance.create({
          data: { characterId: id, arcId },
        });
      }
    }
    res.json({ message: 'Personaje actualizado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a character
app.delete('/characters/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID de personaje inválido' });
  }
  try {
    await prisma.character.delete({ where: { id } });
    res.json({ message: 'Personaje eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));