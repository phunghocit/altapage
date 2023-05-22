import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    page?:any
  }
const PrivateRoute = ({page}:Props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem(`token`)

    useEffect(() => {
        if(!token){
            navigate("/");
        }
    },[])

    return(
        <div>{page}</div>
    )
}

export default PrivateRoute;