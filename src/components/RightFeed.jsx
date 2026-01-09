import React from 'react'
import Premium from "./premium/Premium"
import ProfileStrength from "./ProfileStrength"
import SuggestedSkills from "./SuggestedSkills"

const RightSidebar = () => {
    return (
        <div className="flex flex-col gap-4 w-full h-fit">
            <Premium />
            <ProfileStrength />
            <SuggestedSkills />
        </div>
    )
}

export default RightSidebar