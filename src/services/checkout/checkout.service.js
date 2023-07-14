import createStripe from "stripe-client";
import { host } from "../../utils/env";

const STRIPE_KEY = "test_Publishable_key";
const stripe = createStripe(STRIPE_KEY);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    method: "POST",
    body: JSON.stringify({
      token,
      amount,
      name,
    }),
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("Something went wrong processing your pay");
    }
    return res.json();
  });
};
