import React from 'react'
import { loginimg } from '../Script/Images'
import { Link, useNavigate } from 'react-router'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginSchema } from '../schema/Schema'
import supabase from '../../supaBaseClient'
import { useDispatch } from 'react-redux'
import { loginData } from '@/redux/userSlice'
import toast from 'react-hot-toast'


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    const onSubmit = async (userData) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword(userData);
            if (error) {
                console.log(error, "Error")
                toast.error(error.message || "Login failed")
            } else {
                dispatch(loginData(data.user))
                toast.success("Login successful!")
                navigate("/dashboard")
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred during login")
        }
    };


    return (
        <div className='flex items-center justify-center h-screen bg-secondary '>

            <div className='flex shadow-2xl bg-secondary-hover rounded-2xl p-10'>

                <div className='w-[50%] flex items-center'>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="username">Email: </label>
                        <div className='bg-white rounded-md'>
                            <input {...register("email")} type="text" placeholder='Enter your email' />
                        </div>
                        <p className="text-xs text-red-400">{errors.email?.message}</p><br />

                        <label htmlFor="password">Password: </label>
                        <div className='bg-white rounded-md'>
                            <input type="password" placeholder='Enter your password'{...register("password")} />
                        </div>
                        <p className="text-xs text-red-400">{errors.password?.message}</p><br />

                        <div className='bg-blue-600 text-white w-16 p-1 rounded-lg hover:bg-blue-800'>
                            <button type='submit'>Submit</button>
                        </div><br /><br />

                        <div className='flex items-center    '>
                            <p className='text-primary text-xs'>Already Have an Account?</p>
                            <Link to="/register" className='text-green-800'>Register Now</Link>
                        </div>
                    </form>

                </div>

                <div className='w-[50%] rounded-2xl'>
                    <img src={loginimg} alt="Login Img"
                        width={850}
                    />
                </div>

            </div>

        </div>
    )
}

export default Login