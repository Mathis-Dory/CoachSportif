import React, {useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios';
import './PaypalForm.css';
import {isLoggedIn} from './auth.js';
import {Link} from "react-router-dom";
import { Button } from './Button';

const PaypalForm = () => {
    const [content, setContent] = useState(null)
    const url1 = "/api/isPremium";
    let idOfUser = localStorage.getItem('id');
     useEffect(() => {
             axios.get(url1)
                 .then(function (response) {
                     for (let i in response.data){
                         if (response.data[i].id_user == idOfUser){
                             if (response.data[i].premium == false){
                                 setContent(
                                 <>
                                     <h1>Toujours plus avec notre formule PREMIUM !</h1>
                                     <h3>Première semaine gratuite puis seulement 5,99 € par mois !</h3>
                                     <p>Accès à des conseils de nutritions</p>
                                     <p>Accès à des conseils de professionnels</p>
                                     <p>Un pseudo couleur or</p>
                                     <div className='container-paypal'>
                                         <PayPalButton
                                             options={{
                                                 vault: true,
                                                 clientId: "AX6812X_V-4Clzi08FkLsbPl10aZ86x-cxNXoAAIYKhoFj1KbaEfFsyDnv3USxRObzhP_vNeJX7Stz_s",
                                                 currency: "EUR"
                                             }}
                                             createSubscription={(data, actions) => {
                                                 return actions.subscription.create({
                                                     plan_id: 'P-6DW43585EH102802KMCFR64Y'
                                                 });
                                             }}
                                             onApprove={(data, actions) => {
                                                 return actions.subscription.get().then(function(details) {
                                                     return axios.post('/api/payment', {
                                                         user_id: idOfUser,
                                                         order_id: data.orderID,
                                                         subscription_id: data.subscriptionID
                                                     })
                                                         .then(function (){
                                                             document.location.href="/";
                                                             console.log(data);
                                                         })
                                                 });
                                             }}
                                         />
                                     </div>
                                 </>
                             )
                             }
                             else{
                                setContent(
                                    <>
                                        <h1>Toujours plus avec notre formule PREMIUM !</h1>
                                        <h3>Vous êtes déjà un membre PREMIUM !</h3>
                                        <a href="https://www.sandbox.paypal.com/myaccount/settings/payments">
                                            Annuler l'abonnement
                                        </a>
                                    </>
                                )
                             }
                         }
                     }
                 })
                 .catch(function (error) {
                     // handle error
                     console.log(error);
                 })
         }, [url1])

    if (isLoggedIn()) {
        return (
            <div className='container-premium'>
                    {content}
            </div>
        );
    }
    else{
        return (
            <div className="container-premium">
                <h1>Toujours plus avec notre formule PREMIUM !</h1>
                <h3>Première semaine gratuite puis seulement 5,99 € par mois !</h3>
                <p>Accès à des conseils de nutritions</p>
                <p>Accès à des conseils de professionnels</p>
                <p>Un pseudo couleur or</p>
                <h3>Connectez vous pour vous abonner !</h3>
                 <div className='hero-btns'>
                    <Button className='form-input-btn'>
                        <Link to="/login">Se connecter</Link>
                    </Button>
                </div>
            </div>
        );
    }
};

export default PaypalForm;