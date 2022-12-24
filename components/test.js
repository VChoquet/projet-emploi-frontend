import React, { useState } from "react";
import { Button } from "reactstrap";
import { Modal, Text, Input, Spacer, Row, Checkbox } from "@nextui-org/react";

export default function App() {
	const [visible, setVisible] = useState(false);
	const [query, setQuery] = useState(false);


	const handler = () => setVisible(true);

	const cancelHandler = () => {
		setVisible(false);
	}



	const validateHandler = () => {
	}

	return (
		<div>
			<Button className="button relative left-3/4 top-20" shadow onClick={handler}>
				Postuler
			</Button>
			<Modal
				blur
				closeButton
				width="600px"
				aria-labelledby="modal-title"
				open={visible}
				onClose={cancelHandler}
			>
				<Modal.Header>
					<Text b id="modal-title" size={24}>
						Je souhaite postuler
					</Text>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={validateHandler}>
						<label htmlfFor="nom" className="label" >Nom: </label>
						<input className="case" id="nom" name="nom" type="text" required/>
						<Spacer y={1}/>
						<label htmlfFor="prenom" className="label" >Prenom: </label>
						<input className="case" id="prenom" name="prenom" type="text" required/>
						<Spacer y={1}/>	
						<label htmlfFor="email" className="label" >Email: </label>
						<input className="case" id="email" name="email" type="email" required/>
						<Spacer y={1}/>
						<input id="cv" name="name" type="file" onChange={onChangeFile} required/>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button className="button" onClick={cancelHandler}>
						Annuler
					</Button>
					<Button className="button" onClick={validateHandler}>
						Candidater
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
