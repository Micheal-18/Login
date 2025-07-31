import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'


const Login = () => {

  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')
  const [click, setClick] = useState(false)

  const handleSetInputEmail = (e) => {
    const value = e.target.value;
    setInputEmail(value)
  }

  const handleSetInputPasswords = (e) => {
    const value = e.target.value;
    setInputPassword(value)
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'))

    if (savedUser) {
      console.log('savedUser.email, savedUser.password');
    }
  }, [])

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedUser) {

      if ((savedUser.email === inputEmail) && (savedUser.password === inputPassword)) {
        setSuccessMessage("Welcome")
        setTimeout(() => navigate("/Home"), 1000);
      } else {
        setErrorMessage("Either Email or Password is not correct!")
      }
    }
  }

  const handleSetClick = () => {
    setClick(!click)
  }

  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='border border-gray-300 p-4 rounded-md w-90 md:w-100'>
        <h1 className='text-4xl text-center font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-2 flex flex-col text-lg'>
          <label htmlFor='Email'>Email:</label>
          <input onChange={handleSetInputEmail} id='email' type='text' placeholder='Email' className='p-2  w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black' required />
          <label htmlFor='Password'>Password:</label>
          <input onChange={handleSetInputPasswords} id='password' type={click ? "password" : "text"} placeholder='Input your password' className={`p-2  border border-gray-300 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black`} required />
          {click ? <FaEyeSlash onClick={handleSetClick} className='relative flex left-75  md:left-130 -top-10 active:border-1 active:border-white active:rounded-full' /> : <FaEye onClick={handleSetClick} className='relative flex left-75  md:left-130 -top-10 active:border-1 active:border-white active:rounded-full' />}
          <div className='flex gap-2'>
            <input type='checkbox'/>
            <p className='text-sm md:text-lg'>Remember Me</p>
          </div>
          <button type='submit' className='p-2 bg-black text-gray-300  border border-gray-300 rounded-lg hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black'>Login</button>

          <div className='flex justify-between'>
            <p className='text-sm md:text-lg text-center text-gray-300'>Don't have an account?</p>
            <Link to="/"><p className='underline text-sm md:text-lg hover:text-gray-300'>Sign up</p></Link>
          </div>
        </form>

        {successMessage && (
          <div className="bg-green-500 text-white p-2 rounded">{successMessage}</div>
        )}

        {ErrorMessage && (
          <div className="bg-red-500 text-white p-2 rounded">{ErrorMessage}</div>
        )}
      </div>
    </div>
  )
}


export default Login