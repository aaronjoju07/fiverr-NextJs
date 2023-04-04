const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { id } = router.query;
  if (req.method === 'POST') {
    const { GigValue } = req.body;    try {
       // Create a Product object
       const product = await stripe.products.create({
        name: 'My Product', // Replace with your product name
        description: 'A description of my product', // Replace with your product description
      });

      // Create a Price object
      const price = await stripe.prices.create({
        unit_amount: id * 100, // the price in cents
        currency: 'inr',
        product: product.id, // pass the ID of the Product object
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        // billing_address_collection: 'null', // remove billing address section
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}