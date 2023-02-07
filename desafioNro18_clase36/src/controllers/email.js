import { transporter } from "../services/email.js";
import Config from '../config/index.js';
import {logger, loggerError} from '../helpers/logs.js'

export const newUserGmail = async (email) => {

    const mailOptions = {
        from: Config.EMAIL,
        to: email,
        subject: '¡Nuevo registro!',
        text: 'Se registro un nuevo usuario en nuestra aplicacion.',
        html: '<h1>Se registro un nuevo usuario en nuestra aplicacion.</h1>'
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info('Email enviado!');
    } catch (error) {
        loggerError.error(error);
    }
};

export const buyCartGmail = async (user, body, email) => {

    const mailOptions = {
        from: Config.ADM_EMAIL,
        to: Config.ADM_EMAIL,
        subject: `Nuevo pedido de ${user} `,
        text: `
        Email: ${email}
        Pedido: ${body}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info('Gmail enviado!');
    } catch (error) {
        loggerError.error(error);
    }
};