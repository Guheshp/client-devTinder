import { useEffect, useState } from "react"
import axios from "axios"
import { BsLightbulb } from "react-icons/bs"
import { Base_URL } from "../utils/helper/constant" // Removed skillList import

const SuggestedSkills = () => {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        const fetchSuggestedSkills = async () => {
            try {
                const res = await axios.get(
                    `${Base_URL}/user/suggested-skills`,
                    { withCredentials: true }
                )
                // Ensure we access the data array correctly
                setSkills(res?.data?.data || [])
            } catch (error) {
                console.error('Suggested skills error:', error)
                setSkills([])
            }
        }
        fetchSuggestedSkills()
    }, [])

    if (skills.length === 0) return null

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-5">
                <h3 className="card-title text-base font-bold flex items-center gap-2">
                    <BsLightbulb className="text-yellow-400" />
                    Recommended Skills
                </h3>

                <p className="text-xs text-gray-500 mb-2">
                    Add these to boost your profile visibility.
                </p>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span
                            // Use skill.id for the unique key
                            key={skill.id}
                            className="badge badge-ghost badge-sm border-gray-300 py-3 cursor-pointer hover:bg-base-200"
                        >
                            {/* Use skill.name directly from the backend object */}
                            + {skill.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestedSkills