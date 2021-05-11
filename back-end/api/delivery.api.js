
const { updateQty } = require('../dal/items.dao');
const {transporter}=require('../mail')

let mailOptions = {
    from: 'lynxmass@gmail.com',
    to: '',
    subject: 'Delivery Confirmation',
    text: 'This mail is to ensure that your payment has been successfully made and your order will reach your doorsteps within 12 days.'
};


const validateDelivery=async(address,orders,buyer)=>{

    if(address instanceof String && address.length>15){

           for(let i in orders){
               let order=orders[i];
                await updateQty(order["_id"],order["availableqty"])
           }
           mailOptions.to=buyer.email;
           transporter.sendMail(mailOptions,(error,info)=>{
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