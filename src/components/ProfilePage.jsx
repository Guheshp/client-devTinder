import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

import UserCard from './UserCard'
import { Base_URL, skillList, genderList, stateList } from '../utils/helper/constant'
import { addUser } from '../utils/redux/slices/userSlice'
import InputField from '../utils/form/InputField'
import SelectField from '../utils/form/SelectField'
import MultiSelectChipField from '../utils/form/MultiSelectChipField'

/* ------------------ Yup Schema (FLAT) ------------------ */
const profileSchema = yup.object({
    /* ---------- REQUIRED ---------- */
    firstName: yup
        .string()
        .min(2, 'First name must be at least 2 characters')
        .required('First name is required'),

    /* ---------- OPTIONAL ---------- */
    lastName: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable(),

    photo: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable()
        .url('Photo must be a valid URL'),

    age: yup
        .number()
        .transform((v, o) => (o === '' || o === null ? null : v))
        .nullable()
        .min(18, 'Age must be at least 18')
        .max(60, 'Age must be below 60'),

    gender: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable(),

    experienceLevel: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable(),

    bio: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable()
        .max(3000, 'Bio is too long'),

    skills: yup
        .array()
        .of(yup.string())
        .nullable(),

    state: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable(),

    country: yup
        .string()
        .transform((v, o) => (o === '' ? null : v))
        .nullable()
})


const ProfilePage = () => {
    const dispatch = useDispatch()
    const userFromStore = useSelector(state => state.user.user)

    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(profileSchema)
    })

    /* 🔥 Sync Redux → Form */
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
                emailId: userFromStore.emailId || '' // ✅ ADD THIS


            })
        }
    }, [userFromStore, reset])

    /* Toast validation errors */
    useEffect(() => {
        Object.values(errors).forEach(err => toast.error(err.message))
    }, [errors])

    /* ------------------ Submit ------------------ */
    const onSubmit = async (data) => {
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName || undefined,
            age: data.age ?? undefined,
            gender: data.gender,
            bio: data.bio,
            experienceLevel: data.experienceLevel,
            skills: data.skills,
            location: {
                state: data.state,
                country: data.country
            },
            photo: data.photo || null // ✅ IMPORTANT FIX
        }


        // ✅ IMPORTANT: only send photo if user entered it
        if (data.photo) {
            payload.photo = data.photo
        }

        try {
            const res = await axios.post(
                `${Base_URL}/profile/edit`,
                payload,
                { withCredentials: true }
            )

            dispatch(addUser(res.data.data))
            toast.success('Profile updated successfully')
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Update failed')
        }
    }


    return (
        <div className="flex justify-center my-8 gap-10">
            <div className="card bg-base-300 w-full max-w-3xl shadow-xl">
                <h1 className="text-xl font-medium text-center mt-4">
                    Edit Profile
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <InputField
                        label="Email"
                        name="emailId"
                        register={register}
                        disabled
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <InputField label="First Name" name="firstName" register={register} required />
                        <InputField label="Last Name" name="lastName" register={register} />
                        <InputField label="Photo URL" name="photo" register={register} />
                        <InputField label="Age" name="age" register={register} />

                        <SelectField label="Gender" name="gender" register={register} options={genderList} />
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
                        />

                        <InputField label="Bio" name="bio" register={register} />
                        <MultiSelectChipField label="Skills" name="skills" control={control} options={skillList} />

                        <SelectField label="State" name="state" register={register} options={stateList} />
                        <InputField label="Country" name="country" register={register} disabled />
                    </div>

                    <button className="btn btn-primary w-full mt-4">
                        Save Profile
                    </button>
                </form>
            </div>

            <UserCard user={{ ...watch(), _id: userFromStore?._id }} />
        </div>
    )
}

export default ProfilePage
