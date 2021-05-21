validateMobile = (phoneNo,pin,total)=>{

    if(phoneNo instanceof Number && String(phoneNo).length==10){ //verifying whether the phone number is only a digit and its length is 10 characters

        if (pin instanceof Number && String(pin).length==4){ //verifying whether the pin is only a digit and its length is 4 characters

            if(total instanceof Number && total>0){ //verifying whether the total amount is a valid value

                return true;

            }else {

                return false;
            }

        }else {

            return false;

        }
    }else {

        return false;

    }

}



module.exports={validateMobile}