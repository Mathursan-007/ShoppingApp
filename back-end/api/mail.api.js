let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({  //creating a transport service that includes the email service and the authentication credentials

    service:'gmail',
    auth: {            //due to privacy reasons the actual password is not mentioned here.
                          // to make this working there should be a valid gmail account credentials given and the less secure app service should be available for that account
        user: 'lynxmass@gmail.com',
        pass: 'password'

    }
});


module.exports={transporter}
