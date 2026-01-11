import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../schema/registerScheme";
import supabase from '../../../supaBaseClient';
import toast from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (userData) => {
    setLoading(true)
    setErrorMessage(null)
    try {

      const { email, firstname, lastname, password, role } = userData

      const payload = {
        email,
        password,
        options: {
          data: {
            first_name: firstname,
            lastname: lastname,
          },
          role:role
        },

      }

      const { data, error } = await supabase.auth.signUp(payload);
      if (error) {
        setErrorMessage(error.message)
        toast.error(error.message)
      } else {
        toast.success('Account created successfully! Please login.')
        setTimeout(() => navigate('/login'), 2000)
      }

    } catch (err) {
      console.log(err)
      toast.error("Registration failed")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='flex items-center justify-center h-screen bg-slate-300'>
      <form className='bg-white shadow-md rounded-2xl p-10' onSubmit={handleSubmit(onSubmit)}>
        <div className='font-bold flex justify-center text-blue-800 mb-6'>
          <h1>New User Registration:</h1>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 mb-1'>First Name:</label>
          <input
            className={`border rounded w-full py-2 px-3`}
            type="text"
            placeholder='Enter your first name'
            {...register("firstname")}
          />

          <p className="text-sm text-red-400">{errors.firstname?.message}</p>

        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 mb-1'>Last Name:</label>
          <input
            className={`border rounded w-full py-2 px-3 `}
            type="text"
            placeholder='Enter your last name'
            {...register("lastname")}
          />
          <p className="text-sm text-red-400">{errors.lastname?.message}</p>
        </div>

        <div className='mb-4'>

          <label className='block text-gray-700 mb-1'>Email:</label>
          <input
            className={`border rounded w-full py-2 px-3 `}
            type="email"
            placeholder='Enter your email'
            {...register("email")}
          />
          <p className="text-sm text-red-400">{errors.email?.message}</p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 mb-1'>Password:</label>
          <input
            className={`border rounded w-full py-2 px-3 `}
            type="password"
            placeholder='Enter your password'
            {...register("password")}
          />
          <p className="text-sm text-red-400">{errors.password?.message}</p>
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 mb-1'>Confirm Password:</label>
          <input
            className={`border rounded w-full py-2 px-3 `}
            type="password"
            placeholder='Confirm your password'
            {...register("confirmPassword")}
          />
          <p className="text-sm text-red-400">{errors.confirmPassword?.message}</p>
        </div>

        <div className='mb-4'>

          <label className='block text-gray-700 mb-1'>Role:</label>
          <select
            className={`border rounded w-full py-2 px-3 `}
            {...register("role")}
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-sm text-red-400">{errors.role?.message}</p>
        </div>

        <p className='text-sm text-red-800'>{errorMessage}</p>
        <button
          type="submit" disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-800 transition-colors disabled:bg-blue-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>Already have an account? 
            <Link to="/login" className='text-blue-600 hover:text-blue-800 font-semibold ml-1'>Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;