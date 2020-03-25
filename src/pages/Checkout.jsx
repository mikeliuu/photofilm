import React, { useState } from "react";
import Layout from '../components/Layout/Layout';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.STRIPE_SECRET_KEY}`);

const Checkout = () => {

  return(
    <Layout 
      title={`Checkout - Photofilm`}
      keywords={`checkout, photo film, camera film, film, photofilm`}
      description={"Here is checkout page of photo film."}
    >

    <Elements stripe={ stripePromise }>
      <CheckoutForm />
    </Elements>
      
    </Layout>
  )
}

export default Checkout;
