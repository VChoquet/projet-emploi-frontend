import Cadre from "../../components/cadre";
import Head from "next/head";
import { Button } from "reactstrap";
import Back from "../../components/back";
import { Spacer } from "@nextui-org/react";

type Annonce = {
    nom_employeur: string,
    email: string,
    ville: string, 
    description: string,
    intitule: string,
    type_contrat: string,
    date_creation: string,
}

async function postData(data: Annonce){
    alert("depuis post" + JSON.stringify(data));
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + `/annonces`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
    const reponse = await resp.json();
    alert("reponse serveur" + JSON.stringify(reponse));
    //*Renvoi un json avec id créé normalement et reste des champs vides
}

async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();        
    const date = new Date().toDateString();

    if(event.currentTarget === null) return;

    const target = event.currentTarget;
    const data: Annonce = {
        nom_employeur: target.nom.value,
        email: target.email.value,
        ville: target.ville.value,
        description: target.description.value,
        intitule: target.intitule.value,
        type_contrat: target.type_contrat.value,
        date_creation: date,
    }

    alert("depuis main" + JSON.stringify(data)); 
    //* Les données sont correctements placées dans les champs
    
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(data.email)){
        postData(data)
    }
    else{
        alert("le format de l'email est invalide");
    }
}

export default function formulaire(){
    return(
        <div>
            <Head>
                <title>Lebonemploi - Créer une annonce</title>
            </Head>
            <div className="body">
                <Back text="Annuler la création de l'annonce"/>
                <Cadre text="Création d'une annonce"/>
                <div className="absolute top-1/3 left-1/3 bg-misty p-5 w-fit leading-12 rounded-xl">
                    <form  onSubmit={handleSubmit}>
                        <label className="label" htmlFor="nom">nom de l'entreprise: </label>
                        <input className="case" type="text" id="nom" name="nom" size={30} required/><br/>
                        <Spacer y={1}/>
                        <label className="label" htmlFor="email">email de l'entreprise: </label>
                        <input className="case" type="email" id="email" name="email" size={30} required/><br/>
                        <Spacer y={1}/>
                        <label className="label" htmlFor="intitule">intitule du poste: </label>
                        <input className="case" type="text" id="intitule" name="intitule" size={30} required/><br/>
                        <Spacer y={1}/>
                        <label className="label" htmlFor="ville">ville du poste: </label>
                        <input className="case" type="text" id="ville" name="ville" size={30} required/><br/>
                        <Spacer y={1.5}/>
                        <label className="label" htmlFor="description">description du poste: </label>
                        <textarea  className="case" data-type="text" id="description" name="description" rows={5} cols={50} required/><br/>
                        <Spacer y={1}/>
                        <label>Type de contrat:</label>
                        <div className="radio">
                            <input type="radio" id="cdd" name="type_contrat" value="CDD" required/>
                            <label className="label" htmlFor="cdd"> CDD </label><br/>
                            <input type="radio" id="interim" name="type_contrat" value="Interim" required/>
                            <label className="label" htmlFor="interim"> Intérim </label><br/>
                            <input type="radio" id="cdi" name="type_contrat" value="CDI" required/>
                            <label className="label" htmlFor="cdi"> CDI </label><br/>
                            <input type="radio" id="stage" name="type_contrat" value="Stage" required/>
                            <label className="label" htmlFor="stage"> Stage </label><br/>
                        </div>
                        
                        <Button type="submit" className="button dark absolute bottom-8 right-8">Valider</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}