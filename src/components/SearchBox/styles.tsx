import styled from "styled-components";
import Search from "antd/es/input/Search";

export const SearchCustom = styled(Search)`
  width: 40%;
  border: 1px solid transparent;
  font-size: 1rem;
  
  
  input{
    background-color: rgba(17, 25, 40, 0.73);
    color: pink;
    border: 1px solid transparent;
    font-weight: bold;
  }

  button{
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    background-color: rgba(17, 25, 40, 1);
    border: 1px solid transparent;
    
    svg{
      color: pink;
    }
  }
`