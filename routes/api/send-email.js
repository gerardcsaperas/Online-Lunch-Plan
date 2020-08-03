const express = require('express');
const router = express.Router();

// Import nodemailer in order to send e-mails from Node.js (free)
const nodemailer = require('nodemailer');

/*
@route  POST api/send-email
@desc.  Send an email to both the owner of the business
        and the customer once a new purchase is made.
*/
router.post('/', (req, res) => {
    const {
        data,
        comanda,
        begudes,
        totalPrice,
        nomReserva,
        email,
        tenda,
        municipi,
        address,
        tel,
        comentaris
    } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        tls: { rejectUnauthorized: false }
    });

    // Mail template for business
    const rogerMailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: 'Càtering Roser - Nova Comanda',
        html: `<p>Hola Roger!<br><br>Tens una nova comanda, amb un valor total de ${totalPrice} €.<br><br><b>Detalls d'entrega:</b><br>Dia: ${data}<br>Nom Reserva: ${nomReserva}<br>Tenda o Municipi: ${tenda +
			municipi}<br>Adreça: ${address}<br>Telèfon: ${tel}<br>Email: ${email}<br>Comentaris: ${comentaris}<br><br><b>Comanda:</b><br><b>Menús: </b>${comanda}<br><b>Begudes:</b> ${begudes}<br></br>A tope hostia!!!<br>Salut,<br>Gerard</p>`
    };

    // Mail template for customer
    const customerMailOptions = {
        from: process.env.GMAIL_USER,
        to: `${email}`,
        subject: 'Càtering Roser - Nova Comanda',
        html: `<p>Hola ${nomReserva},<br><br>Hem rebut la seva comanda correctament.<br><br><b>Detalls d'entrega:</b><br>Dia: ${data}<br>Nom Reserva: ${nomReserva}<br>Tenda o Municipi: ${tenda +
			municipi}<br>Adreça: ${address}<br>Telèfon: ${tel}<br>Email: ${email}<br>Comentaris: ${comentaris}<br><br><b>Comanda:</b><br><b>Menús: </b>${comanda}<br><b>Begudes:</b> ${begudes}<br><br>Que vagi de gust!<br><br>Salut,<br>Càtering Roser<br><br>Per a qualsevol dubte, es pot posar en contacte amb nosaltres mitjançant els telèfons que trobarà a www.cateringroser.cat</p>`
    };

    // Send email to business
    transporter.sendMail(rogerMailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });

    // Send email to customer
    transporter.sendMail(customerMailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
});

module.exports = router;