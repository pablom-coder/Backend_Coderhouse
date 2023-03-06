import dotenv from "dotenv";

dotenv.config();

export default {
  MONGO_ATLAS: process.env.MONGO_ATLAS || "mongodb://localhost/coderhouse",
  PUERTO: process.env.PUERTO || 8080,
  ADM_EMAIL: process.env.ADM_EMAIL,
  ADM_PHONE: process.env.ADM_PHONE,
  PHONE: process.env.PHONE,
  PASSWORD: process.env.PASSWORD,
  PORT_GMAIL: process.env.PORT_GMAIL,
  SID: process.env.SID,
  TOKEN: process.env.TOKEN,
};
