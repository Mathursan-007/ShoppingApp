let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'lynxmass@gmail.com',
        pass: 'xxxxxxxxxx'
    }
});

module.exports={transporter}
