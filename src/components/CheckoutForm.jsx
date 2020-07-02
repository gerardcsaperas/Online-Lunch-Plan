import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Bootstrap
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function CheckoutForm(props) {
	const [ succeeded, setSucceeded ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ processing, setProcessing ] = useState(false);
	const [ disabled, setDisabled ] = useState(true);
	const [ clientSecret, setClientSecret ] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		window
			.fetch('/create-payment-intent', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					items: {
						drinks: props.drinksOrdered,
						primerSegonCount: props.primerSegonCount,
						dosPrimersCount: props.dosPrimersCount,
						platPostresCount: props.platPostresCount
					}
				})
			})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setClientSecret(data.clientSecret);
			});
	}, []);

	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d'
				}
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a'
			}
		}
	};

	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: ev.target.name.value
				}
			}
		});
		console.log(payload);
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			setError(null);
			setProcessing(false);
			setSucceeded(true);
		}
	};
	return (
		<Container>
			<Row>
				<Col xs={12} md={12}>
					<Form id="payment-form" onSubmit={handleSubmit}>
						<CardElement id="card-element" onChange={handleChange} />
						{processing || disabled || succeeded ? (
							<Button disabled>Pagar</Button>
						) : (
							<Button id="submit">Pagar</Button>
						)}
						{succeeded ? <p>Payment Successful</p> : null}
						{error ? <p>There was an error</p> : null}
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
