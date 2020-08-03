import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ShowMenu.css';

// Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap';

//Import menu data from a separate file in order to automatically update UI according to date
import menuOf from './menuData';

export default function ShowMenu(props) {
	if (props.currentStep !== 'showMenu') {
		return null;
	} else if (props.totalOrdersCount >= 100) {
		return (
			<Container className="Step1">
				<Row>
					<h1 id="menuTitle">El Menú</h1>
				</Row>
				<Row>
					<h2 className="date">{`${props.currDate.getDate()}/${props.currDate.getMonth() +
						1}/${props.currDate.getFullYear()}`}</h2>
				</Row>
				<hr />
				<Row>
					<h2>Primers</h2>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].primers[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].primers[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].primers[2]}</p>
				</Row>
				<Row>
					<h2>Segons</h2>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].segons[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].segons[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].segons[2]}</p>
				</Row>
				<Row>
					<h2>Postres</h2>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].postres[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].postres[1]}</p>
				</Row>
				<Col className="text-center">
					<p id="complet">
						<b>Cuina plena!</b> Sentim les molesties.
					</p>
				</Col>
				<Col className="text-center">
					<Button id="changeDate" className="btn" type="button" onClick={props._toChangeDate}>
						Canviar Dia
					</Button>
				</Col>
				<Col className="text-center">
					<Button
						id="_backToLanding"
						type="button"
						onClick={props._backToLanding}
						className="text-center mb-2"
					>
						Enrrere
					</Button>
				</Col>
			</Container>
		);
	} else if (props.dayOfTheWeek === 6 || props.dayOfTheWeek === 0) {
		return (
			<Container className="Step1">
				<Row>
					<h1 id="menuTitle">El Menú</h1>
				</Row>
				<Row>
					<h2 className="date">{`${props.currDate.getDate()}/${props.currDate.getMonth() +
						1}/${props.currDate.getFullYear()}`}</h2>
				</Row>
				<hr />
				<Row className="text-center m-2">
					<p>
						Els caps de setmana no oferim menú, apreta 'Canviar Dia' per a seleccionar una nova data o
						visita'ns a les nostres tendes!
					</p>
				</Row>
				<Col className="text-center">
					<Button id="changeDate" type="button" onClick={props._toChangeDate} className="text-center mb-2">
						Canviar Dia
					</Button>
				</Col>
				<Col className="text-center">
					<Button
						id="_backToLanding"
						type="button"
						onClick={props._backToLanding}
						className="text-center mb-2"
					>
						Enrrere
					</Button>
				</Col>
			</Container>
		);
	} else {
		return (
			<Container className="Step1">
				<Row>
					<h1 id="menuTitle">El Menú</h1>
				</Row>
				<Row>
					<h2 className="date">{`${props.currDate.getDate()}/${props.currDate.getMonth() +
						1}/${props.currDate.getFullYear()}`}</h2>
				</Row>
				<hr />
				<Row>
					<h2>Primers</h2>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].primers[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].primers[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].primers[2]}</p>
				</Row>
				<Row>
					<h2>Segons</h2>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].segons[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].segons[1]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].segons[2]}</p>
				</Row>
				<Row>
					<h2>Postres</h2>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].postres[0]}</p>
				</Row>
				<Row>
					<p>{menuOf[props.dayOfTheWeek].postres[1]}</p>
				</Row>
				<Col className="text-center">
					<Button className="btn" id="Demanar" type="button" onClick={props._toChooseMenuType}>
						Demanar
					</Button>
				</Col>
				<Col className="text-center">
					<Button id="changeDate" className="btn" type="button" onClick={props._toChangeDate}>
						Canviar Dia
					</Button>
				</Col>
				<Col className="text-center">
					<Link to="/">
						<Button
							id="_backToLanding"
							type="button"
							onClick={props._backToLanding}
							className="text-center mb-2"
						>
							Enrrere
						</Button>
					</Link>
				</Col>
			</Container>
		);
	}
}
