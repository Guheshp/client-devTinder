import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/redux/slices/userSlice';
import { Base_URL } from '../utils/helper/constant';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Import Resolver
import * as yup from "yup"; // Import Yup
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
    const [isLoginfrom, setLoginForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // --- YUP VALIDATION SCHEMA ---
    // We use useMemo so the schema updates when 'isLoginfrom' changes
    const validationSchema = useMemo(() => yup.object({
        emailId: yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        password: yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        // Conditional Validation: Only require firstName if NOT logging in
        firstName: !isLoginfrom
            ? yup.string().required("First Name is required").min(2, "Min 2 chars")
            : yup.string().optional(),
        lastName: yup.string().optional(),
    }), [isLoginfrom]);

    // Initialize React Hook Form with Yup Resolver
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleFormMode = () => {
        setLoginForm(!isLoginfrom);
        reset(); // Clear errors and inputs when switching modes
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { emailId, password, firstName, lastName } = data;

        try {
            if (isLoginfrom) {
                // --- LOGIN LOGIC ---
                console.log("login called base url", Base_URL);
                const res = await axios.post(Base_URL + `/login`,
                    { emailId, password },
                    { withCredentials: true }
                );
                const userData = res?.data?.data;
                dispatch(addUser(userData));
                navigate("/feed");
                toast.success("Login Successful!");
            } else {
                // --- SIGNUP LOGIC ---
                const res = await axios.post(Base_URL + "/signup",
                    { firstName, lastName, emailId, password },
                    { withCredentials: true }
                );
                dispatch(addUser(res?.data?.data));
                navigate("/profile");
                toast.success("Account Created Successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || 'Something went wrong, please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">
                    <h2 className='text-3xl font-bold text-center mb-6 text-primary'>
                        {isLoginfrom ? "Welcome Back" : "Create Account"}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* Signup Specific Fields */}
                        {!isLoginfrom && (
                            <div className="flex gap-2">
                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text">First Name <span className='text-red-500'>*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                                        {...register("firstName")}
                                    />
                                    {errors.firstName && <span className="text-error text-xs mt-1">{errors.firstName.message}</span>}
                                </label>

                                <label className="form-control w-full">
                                    <div className="label pb-1">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                                        {...register("lastName")}
                                    />
                                </label>
                            </div>
                        )}

                        {/* Email Field */}
                        <label className="form-control w-full mt-2">
                            <div className="label pb-1">
                                <span className="label-text">Email <span className='text-red-500'>*</span></span>
                            </div>
                            <input
                                type="email"
                                placeholder="youremail@example.com"
                                className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`}
                                {...register("emailId")}
                            />
                            {errors.emailId && <span className="text-error text-xs mt-1">{errors.emailId.message}</span>}
                        </label>

                        {/* Password Field */}
                        <label className="form-control w-full mt-2 relative">
                            <div className="label pb-1">
                                <span className="label-text">Password <span className='text-red-500'>*</span></span>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                        </label>

                        {/* Forgot Password Link */}
                        {isLoginfrom && (
                            <div className="text-right mt-1">
                                <Link to="#" className='label-text text-xs hover:text-primary link link-hover'>
                                    Forgot Password?
                                </Link>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className='btn btn-primary w-full text-white'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <CgSpinner className="animate-spin text-xl" /> Processing...
                                    </span>
                                ) : (
                                    isLoginfrom ? "Login" : "Sign Up"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Toggle Login/Signup */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            {isLoginfrom ? "New here? " : "Already have an account? "}
                            <span
                                role='button'
                                className='text-primary font-medium hover:underline cursor-pointer'
                                onClick={toggleFormMode}
                            >
                                {isLoginfrom ? "Sign up now" : "Login here"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;