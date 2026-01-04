import Premium from "./premium/premium"
import ProfileStrength from "./ProfileStrength"
import SuggestedSkills from "./SuggestedSkills"


const RightSidebar = () => {
    return (
        <div className="space-y-4">
            <ProfileStrength />
            <SuggestedSkills />
            <Premium />
        </div>
    )
}

export default RightSidebar
