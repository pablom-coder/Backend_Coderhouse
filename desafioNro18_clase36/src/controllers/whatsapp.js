import { twilioClient } from "../services/whatsapp.js";
import config from "../config/index.js";
import { logger, loggerError } from '../helpers/logs.js'


export const sendWsp = async (phoneNumber) => {

  const twilioPhone = `whatsapp:${phoneNumber}`

  try {
    const message = {
      body: '¡Pedido recibido!',
      from: config.ADM_PHONE,
      to: twilioPhone,
    };

    await twilioClient.messages.create(message);
    logger.info('Wsp enviado!');

  } catch (error) {
    loggerError.error(error);
  }
};