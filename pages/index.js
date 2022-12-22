import Head from "next/head";
import Link from "next/link";
import Cadre from "./../components/cadre"
import Foot from "./../components/footer"
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

	return (
	<div>
		<Head>
			<title>Lebonemploi</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div>
			{annonces.map((annonce) => (
				<div className="annonce">
					<Link href={`/annonces/${annonce.id}`}>
						<div>
							{JSON.stringify(annonce)}
						</div>
					</Link>
				</div>
			))}
		</div>
	</div>);
}


