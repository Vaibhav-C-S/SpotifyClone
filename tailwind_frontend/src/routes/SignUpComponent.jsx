import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import {useCookies} from 'react-cookie'
import TextInput from '../assets/shared/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelpers'

const SignUpComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    const [cookie,setCookie] = useCookies(["token"])
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        
        
        if (!email) validationErrors.email = "Email is required";
        if (email !== confirmEmail) validationErrors.confirmEmail = "Emails do not match!";
        if (!password || password.length < 6) validationErrors.password = "Password must be at least 6 characters";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted with:", { email, username, firstName, lastName });
            // Perform actual signup action here
        }


        const data = {email,password,username,firstName,lastName}
        const response = await makeUnauthenticatedPOSTRequest("/auth/register",data);
        if(response && !response.err){
            
            const token = response.token
            const date = new Date()
            date.setDate(date.getDate() + 30)
            setCookie ("token",token,{
                path:"/",expires:date
            })
            
            alert("sucess")
            navigate("/home")
        }else{
            alert("failed")
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <Icon icon="logos:spotify" width="180"/>
            </div>

            <form className="inputRegion w-1/3 py-10 flex flex-col items-center" onSubmit={handleSubmit}>
                <div className='font-bold text-2xl mb-12'>Sign up for free to start listening</div>
                
                <TextInput 
                    label="Email address" 
                    placeholder="Enter your email" 
                    type="text" 
                    value={email} 
                    setValue={setEmail} 
                    error={errors.email} 
                />
                <TextInput 
                    label="Confirm email address" 
                    placeholder="Enter your email again" 
                    type="text" 
                    value={confirmEmail} 
                    setValue={setConfirmEmail} 
                    error={errors.confirmEmail} 
                />
                <TextInput 
                    label="Username" 
                    placeholder="Enter your username" 
                    type="text" 
                    value={username} 
                    setValue={setUsername} 
                />
                <TextInput 
                    label="Create Password" 
                    placeholder="Enter a strong password" 
                    type="password" 
                    value={password} 
                    setValue={setPassword} 
                    error={errors.password} 
                />
                
                <div className='w-full flex justify-between items-center space-x-4'>
                    <TextInput 
                        label="First Name" 
                        placeholder="Enter your first name" 
                        type="text" 
                        value={firstName} 
                        setValue={setFirstName} 
                    />
                    <TextInput 
                        label="Last Name" 
                        placeholder="Enter your last name" 
                        type="text" 
                        value={lastName} 
                        setValue={setLastName} 
                    />
                </div>

                <div className='w-full flex items-center justify-center my-8'>
                    <button className='bg-green-600 font-semibold p-3 px-10 rounded-full' type="submit">
                        SIGN UP
                    </button>
                </div>

                <div className='w-full border border-solid border-gray-300'></div>

                <div className='my-6 font-semibold text-lg'>Already have an account?</div>
                
                <div className='border border-gray-500 text-gray-500 w-full flex items-center justify-center rounded-full p-3'>
                    <Link to="/login">LOG IN TO SPOTIFY</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUpComponent;
