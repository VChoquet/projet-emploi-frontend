import Head from "next/head";
import Link from "next/link";
import { Button } from "reactstrap";
import Cadre from "./../components/cadre"

export default function Home() {
	return (
	<div>
		<Head>
			<title>Lebonemploi - accueil</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div className='body'>
			<Cadre text="Une liste exhaustive des offres d'emplois en Polynésie"/>
			<main className='main'>
				<Link href="/annonces">
					<Button className="mainButton">Accéder à nos annonces</Button>
				</Link>	
			</main>
		</div>
	</div>);
}


