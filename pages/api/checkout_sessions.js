const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const item = req.body.cartItem
    console.log(cartItem)
    const transformedItems = {
        price_data: {
            currency: "ind",
            product_data: {
                name: item.category,
                // images: [req.headers.origin+item.image],
            },
            unit_amount: item.gigPrice * 100,
        },
        quantity: 1,
    }
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/`,
      });
    //   res.redirect(303, session.url);
    res.json({"sessionURL": session.url});
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}