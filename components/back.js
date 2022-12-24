import Link from "next/link";
import { Button } from "reactstrap";

const Back = ({text, back = "<"}) => {
    return(
        <Link href="./" className="fixed left-7 top-24">
        <Button className="back group">
            <div className="relative top-[-7px] left-[-1px]">{back}</div>
            <span className="tooltip left-16 group-hover:scale-100">{text}</span>  
        </Button>
    </Link>
    );
}

export default Back;