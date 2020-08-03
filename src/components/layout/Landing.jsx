import React, { useState, useRef, Fragment } from 'react';
import CookieConsent from 'react-cookie-consent';
import '../styles/Landing.css';

// Components
import Hero from './landing-components/Hero';
import Services from './landing-components/Services';
import About from './landing-components/About';
import Contact from './landing-components/Contact';
import Footer from './Footer';

function Landing() {
	return (
		<Fragment>
			<CookieConsent>Aquesta web utilitza cookies per a una millor experiencia d'usuari.</CookieConsent>
			<Hero />
			<Services />
			<About />
			<Contact />
			<Footer />
		</Fragment>
	);
}

export default Landing;
