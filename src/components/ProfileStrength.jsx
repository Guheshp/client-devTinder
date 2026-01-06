import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BsTrophy } from "react-icons/bs"

const ProfileStrength = () => {
    const user = useSelector(state => state.user.user)

    if (!user) return null

    // Calculate color based on percentage
    const progressColor = (user.profileCompletion || 0) < 50 ? 'progress-error' :
        (user.profileCompletion || 0) < 80 ? 'progress-warning' : 'progress-success';

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-5">
                <h3 className="card-title text-base font-bold flex items-center gap-2">
                    <BsTrophy className="text-yellow-500" />
                    Profile Strength
                </h3>

                <div className="mt-3">
                    <div className="flex justify-between text-xs font-semibold mb-1 text-gray-500">
                        <span>Completion</span>
                        <span>{user.profileCompletion || 0}%</span>
                    </div>

                    {/* DaisyUI Progress Bar */}
                    <progress
                        className={`progress ${progressColor} w-full h-2.5`}
                        value={user.profileCompletion || 0}
                        max="100"
                    ></progress>
                </div>

                {!user.isProfileComplete && (
                    <div className="card-actions mt-4">
                        <Link
                            to="/profile"
                            className="btn btn-outline btn-sm btn-primary w-full"
                        >
                            Complete Profile
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileStrength