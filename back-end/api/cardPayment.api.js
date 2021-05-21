
function validateCard(name,cardNo,cvc,total){

    if(name instanceof String && name.length>5) {  //verifying whether the card holder's name is a String value and its length is in a significant size(>5)

        if (cardNo instanceof Number && String(cardNo).length == 16) { //verifying whether the card number is only a digit and its length is equal to 16 characters.

            if(cvc instanceof Number && String(cvc).length==3){//verifying whether the cvc number is only a digit and its length is equal to 3 characters.

                if(total instanceof Number && total>0){//verifying whether the total amount is a valid value

                    return true;

                }else{

                    return false;
                }
            }else{

                return false;

            }

        }else{

            return false;

        }

    }else{


        return false;

    }

}

module.exports={validateCard}