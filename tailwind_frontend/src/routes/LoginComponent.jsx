import React, { useState } from 'react'
import { Icon } from "@iconify/react"
import TextInput from '../assets/shared/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers'
import { useCookies } from 'react-cookie'

const LoginComponent = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"])
  const navigate = useNavigate();  // Corrected to useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password }
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    
    if (response && !response.err) {
        const token = response.token
        const date = new Date()
        date.setDate(date.getDate() + 30)
        
        setCookie("token", token, {
            path: "/", 
            expires: date
        });

        alert("Success");
        navigate("/home");  // Corrected to use navigate from useNavigate
    } else {
        alert("Login failed, please try again");
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center'>
        <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
            <Icon icon="logos:spotify" width="180"/>
        </div>
        <div className="inputRegion w-1/3 py-10 flex flex-col items-center">
            <div className='font-bold mb-12'>To continue, log in to Spotify.</div>
            <form onSubmit={handleSubmit}> {/* Using form's onSubmit */}
                <TextInput 
                    label="Email ID or Username" 
                    placeholder="Email ID or Username" 
                    type="text" 
                    className="my-6" 
                    value={email} 
                    setValue={setEmail}
                />
                <TextInput 
                    label="Password" 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    setValue={setPassword}
                />
                <div className='w-full flex items-center justify-end my-8'>
                    <button type="submit" className='bg-green-600 font-semibold p-3 px-10 rounded-full'>
                        LOG IN
                    </button>
                </div>
            </form>

            <div className='w-full border border-solid border-gray-300'></div>
            <div className='my-6 font-semibold text-lg'>
                Don't have an account?
            </div>
            <div className='border border-gray-500 text-gray-500 w-full flex items-center justify-center rounded-full p-3'>
               <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent
