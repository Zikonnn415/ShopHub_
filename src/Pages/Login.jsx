import React, { useState } from 'react'
import { loginimg } from '../Script/Images'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginSchema } from '../schema/Schema'
import supabase from '../../supaBaseClient'
import { useDispatch } from 'react-redux'
import { loginData } from '@/redux/userSlice'
import toast from 'react-hot-toast'
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react'


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    
    const onSubmit = async (userData) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword(userData);
            if (error) {
                console.log(error, "Error")
                toast.error(error.message || "Login failed")
            } else {
                dispatch(loginData(data.user))
                toast.success("Login successful!")
                setTimeout(() => {
                navigate("/dashboard")
                }, 500);
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred during login")
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob'></div>
                <div className='absolute top-40 right-10 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000'></div>
                <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000'></div>
            </div>

            <div className='relative w-full max-w-6xl mx-4 animate-fade-in'>
                <div className='flex flex-col lg:flex-row shadow-2xl bg-white/85 backdrop-blur-lg rounded-3xl overflow-hidden border border-orange-100/60'>
                    
                    {/* Left side - Form */}
                    <div className='w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center'>
                        <div className='mb-8'>
                            <div className='flex items-center gap-2 mb-2'>
                                <div className='p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg'>
                                    <Sparkles className='w-6 h-6 text-white' />
                                </div>
                                <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent'>
                                    Welcome Back
                                </h1>
                            </div>
                            <p className='text-gray-600 text-sm sm:text-base'>Sign in to continue to your account</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                            {/* Email Field */}
                            <div className='space-y-2'>
                                <label htmlFor="email" className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                                    <Mail className='w-4 h-4' />
                                    Email Address
                                </label>
                                <div className='relative group'>
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                                        focusedField === 'email' ? 'text-orange-600' : 'text-gray-400'
                                    }`}>
                                        <Mail className='w-5 h-5' />
                                    </div>
                                    <input 
                                        {...register("email")} 
                                        type="email" 
                                        id="email"
                                        placeholder='Enter your email'
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                                            errors.email 
                                                ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                                                : focusedField === 'email'
                                                ? 'border-orange-500 bg-orange-50/40'
                                                : 'border-orange-100 bg-white/80 hover:border-orange-200'
                                        }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 flex items-center gap-1 animate-shake">
                                        <span>•</span> {errors.email?.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className='space-y-2'>
                                <label htmlFor="password" className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                                    <Lock className='w-4 h-4' />
                                    Password
                                </label>
                                <div className='relative group'>
                                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                                        focusedField === 'password' ? 'text-orange-600' : 'text-gray-400'
                                    }`}>
                                        <Lock className='w-5 h-5' />
                                    </div>
                                    <input 
                                        {...register("password")} 
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder='Enter your password'
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${
                                            errors.password 
                                                ? 'border-red-400 focus:border-red-500 bg-red-50/50' 
                                                : focusedField === 'password'
                                                ? 'border-orange-500 bg-orange-50/40'
                                                : 'border-orange-100 bg-white/80 hover:border-orange-200'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                                    >
                                        {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 flex items-center gap-1 animate-shake">
                                        <span>•</span> {errors.password?.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button 
                                type='submit' 
                                disabled={isLoading}
                                className='w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                            >
                                {isLoading ? (
                                    <>
                                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className='w-5 h-5' />
                                        <span>Sign In</span>
                                    </>
                                )}
                            </button>

                            {/* Register Link */}
                            <div className='text-center pt-4'>
                                <p className='text-sm text-gray-600'>
                                    Don't have an account?{' '}
                                    <Link 
                                        to="/register" 
                                        className='text-orange-600 font-semibold hover:text-amber-600 transition-colors duration-200 inline-flex items-center gap-1 hover:gap-2'
                                    >
                                        Register Now
                                        <span className='inline-block transition-transform duration-200 hover:translate-x-0.5'>→</span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right side - Image */}
                    <div className='hidden lg:block w-1/2 relative bg-gradient-to-br from-orange-500 to-amber-600 overflow-hidden'>
                        <div className='absolute inset-0 opacity-10'>
                            <div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]'></div>
                            <div className='absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.3),transparent_50%)]'></div>
                        </div>
                        <div className='relative h-full flex items-center justify-center p-12'>
                            <div className='relative animate-float'>
                                <img 
                                    src={loginimg} 
                                    alt="Login Illustration"
                                    className='w-full h-auto object-contain drop-shadow-2xl'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login