import styled from "styled-components";

export const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items:  center;
  margin: 1rem 0;
  gap: 0.5rem;
  /* background-color: #001f3f; */
  border-radius: 1rem;
  padding: 0.55rem 1rem;
  /* border-sizing: border-box; */

  img{
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50px;
  }  
`

export const Role = styled.h2`
  margin: 0;
  font-size: 0.75rem;
  color:hsla(210, 100%, 75%, 1.0);
`

export const Username = styled.h2`
  margin: 0;
  color:hsla(210, 100%, 75%, 1.0);
  font-size: 1rem;
`