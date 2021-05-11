
function validateCard(name,cardNo,cvc,total){

    if(name instanceof String && name.length>5) {

        if (cardNo instanceof Number && String(cardNo).length == 16) {

            if(cvc instanceof Number && String(cvc).length==3){

                if(total instanceof Number && total>0){

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