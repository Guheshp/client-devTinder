import React from 'react'
import Premium from "./premium/Premium"
import ProfileStrength from "./ProfileStrength"
import SuggestedSkills from "./SuggestedSkills"

const RightSidebar = () => {
    return (
        <div className="flex flex-col gap-5 w-full">
            <Premium />
            <ProfileStrength />
            <SuggestedSkills />
        </div>
    )
}

export default RightSidebar