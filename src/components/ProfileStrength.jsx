import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ProfileStrength = () => {
    const user = useSelector(state => state.user.user)

    if (!user) return null

    return (
        <div className="bg-base-300 p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg">Profile Strength</h3>

            <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-3">
                    <div
                        className="bg-primary h-3 rounded-full"
                        style={{ width: `${user.profileCompletion || 0}%` }}
                    />
                </div>
                <p className="text-sm mt-2">
                    {user.profileCompletion || 0}% Complete
                </p>
            </div>

            {!user.isProfileComplete && (
                <Link
                    to="/profile"
                    className="btn btn-sm btn-outline mt-3 w-full"
                >
                    Improve Profile
                </Link>
            )}
        </div>
    )
}

export default ProfileStrength
