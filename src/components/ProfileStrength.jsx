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
            return (
                <div className="card w-full bg-base-100 shadow-md border border-primary/20 overflow-hidden">
                    {/* Gradient Overlay using Primary color (Works in Dark/Light) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

                    <div className="card-body p-3 relative z-10">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="text-xs font-extrabold flex items-center gap-1.5 text-primary uppercase tracking-wide">
                                <BsStars className="text-warning text-sm" />
                                All-Star Profile
                            </h3>

                            {/* Active Badge */}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-success/20 bg-success/10 text-success">
                                ACTIVE
                            </span>
                        </div>

                        {/* Description Text */}
                        <p className="text-[11px] text-base-content/70 font-medium">
                            Profile optimized. <span className="font-bold text-base-content">3x visibility</span>.
                        </p>

                        {/* Inner Stat Box */}
                        <div className="flex items-center gap-3 mt-2 bg-base-100 px-2 py-2 rounded-lg border border-base-200 shadow-sm">
                            {/* Rocket Icon */}
                            <div className="p-1.5 bg-success/10 rounded-full text-success ring-1 ring-success/20">
                                <BsRocketTakeoff className="text-xs" />
                            </div>

                            {/* Stats */}
                            <div className="flex-1">
                                <p className="text-[11px] font-bold text-base-content leading-none mb-0.5">
                                    Boost Active
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] text-base-content/50 font-medium">
                                        Ranking Top 1%
                                    </p>
                                    {/* Animated Pulse Dot */}
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
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