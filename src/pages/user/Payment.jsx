import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomstore from '../../store/ecom'
import CheckoutForm from "../../components/CheckoutForm";
const stripePromise = loadStripe("pk_test_51SL4enCCEHtwkAeQrQG0iRQcTGCdjyiq5XtVz1iAWN4DlgenIx0tIUhCTr71WIZi3Ehp8d848wT0KAF7FoOAZT9A00On6UC30D");

const Payment = () => {
  const token = useEcomstore((state) => state.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res)
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const appearance = {
    theme: "stripe",
  };

  const loader = "auto";

  return (
    <div>
      {
        clientSecret && (
          <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
          >
            <CheckoutForm />
          </Elements>
        )
      }
    </div>
  )
}

export default Payment