import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { CgSpinner } from "react-icons/cg";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaCamera, FaCloudUploadAlt } from 'react-icons/fa'

import UserCard from './UserCard'
import { Base_URL, skillList, genderList, stateList } from '../utils/helper/constant'
import { addUser } from '../utils/redux/slices/userSlice'
import InputField from '../utils/form/InputField'
import SelectField from '../utils/form/SelectField'
import MultiSelectChipField from '../utils/form/MultiSelectChipField'

/* ------------------ Yup Schema ------------------ */
const profileSchema = yup.object({
    firstName: yup.string()
        .required('First name is required')
        .min(2, 'Min 2 characters')
        .max(50, 'Max 50 characters')
        .matches(/^[A-Za-z]+$/, 'Letters only'),

    lastName: yup.string().nullable().matches(/^[A-Za-z]*$/, 'Letters only'),
    photo: yup.mixed().nullable(), // Allow File or String
    age: yup.number().nullable().min(18).max(100).transform((v, o) => (o === '' ? null : v)),
    gender: yup.string().nullable(),
    experienceLevel: yup.string().nullable(),
    bio: yup.string().required('Bio is required').max(500, 'Max 500 chars'),
    skills: yup.array().of(yup.string()).nullable(),
    state: yup.string().required("State is required"),
    country: yup.string().nullable(),
    githubUrl: yup.string().nullable().url('Invalid URL'),
    linkedinUrl: yup.string().nullable().url('Invalid URL'),
    twitterUrl: yup.string().nullable().url('Invalid URL'),
    portfolioUrl: yup.string().nullable().url('Invalid URL'),
});

const ProfilePage = () => {
    const dispatch = useDispatch()
    const userFromStore = useSelector(state => state.user.user)
    const [isLoading, setIsLoading] = useState(false)
    const [photoPreview, setPhotoPreview] = useState(null)

    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            firstName: '', lastName: '', age: null, country: 'India', gender: '',
            photo: null, bio: '', experienceLevel: 'fresher', skills: [], state: '',
            emailId: '', githubUrl: '', linkedinUrl: '', twitterUrl: '', portfolioUrl: ''
        },
        mode: "onChange"
    })

    const formValues = watch();

    // Construct preview user object (Use local preview if available, else store photo)
    const previewUser = {
        ...userFromStore,
        ...formValues,
        photo: photoPreview || userFromStore?.photo
    };

    useEffect(() => {
        if (userFromStore) {
            reset({
                firstName: userFromStore.firstName || '',
                lastName: userFromStore.lastName || '',
                age: userFromStore.age || null,
                gender: userFromStore.gender || '',
                // Note: We don't set 'photo' to the URL string here because 
                // the file input expects a File object. We handle existing photo via preview.
                photo: null,
                bio: userFromStore.bio || '',
                experienceLevel: userFromStore.experienceLevel || 'fresher',
                skills: userFromStore.skills || [],
                state: userFromStore.location?.state || '',
                country: 'India',
                emailId: userFromStore.emailId || '',
                githubUrl: userFromStore.githubUrl || '',
                linkedinUrl: userFromStore.linkedinUrl || '',
                twitterUrl: userFromStore.twitterUrl || '',
                portfolioUrl: userFromStore.portfolioUrl || '',
                uniqueId: userFromStore.uniqueId || '',
            })
            setPhotoPreview(userFromStore.photo || null);
        }
    }, [userFromStore, reset])

    // --- 1. Handle Image Selection ---
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB allowed");
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return toast.error("Invalid image format");

            // 1. Show Preview
            setPhotoPreview(URL.createObjectURL(file));

            // 2. Set Value in Form (Important!)
            setValue('photo', file, { shouldDirty: true, shouldValidate: true });
        }
    };

    // --- 2. Submit Logic ---
    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const formData = new FormData();

            // Append Simple Fields
            formData.append('firstName', data.firstName);
            if (data.lastName) formData.append('lastName', data.lastName);
            if (data.age) formData.append('age', data.age);
            if (data.gender) formData.append('gender', data.gender);
            formData.append('bio', data.bio);
            if (data.experienceLevel) formData.append('experienceLevel', data.experienceLevel);

            // Append Arrays/Objects (Stringified)
            formData.append('skills', JSON.stringify(data.skills || []));
            formData.append('location', JSON.stringify({
                state: data.state,
                country: data.country
            }));

            // Append Socials
            if (data.githubUrl) formData.append('githubUrl', data.githubUrl);
            if (data.linkedinUrl) formData.append('linkedinUrl', data.linkedinUrl);
            if (data.twitterUrl) formData.append('twitterUrl', data.twitterUrl);
            if (data.portfolioUrl) formData.append('portfolioUrl', data.portfolioUrl);

            // --- PHOTO LOGIC (The Fix) ---
            // Because we used setValue('photo', file), data.photo IS the file object.
            if (data.photo instanceof File) {
                formData.append('photo', data.photo);
            }
            // Optional: If you implement a "Remove Photo" button, you would check 
            // if photoPreview is null but userFromStore.photo exists, then append "null".

            // Debugging
            // for (let [key, value] of formData.entries()) { console.log(`${key}:`, value); }

            const res = await axios.post(`${Base_URL}/profile/edit`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            dispatch(addUser(res.data.data));
            toast.success('Profile updated successfully');

        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pb-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* Left Side: Form */}
                <div className="card bg-base-100 w-full lg:flex-1 shadow-xl rounded-box">
                    <div className="card-body">
                        <div className='border-b pb-4 mb-6'>
                            <h2 className="text-2xl font-bold text-primary">Edit Profile</h2>
                            <p className="text-sm text-gray-500">Update your details below.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                            {/* --- Image Upload --- */}
                            <div className="flex flex-col items-center justify-center p-6 bg-base-200/50 rounded-xl border border-dashed border-base-300">
                                <div className="avatar mb-4 relative group">
                                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-100">
                                        {photoPreview ? (
                                            <img src={photoPreview} alt="Preview" className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                <FaCamera size={30} />
                                            </div>
                                        )}
                                    </div>
                                    <label htmlFor="photo-upload" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                                        <FaCamera className="text-white" />
                                    </label>
                                </div>

                                <div className="text-center">
                                    <input
                                        type="file"
                                        id="photo-upload"
                                        accept="image/png, image/jpeg, image/webp"
                                        className="hidden"
                                        onChange={handleImageChange} // Controlled manually
                                    />
                                    <label htmlFor="photo-upload" className="btn btn-sm btn-outline gap-2">
                                        <FaCloudUploadAlt /> Upload New Photo
                                    </label>
                                    <p className="text-xs text-gray-400 mt-2">Max 5MB (JPG, PNG)</p>
                                </div>
                            </div>

                            <div className="divider my-0"></div>

                            {/* Personal Details */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField label="DevTinder ID" name="uniqueId" register={register} disabled className="bg-gray-100 cursor-not-allowed text-gray-500" />
                                    <InputField label="Email" name="emailId" register={register} disabled className="bg-gray-100 cursor-not-allowed text-gray-500" />
                                    <InputField label="First Name" name="firstName" register={register} required error={errors.firstName} />
                                    <InputField label="Last Name" name="lastName" register={register} error={errors.lastName} />
                                    <InputField label="Age" name="age" type="number" register={register} error={errors.age} />
                                    <SelectField label="Gender" name="gender" register={register} options={genderList} error={errors.gender} />
                                    <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                                        <SelectField label="State" name="state" register={register} required options={stateList} error={errors.state} />
                                        <InputField label="Country" name="country" required register={register} disabled className="bg-gray-100 cursor-not-allowed text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Professional Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <SelectField label="Experience Level" name="experienceLevel" register={register} options={[{ id: 'fresher', name: 'Fresher' }, { id: 'junior', name: 'Junior' }, { id: 'mid', name: 'Mid-Level' }, { id: 'senior', name: 'Senior' }]} error={errors.experienceLevel} />

                                    <MultiSelectChipField label="Skills" name="skills" control={control} options={skillList} error={errors.skills} />
                                    <div className="md:col-span-2">
                                        <InputField label="Bio" name="bio" required register={register} textarea error={errors.bio} placeholder="Tell us about yourself..." />
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-0"></div>

                            {/* Social Links */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Social Presence</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1"><span className="label-text flex items-center gap-2"><FaGithub /> GitHub URL</span></label>
                                        <InputField name="githubUrl" register={register} placeholder="https://github.com/..." error={errors.githubUrl} />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1"><span className="label-text flex items-center gap-2"><FaLinkedin className="text-blue-600" /> LinkedIn URL</span></label>
                                        <InputField name="linkedinUrl" register={register} placeholder="https://linkedin.com/..." error={errors.linkedinUrl} />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1"><span className="label-text flex items-center gap-2"><FaTwitter className="text-blue-400" /> Twitter URL</span></label>
                                        <InputField name="twitterUrl" register={register} placeholder="https://twitter.com/..." error={errors.twitterUrl} />
                                    </div>
                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1"><span className="label-text flex items-center gap-2"><FaGlobe className="text-green-500" /> Portfolio URL</span></label>
                                        <InputField name="portfolioUrl" register={register} placeholder="https://myportfolio.com" error={errors.portfolioUrl} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary w-full text-white font-bold" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="flex items-center gap-2"><CgSpinner className="animate-spin text-xl" /> Saving...</span>
                                    ) : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Preview */}
                <div className="w-full lg:w-96 sticky top-28 h-fit">
                    <div className="alert alert-info shadow-sm mb-4 text-sm flex items-center gap-2">
                        <span className="loading loading-dots loading-xs"></span>
                        <span className="font-semibold">Live Preview</span>
                    </div>
                    <UserCard user={previewUser} />
                </div>

            </div>
        </div>
    )
}

export default ProfilePage