import Link from "next/link";
import { Button } from "reactstrap";

const Cadre = ({text}) => {
    return(
        <div className="fixed top-0 left-0 h-16 w-screen py-3
        flex bg-primary shadow-lg z-10 bg-grotto">
            <Link href="./" className="text-misty font-bold text-3xl mx-5 z-10 group">
                <h1>Lebonemploi</h1>
                <span className="tooltip group-hover:scale-100">Retour à l'accueil</span>    
            </Link>
            <div className="absolute text-misty text-2xl mt-1 text-center w-screen font-sans">{text}</div>
            <Link className="absolute text-end right-10 mt-1" href="/annonces/create">
                <Button color="default" type="button" component="a" className="button">Creer une annonce</Button>
            </Link>
        </div>
    );
}

export default Cadre;