import React from 'react';
import '../styles/mobilepayment.css'


class MobilePayment extends React.Component{



    render() {
        return(

            <div className="container">

                <h2>Payment Using Mobile Phone</h2>
                <hr className="hrStyles"/>
                    <br/>

                        <form action="#" method="post">

                            <label>Enter Phone Number</label><br/><br/>
                            <input type="number" name="number" placeholder="Enter Mobile Phone Number" required/><br/><br/><br/>

                                <label>Enter PIN</label><br/><br/>
                                <input type="number" name="number" placeholder="Enter the 4-digit pin" required/><br/><br/><br/>

                                    <label>Enter Pay Amount</label><br/><br/>
                                    <input type="number" name="amount" placeholder="Enter Amount To Pay" required/><br/><br/><br/>


                                        <input type="submit" value="Confirm Payment" id="submit"/>
                                            <input type="reset" value="Reset Form" id="reset"/>

                                                <br/><br/>
                        </form>

            </div>


        );
    }

}

export default MobilePayment;