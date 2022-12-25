import React, { useRef, useState } from "react";
import { Button } from "reactstrap";
import { Modal, Text, Input, Spacer, Row, Checkbox } from "@nextui-org/react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IProps{
	acceptedFilTypes?: string;
	allowMultipleFiles?: boolean;
	label: string;
	uploadFileName: string;
	id_annonce: string;
}

interface FileSaver{
	file: any;
}

interface Candidature{
	id_annonce: string;
	nom: string;
	prenom: string;
	email: string;
	pathCV: string;
}

export const Dialog: React.FC<IProps> = (props) => {
	const [visible, setVisible] = useState(false);
	const values = useRef<FileSaver>({
		file: false,
	});


	const handler = () => setVisible(true);

	const cancelHandler = () => {
		setVisible(false);
	}

	const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(!event?.currentTarget.files?.length || event.target.files === null){
			return;
		}

		values.current.file = event.currentTarget.files[0];
	}

	const uploadFile = async (formData: FormData): Promise<AxiosResponse<any, any>> => {
        console.log("config");
        const config: AxiosRequestConfig<FormData> = {
            headers: { 'Content-Type': 'multipart/form-data'},
        };
        console.log("post");
        const reponse = await axios.post('/api/upload', formData, config);
		return await reponse;
    }

	const createCandidature = async (candidature: Candidature) => {
		try{
			const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/candidatures', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(candidature),
			})
			console.log(await resp.json());
			alert("Candidature déposée");
		} catch (error){
			console.log(error);
		}
	}


	const validateHandler = async (event:  React.FormEvent<HTMLFormElement>) => {
		console.log("click")
		event.preventDefault();
		const formData	= new FormData();
		formData.append('file', values.current.file);
		console.log("form");
		const reponse = uploadFile(formData);
		console.log("change")

		const candidature: Candidature = {
			nom: event.currentTarget.nom.value,
			id_annonce: props.id_annonce,
			prenom: event.currentTarget.prenom.value,
			email: event.currentTarget.email.value,
			pathCV: (await reponse).data.data,
		};
		createCandidature(candidature);
		//console.log(JSON.stringify(candidature));
		setVisible(false);
	}

	return (
		<div>
			<Button className="button dark relative left-3/4 top-20" onClick={handler}>
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
						<label htmlFor="nom" className="label" >Nom: </label>
						<input className="case" id="nom" name="nom" type="text" required/>
						<Spacer y={1}/>
						<label htmlFor="prenom" className="label" >Prenom: </label>
						<input className="case" id="prenom" name="prenom" type="text" required/>
						<Spacer y={1}/>	
						<label htmlFor="email" className="label" >Email: </label>
						<input className="case" id="email" name="email" type="email" required/>
						<Spacer y={1}/>
						<label htmlFor="cv" className="label">CV: </label>
						<input id="cv" name="name" type="file" onChange={onChangeFile} required/>
						<Spacer y={2}/>
						<Button className="button cancel relative ml-5 mr-20" onClick={cancelHandler}>
							Annuler
						</Button>
						<Button type="submit" className="button dark ml-20 mr-5">
							Candidater
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		</div>
	);
}
