import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {api} from '../api/api'

export const signIn = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const res = await api.post('/auth/signIn', {email,password})
            localStorage.setItem('token',res.data.token)
            navigate('/')
        }
        catch(err){
            alert("Login Failed")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="text" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">Submit</button>
        </form>
    )
}