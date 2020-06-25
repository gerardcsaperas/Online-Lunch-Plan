const cors = require("cors");
const express = require("express");
const env = require('dotenv').config({ path: './.env' })
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async(req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;
    try {
        const { grandTotal, token, products } = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotencyKey = uuid();
        const charge = await stripe.charges.create({
            amount: parseFloat(grandTotal),
            currency: "eur",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the following menus ${products[0]}, ${products[1]}, ${products[2]}`,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        }, {
            idempotencyKey
        });
        console.log("Charge:", { charge });
        status = "success";
    } catch (error) {
        console.error("Error:", error);
        status = "failure";
    }

    res.json({ error, status });
});

app.listen(8080);