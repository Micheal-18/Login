import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const CreatePass = () => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [click, setClick] = useState(false)
    // const [ClickConfrim, setClickConfrim] = useState(true)

    const handleSetClick = () => {
        setClick(!click)
    }

    // const handleSetClickConfrim = () => {
    //     setClickConfrim(click)
    // }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            setEmailError('Email: yolanda@gmail.com')

        } else {
            setEmailError('');
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value
        setPassword(value)

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,16}$)[A-Za-z\d!@#$%^&*]+$/;

        if (!passwordRegex.test(value)) {
            setPasswordError("Password must be 8-16 characters and include a number, lowercase, uppercase, and a special character.")
        } else if (confirmPassword && value !== setPassword) {
            setPasswordError("Passwords don't match. Please check.")
        } else {
            setPasswordError('')
        }
    }

    const handlePasswordConfrimChange = (e) => {
        const value = e.target.value
        setConfirmPassword(value)

        if (password && value !== password) {
            setPasswordError("Passwords don't match. Please check.")
        } else {
            setPasswordError('')
        }
    }


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            if (!email) setEmailError("Email is required");
            if (!password || !confirmPassword) setPasswordError("Password fields can't be empty.");
            return;
        }

        if (!emailError && !passwordError && password === confirmPassword) {
            localStorage.setItem('user', JSON.stringify({email, password,}))
            setSuccessMessage("Account Created Successfully");
            setTimeout(() => navigate("/pages/Login"), 1000);
        }

    }

    useEffect(() => {
        const savedUser =JSON.parse(localStorage.getItem('user'))

        if(savedUser) {
            console.log('savedUser.email, savedUser.password');
        }
    }, [])


    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <div className='mb-6'>
                <div className='border rounded-lg p-4 w-90 md:w-150'>
                    <h1 className='text-4xl text-center font-bold'>Create an account</h1>
                    <p className='text-xs md:text-md text-center text-gray-300 mt-0 md:mt-4 mb-4 md:md-0'>Enter your details below to create your account</p>
                    <form onSubmit={handleSubmit} id='form' className='space-y-2 flex flex-col text-lg'>
                        <div className='relative'>
                            <label htmlFor="Name">Name:</label>
                            <input id='name' type='text' placeholder='Name' className='p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black' required />
                        </div>

                        <div className='relative'>
                            <label htmlFor="email" >Email:</label>
                            <input onChange={handleEmailChange} id='mail' type='email' placeholder='johndoe@email.com' className={`p-2  border border-gray-300 ${emailError ? 'border-red-500' : email ? 'border-green-500' : 'border-gray-300'} w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black`} required />
                            {emailError && (<div className='h-5 md:h-10 text-white text-lg border border-2 bg-red-600 rounded-md border-red-500'>{emailError}</div>)}
                        </div>

                        <div className='relative'>
                            <label htmlFor="password" >Password:</label>                        
                            <input onChange={handlePasswordChange} id='password' type={click ? "password" : "text"} placeholder='Input your password' className={`p-2  border border-gray-300 ${passwordError ? 'border-red-500' : password ? 'border-green-500' : 'border-gray-300'} w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black`} required />
                            {click ? <FaEyeSlash onClick={handleSetClick} className='relative flex left-75  md:left-130 -top-8 active:border-1 active:border-white active:rounded-full' /> : <FaEye onClick={handleSetClick} className='relative flex left-75  md:left-130 -top-8 active:border-1 active:border-white active:rounded-full' />}
                        </div>

                        <div onChange={handlePasswordConfrimChange} className='relative'>
                            <label htmlFor="password" >Confrim Password:</label>
                            <input type={click ? "password" : "text"} placeholder='Confrim your password' className={`p-2  border border-gray-300 ${passwordError ? 'border-red-500' : password ? 'border-green-500' : 'border-gray-300'} w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black`} required />
                            {passwordError && (<div className='h-5 md:h-10 text-white text-lg border border-2 bg-red-600 rounded-md border-red-500'>{passwordError}</div>)}
                        </div>

                        <button type='submit' className='p-2 bg-black text-gray-300  border border-gray-300 rounded-lg hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black'>Create account</button>

                        <div className='flex justify-center'>
                            <p className='text-lg text-gray-300 '>Already have an account?</p>
                            <Link to="/pages/Login"><p className='underline pl-2 hover:text-gray-300 cursor-pointer'>Log in</p></Link>
                        </div>

                        {successMessage && (
                            <div className="bg-green-500 text-white p-2 rounded">{successMessage}</div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePass