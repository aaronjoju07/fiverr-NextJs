import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { lineItems } = req.body
      const product = await stripe.products.create({
        name: 'My Product', // Replace with your product name
        description: 'A description of my product', // Replace with your product description
      });

      // Create a Price object
      const price = await stripe.prices.create({
        unit_amount: lineItems.gigPrice * 100, // the price in cents
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
        success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin,
      })

      return res.status(201).json({ session })

      // If using HTML forms you can redirect here
      // return res.redirect(303, session.url)
    } catch (e) {
      return res.status(e.statusCode || 500).json({ message: e.message })
    }
  }

  res.setHeader('Allow', 'POST')
  res.status(405).end('Method Not Allowed')
}

export default handler
