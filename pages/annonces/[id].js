import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import Cadre from "./../../components/cadre"
import Link from "next/link";
import { Button } from "reactstrap";
import Dialog from "../../components/dialog";
import App from "../../components/test";
import Back from "../../components/back";

export default function details(){
    const {query: {id}} = useRouter();
    const [annonce, setAnnonce] = useState(null);
    const [showModal, setShowModal] = useState(false);

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
        return <div>Loading...</div>;
    }
    
    const nb_visite = annonce.nb_visite + 1;

    fetch(process.env.NEXT_PUBLIC_API_URL + `/annonces/${annonce.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: {
            nom_employeur: annonce.nom_employeur,
            email: annonce.intitule,
            intitule: annonce.intitule,
            ville: annonce.ville,
            description: annonce.dscription,
            nb_visite,
            date_creation: annonce.date_creation,
        }
    });


    


    return(
        <div>
            <Head>
                <title>Lebonemploi - offre n° {annonce.id}</title>
            </Head>
            <div className="body overflow-hidden">
                <Cadre text="Details de l'offre"/>
                    <Back text="Retour à la liste des annonces"/>
                    <div className="details">
                        <div className="intitule">{annonce.intitule}</div>	
                        <div className="absolute left-5 bottom-12">visité {nb_visite} fois</div>
                        <div className="absolute left-5 bottom-5">créé le {annonce.date_creation}</div>
                        <div className="flex">
                            <div className="element"><span className="font-bold">ville: </span> {annonce.ville}</div>
                            <div className="element"><span className="font-bold">contrat: </span> {annonce.type_contrat}</div>
                            <div className="element"><span className="font-bold">employeur: </span>{annonce.nom_employeur}</div>
                            <div className="element"><span className="font-bold">email: </span> {annonce.email}</div>
                        </div>
                        <div className="description">{annonce.description}</div>
                        <App/>
                    </div>
            </div>
        </div>
    )
}