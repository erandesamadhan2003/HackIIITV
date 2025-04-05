import { CompareDemo } from "@/components/CompareDemo"
import { Button } from "@/components/ui/button"
import { WorldMapDemo } from "@/components/WorldMapDemo"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(!token) navigate('/login');
    },[])
    return (
        <div>
            <WorldMapDemo/>
            <CompareDemo/> 
        </div>
    )
}