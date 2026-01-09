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
        <div className="card w-full bg-base-100 shadow-md border border-base-200">
            <div className="card-body p-4">
                <h3 className="card-title text-sm font-bold flex items-center gap-2 text-gray-800">
                    <BsLightbulb className="text-yellow-500" />
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
                            className="badge badge-ghost badge-sm text-xs font-medium border-gray-300 py-3 px-3 cursor-pointer hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
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