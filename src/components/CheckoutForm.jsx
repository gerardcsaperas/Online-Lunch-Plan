import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Bootstrap & Styling
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap';

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
		base: {
			backgroundColor: 'white',
			color: 'grey',
			lineHeight: '2rem',
			padding: '2px',
			fontFamily: 'Montserrat, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#c6c6c6'
			}
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a'
		},
		complete: {
			color: 'green',
			iconColor: 'green'
		}
	};

	const handleCardChange = async (event) => {
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

		// Handle Error
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else if (payload.paymentIntent.status === 'succeeded') {
			// If payment succeeded, send eMail with details
			props.sendEmail();
			setSucceeded(true);
			setError(null);
			setTimeout(() => {
				window.location.replace('https://www.cateringroser.cat');
			}, 10000);
		}
	};
	return (
		<Container>
			<Row>
				<Col xs={12}>
					<h1>Detalls Pagament</h1>
				</Col>
				<Col xs={12} md={10}>
					<hr />
				</Col>
				<Col xs={12}>
					<Form id="payment-form" onSubmit={handleSubmit}>
						<Form.Row className="d-flex justify-content-center">
							<Col xs={12} md={8} className="mb-4">
								<CardElement
									id="cardElement"
									onChange={handleCardChange}
									options={{
										hidePostalCode: true,
										style: cardStyle
									}}
								/>
							</Col>
							<Col xs={12} md={8} className="d-flex justify-content-center">
								{processing || disabled || succeeded ? (
									<Button variant="success" disabled>
										Pagar
									</Button>
								) : (
									<Button variant="success" type="submit">
										Pagar
									</Button>
								)}
							</Col>
							<Col xs={12} md={8} className="d-flex justify-content-center">
								{processing || succeeded ? (
									<Button disabled>Enrrere</Button>
								) : (
									<Button onClick={props._backToAddressValidation}>Enrrere</Button>
								)}
							</Col>
							<Col xs={12} md={8} className="mb-2">
								{succeeded ? (
									<Row>
										<Col xs={12} className="text-center">
											<p>Moltes gràcies! En 10 segons serà redirigit a la pàgina d'inici.</p>
										</Col>
										<Col xs={12} className="d-flex justify-content-center">
											<Spinner variant="success" animation="border" />
										</Col>
									</Row>
								) : null}
								{error ? <p>Hi ha hagut un error amb el seu pagament. Revisi les dades.</p> : null}
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
