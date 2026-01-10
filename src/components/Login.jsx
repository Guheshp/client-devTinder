import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/redux/slices/userSlice';
import { Base_URL } from '../utils/helper/constant';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthForm from './auth/AuthForm';
import ForgotPasswordModal from './auth/ForgotPasswordModal';


const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // --- 1. VALIDATION SCHEMA ---
    const validationSchema = useMemo(() => yup.object({
        emailId: yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        password: yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
        firstName: !isLoginMode
            ? yup.string().required("First Name is required").min(2, "Min 2 chars")
            : yup.string().optional(),
        lastName: yup.string().optional(),
    }), [isLoginMode]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // --- 2. HANDLERS ---
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleFormMode = () => {
        setIsLoginMode(!isLoginMode);
        reset();
    };

    const openForgotModal = () => setIsForgotModalOpen(true);
    const closeForgotModal = () => setIsForgotModalOpen(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { emailId, password, firstName, lastName } = data;

        try {
            if (isLoginMode) {
                const res = await axios.post(Base_URL + `/login`,
                    { emailId, password },
                    { withCredentials: true }
                );
                const userData = res?.data?.data;
                dispatch(addUser(userData));
                navigate("/feed");
                toast.success("Login Successful!");
            } else {
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
            toast.error(error?.response?.data?.message || 'Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center px-4'>
            <div className="card bg-base-100 w-full max-w-sm shadow-2xl">

                {/* Form Component */}
                <AuthForm
                    isLoginMode={isLoginMode}
                    register={register}
                    errors={errors}
                    isLoading={isLoading}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    toggleFormMode={toggleFormMode}
                    openForgotModal={openForgotModal}
                    onSubmit={handleSubmit(onSubmit)}
                />

                {/* Modal Component */}
                <ForgotPasswordModal
                    isOpen={isForgotModalOpen}
                    onClose={closeForgotModal}
                />
            </div>
        </div>
    );
}

export default Login;