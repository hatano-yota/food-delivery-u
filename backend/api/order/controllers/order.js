"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(
  "sk_test_51Mh8CQHk11ig6PZsVRaGFbCrrAlj9GuB1tX2TN7txgoCt0RWWOhqcKhWuKABgNrUTpXA3ab1l5uYjU2RSz6a8la9000qM46xpS"
);

module.exports = {
  // 注文を作成する
  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body);

    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      source: token,
      description: `Order ${new Date()} by ${ctx.state.user.id}`,
    });

    const order = await strapi.services.order.create({
      user: ctx.state.user_id,
      charge_id: charge.id,
      amount,
      address,
      dishes,
    });

    return order;
  },
};
