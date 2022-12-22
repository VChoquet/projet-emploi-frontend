import Head from "next/head";
import Link from "next/link";
import Cadre from "./../../components/cadre"
import { useState, useEffect } from "react";

export default function Home() {
	const [annonces, setAnnonces] = useState([]);

	useEffect(() => {
		async function getAnnonces() {
			const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'/annonces');		
			setAnnonces(await resp.json());
		}
		getAnnonces();
	}, [])

	if(!annonces){
		return <div>Loading...</div>
	}

	return (
	<div>
		<Head>
			<title>Lebonemploi - annonces</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className='body'>
			<Cadre text="Nos offres d'emplois"/>
			<main className='main'>
			{annonces.map((annonce) => (
				<div className="annonce">
					<Link href={`/annonces/${annonce.id}`}>
						<div>
							<div className="intitule">{annonce.intitule}</div>	
							<div className="flex">
								<div className="element"><span className="font-bold">ville: </span> {annonce.ville}</div>
								<div className="element"><span className="font-bold">contrat: </span> {annonce.type_contrat}</div>
								<div className="element"><span className="font-bold">employeur: </span>{annonce.nom_employeur}</div>
							</div>
							<div className="description">{annonce.description.substring(0,99)+'...' }</div>
						</div>
					</Link>
				</div>
			))}
			</main>
		</div>
	</div>);
}


