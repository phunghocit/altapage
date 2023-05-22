import styled from "styled-components";
import { Table, Button } from "antd";
import Search from "antd/es/input/Search";


export const Headbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const SearchBox = styled(Search)`
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
export const ButtonAction = styled(Button)`
    margin-right: 10px;
    font-weight: bold;
    color: pink;

    :hover{
      background-color: white;
    }
`;
export const TableCustom = styled(Table)`
  margin-top: 1rem;

  ::-webkit-scrollbar {
    width: 0px;
  } 

  .ant-table {
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    /* background-color: rgba(17, 25, 40, 0.73); */
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
  }

  .ant-table-thead .ant-table-cell {
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    background-color: #FF9138;
    color: white;
  }
  .ant-table-tbody {
    height: 70%;
    overflow-y: auto;
  }

  .ant-table-tbody .ant-table-row {
    border: 1px solid white;
  }

  .ant-table-tbody .ant-table-cell {
    border-bottom: 0.75px solid white;
    color: #535261;
    font-weight: bold;
    padding: 0.3rem;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    background-color: rgba(17, 25, 40, 0.73);
    color: white;
  }

  .ant-pagination {
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    /* background-color: rgba(17, 25, 40, 0.73); */
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    margin: 0px !important;
    padding: 0.5rem;
    border-radius: 0 0 1rem 1rem;
  }
  /* .ant-pagination-item {
    background-color: #FF9138;
    border: 0;
    color: white;

  } */
`;

// export const Avatar = styled.img`
//   width: 3.5rem;
//   border-radius: 50%;
// `;

// export const ButtonAction = styled(Button)`
//     margin-right: 10px;
//     font-weight: bold;
//     border: 2px solid ${props => props.act === "edit"?"#0074D9":"#FF4136"} !important;
//     background-color: ${props => props.act === "edit"?"#0074D9":"#FF4136"};
//     color: pink;

//     :hover{
//       background-color: white;
//       color: ${props => props.act === "edit"?"#0074D9":"#FF4136"} !important;
//     }
// `;

export const ButtonCreate = styled(Button)`
  background-color: #3D9970;
  border: 2px solid #3D9970 !important;
  font-weight: bold;
  color: white;

  :hover{
    background-color: white;
    color: #2ECC40 !important;
  }
`