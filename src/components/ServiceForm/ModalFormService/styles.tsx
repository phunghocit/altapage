import { Button, Form, Input } from "antd";
import styled from "styled-components";

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h2`
    font-size: 3rem;
    margin-top:0;
    color: #4096ff;
`

export const FormContainer = styled(Form)`
    width: 50%;

`

export const InputBox = styled(Form.Item)`
    padding-bottom: 2rem;

    margin: 0;
    margin-bottom: 1rem;
`

export const InputField = styled(Input)`
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    color: black;
    position: relative;



    input:not(:placeholder-shown) + .ant-input-suffix,
    &:focus-within .ant-input-suffix{
        transform: translateY(-60%);
        padding: 0 0.5rem;
        color: #4096ff;
        height: auto
    }

    .ant-input-suffix{
        position:absolute;
        z-index: 1;
        background-color: white;
        margin: 0;
        top: 0;
        left: 1rem;
        height: 100%;
        transition: 0.5s ease;
        color: #d9d9d9;
        border-radius: 1rem;
    }

    .ant-input-prefix{
        position:absolute;
        z-index: 1;
        top: 30%;
        right: 0;
    }

    .ant-form-item-feedback-icon{
        display: none;
    }
`

export const ButtonShowPassword = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background: transparent;
    border: none;

    cursor: pointer;

    svg{
        font-size: 1.25rem;
    }
`

export const SubmitButton = styled(Button)`
    font-size: 1rem;
    font-weight: bold;
    height: auto;
    width: auto;
    padding: 0.25rem 1.25rem;

    background:#4096ff;
    color: white;
    border: 2px solid #4096ff;

    :hover{
        color:#4096ff;
        background: white;
    }
`
export const CancelButton = styled(Button)`
    font-size: 1rem;
    font-weight: bold;
    height: auto;
    width: auto;
    padding: 0.25rem 1.25rem;

    background:#4096ff;
    color: white;
    border: 2px solid #4096ff;

    :hover{
        color:#4096ff;
        background: white;
    }
`

export const Register = styled.div`
    margin-top: 0.5rem;
    color: black;
    font-size: 0.8rem;

    a{
        text-decoration: none;
        color:#4096ff;
    }
`