import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { CgSpinner } from "react-icons/cg";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa'

import UserCard from './UserCard'
import { Base_URL, skillList, genderList, stateList } from '../utils/helper/constant'
import { addUser } from '../utils/redux/slices/userSlice'
import InputField from '../utils/form/InputField'
import SelectField from '../utils/form/SelectField'
import MultiSelectChipField from '../utils/form/MultiSelectChipField'
import { BsInfoCircle } from 'react-icons/bs'

/* ------------------ Yup Schema ------------------ */
const profileSchema = yup.object({
    firstName: yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name is too long')
        .matches(/^[A-Za-z]+$/, 'First name must only contain letters'),

    lastName: yup.string()
        .nullable()
        .transform((v, o) => (o === '' ? null : v))
        .matches(/^[A-Za-z]*$/, 'Last name must only contain letters'),

    photo: yup.string()
        .nullable()
        .transform((v, o) => (o === '' ? null : v)),

    age: yup.number()
        .nullable()
        .min(18, 'Age must be at least 18')
        .max(100, 'Invalid age')
        .transform((v, o) => (o === '' || o === null ? null : v)),

    gender: yup.string().nullable(),
    experienceLevel: yup.string().nullable(),
    bio: yup.string().required('Bio is required').max(500, 'Bio is too long'),
    skills: yup.array().of(yup.string()).nullable(),
    state: yup.string().nullable(),
    country: yup.string().nullable(),

    // --- Social Validations ---
    // transform ensures empty string becomes null
    githubUrl: yup.string().nullable().url('Invalid URL').transform((v, o) => (o === '' ? null : v)),
    linkedinUrl: yup.string().nullable().url('Invalid URL').transform((v, o) => (o === '' ? null : v)),
    twitterUrl: yup.string().nullable().url('Invalid URL').transform((v, o) => (o === '' ? null : v)),
    portfolioUrl: yup.string().nullable().url('Invalid URL').transform((v, o) => (o === '' ? null : v)),
});

const ProfilePage = () => {
    const dispatch = useDispatch()
    const userFromStore = useSelector(state => state.user.user)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            age: null,
            country: 'India',
            gender: '',
            photo: '',
            bio: '',
            experienceLevel: 'fresher',
            skills: [],
            state: '',
            emailId: '',
            // Social defaults
            githubUrl: '',
            linkedinUrl: '',
            twitterUrl: '',
            portfolioUrl: ''
        },
        mode: "onChange"
    })

    const formValues = watch();

    const previewUser = {
        ...userFromStore,
        ...formValues,
    };

    useEffect(() => {
        if (userFromStore) {
            reset({
                firstName: userFromStore.firstName || '',
                lastName: userFromStore.lastName || '',
                age: userFromStore.age || null,
                gender: userFromStore.gender || '',
                photo: userFromStore.photo || '',
                bio: userFromStore.bio || '',
                experienceLevel: userFromStore.experienceLevel || 'fresher',
                skills: userFromStore.skills || [],
                state: userFromStore.location?.state || '',
                country: 'India',
                emailId: userFromStore.emailId || '',
                githubUrl: userFromStore.githubUrl || '',
                linkedinUrl: userFromStore.linkedinUrl || '',
                twitterUrl: userFromStore.twitterUrl || '',
                portfolioUrl: userFromStore.portfolioUrl || ''
            })
        }
    }, [userFromStore, reset])

    const onSubmit = async (data) => {
        setIsLoading(true);

        // 🛑 FIXED: Do not use `|| undefined` for optional fields.
        // We want to send `null` or `""` if the user cleared the field.
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName, // Sends null if empty
            age: data.age,
            gender: data.gender,
            bio: data.bio,
            experienceLevel: data.experienceLevel,
            skills: data.skills,
            location: {
                state: data.state,
                country: data.country
            },
            photo: data.photo,

            // ✅ Send data.githubUrl directly. 
            // If empty, Yup transforms it to null. Axios sends { "githubUrl": null }.
            // The backend receives null and removes the field.
            githubUrl: data.githubUrl,
            linkedinUrl: data.linkedinUrl,
            twitterUrl: data.twitterUrl,
            portfolioUrl: data.portfolioUrl
        }

        try {
            const res = await axios.post(`${Base_URL}/profile/edit`, payload, { withCredentials: true })
            dispatch(addUser(res.data.data))
            toast.success('Profile updated successfully')
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Update failed')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 pb-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

                {/* --- Left Side: Form --- */}
                <div className="card bg-base-100 w-full lg:flex-1 shadow-xl rounded-box">
                    <div className="card-body">
                        <div className='border-b pb-4 mb-6'>
                            <h2 className="text-2xl font-bold text-primary">Edit Profile</h2>
                            <p className="text-sm text-gray-500">Update your details below.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                            {/* Personal Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InputField
                                        label="First Name"
                                        name="firstName"
                                        register={register}
                                        required
                                        error={errors.firstName}
                                    />
                                    <InputField
                                        label="Last Name"
                                        name="lastName"
                                        register={register}
                                        error={errors.lastName}
                                    />

                                    <InputField label="Email" name="emailId" register={register} disabled className="bg-gray-100 cursor-not-allowed text-gray-500" />
                                    <InputField label="Age" name="age" type="number" register={register} error={errors.age} />

                                    <SelectField label="Gender" name="gender" register={register} options={genderList} error={errors.gender} />

                                    <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                                        <SelectField label="State" name="state" register={register} options={stateList} error={errors.state} />
                                        <InputField label="Country" name="country" register={register} disabled className="bg-gray-100 cursor-not-allowed text-gray-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-0"></div>

                            {/* Professional Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Professional Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="md:col-span-2">
                                        <InputField
                                            label="Photo URL"
                                            name="photo"
                                            register={register}
                                            placeholder="Paste image address here..."
                                            error={errors.photo}
                                        />
                                        <label className="label">
                                            <span className="label-text-alt text-gray-400">
                                                Paste a direct link to an image (jpg, png)
                                            </span>
                                        </label>
                                    </div>

                                    <div className="md:col-span-2">
                                        <SelectField
                                            label="Experience Level"
                                            name="experienceLevel"
                                            register={register}
                                            options={[
                                                { id: 'fresher', name: 'Fresher' },
                                                { id: 'junior', name: 'Junior' },
                                                { id: 'mid', name: 'Mid-Level' },
                                                { id: 'senior', name: 'Senior' }
                                            ]}
                                            error={errors.experienceLevel}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <MultiSelectChipField label="Skills" name="skills" control={control} options={skillList} error={errors.skills} />
                                    </div>
                                    <div className="md:col-span-2">

                                        <InputField
                                            label="Bio"
                                            name="bio"
                                            required
                                            register={register}
                                            textarea
                                            error={errors.bio}
                                            placeholder="Tell us about yourself..."
                                        />
                                        <label className="label"><span className="label-text-alt text-gray-400">Enter your bio here will be displayed on your profile card to other users.</span></label>
                                    </div>

                                </div>
                            </div>

                            <div className="divider my-0"></div>

                            {/* --- Social Links --- */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Social Presence</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1">
                                            <span className="label-text flex items-center gap-2"><FaGithub /> GitHub URL</span>
                                        </label>
                                        <InputField
                                            name="githubUrl"
                                            register={register}
                                            placeholder="https://github.com/..."
                                            error={errors.githubUrl}
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1">
                                            <span className="label-text flex items-center gap-2"><FaLinkedin className="text-blue-600" /> LinkedIn URL</span>
                                        </label>
                                        <InputField
                                            name="linkedinUrl"
                                            register={register}
                                            placeholder="https://linkedin.com/..."
                                            error={errors.linkedinUrl}
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1">
                                            <span className="label-text flex items-center gap-2"><FaTwitter className="text-blue-400" /> Twitter URL</span>
                                        </label>
                                        <InputField
                                            name="twitterUrl"
                                            register={register}
                                            placeholder="https://twitter.com/..."
                                            error={errors.twitterUrl}
                                        />
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label font-medium pb-1">
                                            <span className="label-text flex items-center gap-2"><FaGlobe className="text-green-500" /> Portfolio URL</span>
                                        </label>
                                        <InputField
                                            name="portfolioUrl"
                                            register={register}
                                            placeholder="https://myportfolio.com"
                                            error={errors.portfolioUrl}
                                        />
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

                {/* --- Right Side: Preview --- */}
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