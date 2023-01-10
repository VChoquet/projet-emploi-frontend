import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";
import Cadre from "../../components/cadre"
import Dialog from "../../components/dialog";
import Back from "../../components/back";
import { Annonce } from "../../Interfaces/annonce";

async function updateVisite(annonce: Annonce) {
    await fetch(process.env.NEXT_PUBLIC_API_URL + `/annonces/${annonce.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nb_visite: parseInt(annonce.nb_visite)
        }),
    });
}

export default function details(){
    const {query: {id}} = useRouter();
    const [annonce, setAnnonce] = useState<any>(null);

    useEffect(() => {
        async function getAnnonce() {
            const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+`/annonces/${id}`);
            setAnnonce(await resp.json());
        }
        if(id){
            getAnnonce();
        }
    }, [id])


    if(annonce === null || typeof id !== 'string'){
        return <div>Loading...</div>;
    }

    const nb_visite = annonce.nb_visite + 1;

    const annonceUpdate: Annonce = {
        id,
        nom_employeur: annonce.nom_employeur,
        email: annonce.email,
        intitule: annonce.intitule,
        ville: annonce.ville,
        description: annonce.description,
        type_contrat: annonce.type_contrat,
        date_creation: annonce.date_creation,
        nb_visite
    }

    updateVisite(annonceUpdate);




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
                        <Dialog label="Choisir un fichier" uploadFileName="file" id_annonce={annonce.id}/>
                    </div>
            </div>
        </div>
    )
}