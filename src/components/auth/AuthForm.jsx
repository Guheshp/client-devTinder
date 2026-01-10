import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

const AuthForm = ({
    isLoginMode,
    register,
    errors,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    toggleFormMode,
    openForgotModal,
    onSubmit // This is the handleSubmit(fn) passed from parent
}) => {
    return (
        <div className="card-body">
            <h2 className='text-3xl font-bold text-center mb-6 text-primary'>
                {isLoginMode ? "Welcome Back" : "Create Account"}
            </h2>

            <form onSubmit={onSubmit} noValidate>

                {/* Signup Specific Fields */}
                {!isLoginMode && (
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
                {isLoginMode && (
                    <div className="text-right mt-1">
                        <button
                            type="button"
                            onClick={openForgotModal}
                            className='label-text text-xs hover:text-primary link link-hover'
                        >
                            Forgot Password?
                        </button>
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
                            isLoginMode ? "Login" : "Sign Up"
                        )}
                    </button>
                </div>
            </form>

            {/* Toggle Login/Signup */}
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    {isLoginMode ? "New here? " : "Already have an account? "}
                    <span
                        role='button'
                        className='text-primary font-medium hover:underline cursor-pointer'
                        onClick={toggleFormMode}
                    >
                        {isLoginMode ? "Sign up now" : "Login here"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;