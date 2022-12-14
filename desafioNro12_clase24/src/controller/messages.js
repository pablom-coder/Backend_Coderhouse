import { MessagesModel } from "../models/messages.js";
import { normalize, denormalize, schema } from "normalizr";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mensajes = path.join(__dirname, '../data/mensajes.json');
const mensajesNormalizados = path.join(__dirname, '../data/mensajesNormalizados.json');
const mensajesDenormalizados = path.join(__dirname, '../data/mensajesDenormalizados.json');

const autores = new schema.Entity("author", {}, { idAttribute: "id" });

const msg = new schema.Entity("messages", {author: autores}
);

const msgsSchema = new schema.Array({
  author: autores,
  text: [msg]
})

export const AllMessages = async (req, res) => {
  try {
      const mjes = fs.readFileSync(mensajes, 'utf-8');
      const allMje = JSON.parse(mjes);
      return res.status(200).json({
        data: allMje,
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const NormalizedMessages = async (req, res) => {
  try {
    const mjes = fs.readFileSync(mensajes, 'utf-8');
    const messagesOriginal = JSON.parse(mjes);
    const dataNormalizada = normalize(messagesOriginal, msgsSchema);
    fs.writeFileSync(mensajesNormalizados, JSON.stringify(dataNormalizada, null, '\t'))

    return res.status(200).json({
      data: dataNormalizada,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const DenormalizedMessages = async (req, res) => {
  try {
    const mjes = fs.readFileSync(mensajes, 'utf-8');
      const messagesOriginalData = JSON.parse(mjes);

    let normalizedMessages = normalize(messagesOriginalData, msgsSchema);

    const denormalizedData = denormalize(
      normalizedMessages.result,
      msgsSchema,
      normalizedMessages.entities
    );

    fs.writeFileSync(mensajesDenormalizados, JSON.stringify(denormalizedData, null, '\t'));

    return res.status(200).json({
      data: denormalizedData,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
