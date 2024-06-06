import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    const stripeKey = `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`;
    if (!stripeKey) {
      throw new Error("Stripe publishable key is missing");
    }
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
};

export default getStripe;
