import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BsTrophy, BsStars, BsShieldCheck, BsRocketTakeoff, BsGem, BsCheckCircleFill } from "react-icons/bs"

const ProfileStrength = () => {
    const user = useSelector(state => state.user.user)

    if (!user) return null

    const completion = user.profileCompletion || 0;
    const isPremium = user.isPremium || false;

    // ---------------- STATE: 100% COMPLETE ----------------
    if (completion === 100) {
        if (isPremium) {
            // CASE A: 100% + Premium (Reward View)
            return (
                <div className="card w-full bg-gradient-to-br from-primary/10 to-blue-50 shadow-md border border-primary/20">
                    <div className="card-body p-4">
                        <div className="flex justify-between items-start">
                            <h3 className="card-title text-sm font-bold flex items-center gap-2 text-primary">
                                <BsStars className="text-yellow-500 text-lg" />
                                All-Star Profile!
                            </h3>
                            <div className="badge badge-warning text-[10px] font-bold gap-1 uppercase tracking-wide">
                                <BsGem /> PREMIUM
                            </div>
                        </div>

                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                            Your profile is optimized. You have <span className="font-bold text-gray-800">3x visibility</span> & top ranking.
                        </p>

                        <div className="flex gap-2 mt-3 items-center bg-white p-2.5 rounded-lg border border-base-200 shadow-sm">
                            <div className="p-1.5 bg-green-100 rounded-full text-green-600 shrink-0">
                                <BsRocketTakeoff />
                            </div>
                            <div className="text-xs">
                                <span className="font-bold block text-gray-800">Boost Active</span>
                                <span className="text-gray-400 text-[10px]">Ranking #1 in search.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            // CASE B: 100% + Free Tier (Informational View - NO BUTTON)
            return (
                <div className="card w-full bg-base-100 shadow-md border border-base-200">
                    <div className="card-body p-4">
                        {/* Header */}
                        <h3 className="card-title text-sm font-bold flex items-center gap-2 text-gray-800">
                            <BsCheckCircleFill className="text-green-500" />
                            Profile Completed!
                        </h3>

                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                            Excellent work! You have filled out all your details.
                        </p>

                        {/* Passive Suggestion Box */}
                        <div className="mt-3 flex items-start gap-2 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                            <BsShieldCheck className="text-blue-500 text-lg shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-800 leading-snug">
                                <span className="font-bold">Want 3x speed?</span><br />
                                Upgrade to Premium to boost your visibility.
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    // ---------------- STATE: INCOMPLETE (Progress Bar) ----------------
    const progressColor = completion < 50 ? 'progress-error' : 'progress-warning';

    return (
        <div className="card w-full bg-base-100 shadow-md border border-base-200">
            <div className="card-body p-4">
                <h3 className="card-title text-sm font-bold flex items-center gap-2">
                    <BsTrophy className="text-yellow-500" />
                    Profile Strength
                </h3>

                <div className="mt-3">
                    <div className="flex justify-between text-xs font-bold mb-1 text-gray-500">
                        <span>Completion</span>
                        <span>{completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`bg-gradient-to-r from-yellow-400 to-orange-500 h-2.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${completion}%` }}></div>
                    </div>
                </div>

                <div className="card-actions mt-4">
                    <Link to="/profile" className="btn btn-outline btn-xs sm:btn-sm btn-primary w-full font-medium">
                        Complete Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProfileStrength