import { useEffect, useState } from "react"
import axios from "axios"
import { Base_URL, skillList } from "../utils/helper/constant"

const SuggestedSkills = () => {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        const fetchSuggestedSkills = async () => {
            try {
                const res = await axios.get(
                    `${Base_URL}/user/suggested-skills`,
                    { withCredentials: true }
                )

                setSkills(res?.data?.data || [])
            } catch (error) {
                console.error('Suggested skills error:', error)
                setSkills([])
            }
        }

        fetchSuggestedSkills()
    }, [])


    const getSkillName = id =>
        skillList.find(s => s.id === id)?.name || id

    if (skills.length === 0) return null

    return (
        <div className="bg-base-300 p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
                Suggested Skills
            </h3>

            <ul className="text-sm space-y-1">
                {skills.map(skill => (
                    <li key={skill}>• {getSkillName(skill)}</li>
                ))}
            </ul>
        </div>
    )
}

export default SuggestedSkills
