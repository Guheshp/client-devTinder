import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Base_URL } from '../../utils/helper/constant';


const ResetPassword = () => {
    const { token } = useParams(); // Get the token from the <URL>cons</URL>
    console.log('token', token)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // --- VALIDATION SCHEMA ---
    const resetPasswordSchema = yup.object({
        password: yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/[0-9]/, "Must contain at least one number"),
        confirmPassword: yup.string()
            .required("Confirm Password is required")
            .oneOf([yup.ref('password')], "Passwords must match")
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Call your backend API
            // Assuming endpoint is: /password/reset/:token
            await axios.post(`${Base_URL}/reset-password/${token}`,
                { password: data.password },
                { withCredentials: true }
            );

            toast.success("Password reset successful! Please login.");
            navigate("/login");

        } catch (error) {
            console.error("Reset Error:", error);
            toast.error(
                error?.response?.data?.message || "Failed to reset password. Link might be expired."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                <div className="card-body">

                    <div className="text-center mb-4">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                            <FaLock className="text-3xl text-primary" />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-800'>Set New Password</h2>
                        <p className="text-sm text-gray-500">
                            Your new password must be different from previously used passwords.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* New Password */}
                        <label className="form-control w-full relative">
                            <div className="label pb-1">
                                <span className="label-text font-medium">New Password</span>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-error text-xs mt-1">{errors.password.message}</span>
                            )}
                        </label>

                        {/* Confirm Password */}
                        <label className="form-control w-full mt-3">
                            <div className="label pb-1">
                                <span className="label-text font-medium">Confirm Password</span>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <span className="text-error text-xs mt-1">{errors.confirmPassword.message}</span>
                            )}
                        </label>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className='btn btn-primary w-full text-white'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <CgSpinner className="animate-spin text-xl" /> Resetting...
                                    </span>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;