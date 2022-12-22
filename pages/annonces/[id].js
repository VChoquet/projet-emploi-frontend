import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import Cadre from "./../../components/cadre"
import Link from "next/link";
import { Button } from "reactstrap";

export default function details(){
    const {query: {id}} = useRouter();
    const [annonce, setAnnonce] = useState(null);

    useEffect(() => {
        async function getAnnonce() {
            const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+`/annonces/${id}`);
            setAnnonce(await resp.json());
        }
        if(id){
            getAnnonce();
        }
    }, [id])

    if(!annonce){
        return <div>oskour</div>;
    }

    return(
        <div>
            <Head>
                <title>Lebonemploi - offre n° {annonce.id}</title>
            </Head>
            <div className="body overflow-hidden">
                <Cadre text="Details de l'offre"/>
                <div className="details">
                    <div className="intitule">{annonce.intitule}</div>	
                    <div className="flex">
                        <div className="element"><span className="font-bold">ville: </span> {annonce.ville}</div>
                        <div className="element"><span className="font-bold">contrat: </span> {annonce.type_contrat}</div>
                        <div className="element"><span className="font-bold">employeur: </span>{annonce.nom_employeur}</div>
                        <div className="element"><span className="font-bold">email: </span> {annonce.email}</div>
                    </div>
                    <div className="description">{annonce.description}</div>
                    <Link href="./" className="fixed left-7 top-24">
                        <Button className="mainButton">Retourner aux annonces</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}