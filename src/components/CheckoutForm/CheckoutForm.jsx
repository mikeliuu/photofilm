import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import PaymentSection from '../PaymentSection/PaymentSection';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    //{CLIENT_SECRET} should be ${id}_secret_${secret}
    //https://stripe.com/docs/api/payment_intents/object#payment_intent_object-client_secret
    const tempClientSecret = 'pi_1EUn5sJnRDDqOaR75NylFAz3_secret_0EGmBneWy2Gae67xurZrTvl74';
    const result = await stripe.confirmCardPayment(
      `${tempClientSecret}`,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        }
      }
    );

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log("result.paymentIntent.status === 'succeeded'", result);
        
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={ handleSubmit } className="checkoutForm">

      <PaymentSection />

      <button className="checkoutBtn" disabled={ !stripe }>Pay</button>

    </form>
  );
}

export default CheckoutForm;