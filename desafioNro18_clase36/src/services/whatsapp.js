import twilio from 'twilio';
import config from '../config/index.js';

export const twilioClient = twilio(config.SID, config.TOKEN);