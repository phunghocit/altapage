import { useState, useMemo } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { SearchCustom } from "./styles";
import Search from "antd/es/input/Search";

const SearchBox = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const keyword = useMemo (()=> {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.has('keyword') ? searchParams.get('keyword') : '';
    },[location])

    const onSearch = (e:any) => {
        const value = e.target.value;
        navigate(`${location.pathname}?keyword=${value}`);
    }

    return <Search placeholder="Nhập từ khoá" value={`${keyword}`} onChange={onSearch}/>
}

export default SearchBox;