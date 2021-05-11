
validateMobile = (phoneNo,pin,total)=>{

    if(phoneNo instanceof Number && String(phoneNo).length==10){

        if (pin instanceof Number && String(pin).length==4){

            if(total instanceof Number && total>0){

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