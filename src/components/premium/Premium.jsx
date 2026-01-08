import React from "react";
import { useUser } from "../../utils/helper/UserContext";
import PremiumStatusCard from "./PremiumStatusCard";
import UpgradeCard from "./UpgradeCard";

const Premium = () => {
    const user = useUser();

    // Guard clause if user data isn't loaded yet (optional)
    if (!user) return null;

    return (
        <div className="w-full ">
            {user.isPremium ? (
                // 1. If Premium -> Show Status + AI Link
                <PremiumStatusCard user={user} />
            ) : (
                // 2. If Free -> Show Upgrade CTA + Modal
                <UpgradeCard />
            )}
        </div>
    );
};

export default Premium;