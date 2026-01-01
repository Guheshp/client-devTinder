import React, { useEffect } from 'react'
import axios from "axios"
import { Base_URL, DEFAULT_IMG, skillList } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/redux/slices/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch = useDispatch()
    const connectionData = useSelector(
        store => store.connection.connectection
    )

    /* ---------- Helpers ---------- */
    const capitalize = (str = '') => {
        if (typeof str !== 'string' || str.length === 0) return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const getSkillNamesFromIds = (skillIds = []) => {
        if (!Array.isArray(skillIds)) return []

        const skillMap = new Map(
            skillList.map(skill => [skill.id, skill.name])
        )

        return skillIds
            .map(id => skillMap.get(id))
            .filter(Boolean)
    }

    /* ---------- API ---------- */
    const fetchConnection = async () => {
        try {
            const res = await axios.get(
                `${Base_URL}/connections`,
                { withCredentials: true }
            )

            dispatch(addConnection(res.data.data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchConnection()
    }, [])

    /* ---------- Empty states ---------- */
    if (!connectionData) return null

    if (connectionData.length === 0) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">No Connections Found</h1>
                <p className="text-gray-600 mt-2">
                    You will receive connections when someone accepts your request.
                </p>
                <Link to="/feed" className="btn mt-6">
                    Go to Feed
                </Link>
            </div>
        )
    }

    /* ---------- UI ---------- */
    return (
        <div className="min-h-screen">
            <div className="flex justify-center mt-12">
                <h1 className="text-2xl font-semibold">Connections</h1>
            </div>

            <div className="flex flex-col items-center mt-6">
                {connectionData.map(connection => {
                    const {
                        _id,
                        firstName,
                        lastName,
                        age,
                        gender,
                        skills,
                        photo,
                        experienceLevel,
                        location
                    } = connection

                    // ✅ FIX: skillNames per user
                    const skillNames = getSkillNamesFromIds(skills)

                    return (
                        <div
                            key={_id}
                            className="
                flex items-center justify-between
                w-full max-w-2xl
                p-4 m-3
                border rounded-xl shadow
              "
                        >
                            {/* Avatar */}
                            <img
                                src={photo || DEFAULT_IMG}
                                alt="user"
                                className="w-20 h-20 rounded object-cover"
                            />

                            {/* Info */}
                            <div className="flex-1 px-4">
                                <h3 className="font-semibold text-lg">
                                    {capitalize(firstName)} {capitalize(lastName)}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    {age ? `${age} yrs` : ''}
                                    {gender ? ` • ${capitalize(gender)}` : ''}
                                    {experienceLevel ? ` • ${capitalize(experienceLevel)}` : ''}
                                </p>

                                {location?.state && (
                                    <p className="text-sm text-gray-500">
                                        {capitalize(location.state)}, {location.country || 'India'}
                                    </p>
                                )}

                                {/* Skills */}
                                <p className="text-sm text-gray-600 mt-2">
                                    <span className="font-medium">Skills:</span>{' '}
                                    {skillNames.length > 0
                                        ? skillNames.join(', ')
                                        : 'Not specified'}
                                </p>

                            </div>

                            {/* Action */}
                            <Link to={`/chat/${_id}`}>
                                <button className="btn btn-sm">Chat</button>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections
