const { updateQty } = require('../dal/items.dao');
const {transporter}=require('./mail.api')



let mailOptions = {
    from: 'lynxmass@gmail.com', //the mail which is registered inside the transporter object in mail.api.js file
    to: '',
    subject: 'Delivery Confirmation',
    text: 'This mail is to ensure that your payment has been successfully made and your order will reach your doorsteps within 12 days.'
};


const validateDelivery=async(address,orders,buyer)=>{

    if(address instanceof String && address.length>15){ //verifying that address is a String value and is significantly lengthy .

           for(let i in orders){
               let order=orders[i];
                await updateQty(order["_id"],order["availableqty"])//for each ordered items quantity will be updated based on its id
           }
           mailOptions.to=buyer.email; //here the 'to' value of the mailoptions object will be assigned as the email address of the buyer
           transporter.sendMail(mailOptions,(error,info)=>{  //sending the mail
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
           return true;

    } else {

        return false;

    }

}

module.exports={validateDelivery}