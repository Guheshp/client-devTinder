import React, { useState } from 'react';
import axios from "axios";

import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CgSpinner } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { Base_URL } from '../../utils/helper/constant';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [isForgotLoading, setIsForgotLoading] = useState(false);

    // --- VALIDATION SCHEMA ---
    const forgotPasswordSchema = yup.object({
        forgotEmail: yup.string()
            .required("Email is required")
            .email("Please enter a valid email address")
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    });

    // Reset form when modal closes (optional, but good UX)
    React.useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen, reset]);

    const onForgotSubmit = async (data) => {
        setIsForgotLoading(true);
        try {
            await axios.post(Base_URL + "/forgot-password",
                { emailId: data.forgotEmail },
                { withCredentials: true }
            );
            toast.success("Reset link sent! Check your inbox.");
            onClose();
        } catch (error) {
            console.error("Forgot Password Error:", error);
            toast.error(error?.response?.data?.message || "Failed to send reset link.");
        } finally {
            setIsForgotLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                <button
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                    <IoClose size={20} />
                </button>

                <h3 className="font-bold text-lg mb-2">Reset Password</h3>
                <p className="py-2 text-sm text-gray-500">
                    Enter your registered email address. We'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit(onForgotSubmit)} className="mt-4">
                    <label className="form-control w-full">
                        <div className="label pb-1">
                            <span className="label-text">Email Address</span>
                        </div>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className={`input input-bordered w-full ${errors.forgotEmail ? 'input-error' : ''}`}
                            {...register("forgotEmail")}
                        />
                        {errors.forgotEmail && (
                            <span className="text-error text-xs mt-1">
                                {errors.forgotEmail.message}
                            </span>
                        )}
                    </label>

                    <div className="modal-action mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary text-white"
                            disabled={isForgotLoading}
                        >
                            {isForgotLoading ? (
                                <span className="flex items-center gap-2">
                                    <CgSpinner className="animate-spin" /> Sending...
                                </span>
                            ) : "Send Reset Link"}
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </div>
    );
};

export default ForgotPasswordModal;