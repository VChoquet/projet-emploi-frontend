import { useRouter } from "next/router";
import React, {useState, useEffect} from "react";

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
        <div>{JSON.stringify(annonce)}</div>
    )
}