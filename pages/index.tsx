import Head from "next/head";
import Cadre from "../components/cadre"
import React, { useEffect } from "react";
import Router from "next/router";

export default function Home() {

	useEffect(() => {
		const {pathname} = Router;
		if(pathname == '/'){
			Router.push('annonces');
		}
	})

	return (
	<div>
		<Head>
			<title>Lebonemploi - accueil</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className='body'>
			<Cadre text="Une liste exhaustive des offres d'emplois en Polynésie"/>
			<main className='main'>
				<div>Chargement des annonces</div>
			</main>
		</div>
	</div>);
}


