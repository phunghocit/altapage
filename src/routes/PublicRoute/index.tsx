import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    page?:any
  }
const PublicRoute = ({page}:Props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem(`token`)
    // const token2 = localStorage.getItem(`token2`)

    useEffect(()=>{
        if(token){
            navigate("/Dashboard");
        }
        // if(token2){
        //     navigate("/ResetPassword/:doc.id");

        // }
    },[])

    return(
        <div>{page}</div>
    )
}

export default PublicRoute;