import { ReactNode } from "react";

interface Props {
    children?: ReactNode,
    title?:any
  }
const PublicLayout = ({children}:Props) => {

    return(
        <div>{children}</div>
    )
}

export default PublicLayout;