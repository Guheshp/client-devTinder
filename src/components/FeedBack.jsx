import React from 'react'

const FeedBack = ({ userData, BUTTON_IMAGE }) => {
    return (
        <ul className="timeline timeline-vertical">
            <li>
                <div className="timeline-start timeline-box">
                    <div className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                className='rounded-xl'
                                src={userData[0].photoUrl}
                                alt="Image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{userData[0].firstName}  {userData[0].lastName} </h2>
                            <p className='m-0'>{userData[0].age},  {userData[0].gender}</p>
                            <p>{userData[0].about}</p>
                            <p className='font-semibold'>[ {userData[0].skills.join(", ")} ]</p>
                            <div className="card-actions justify-end">
                                <img role='button' className=" w-32 rounded-lg" src={BUTTON_IMAGE} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='timeline-end timeline-box'>

                    <p className=''>Great platform for finding talented devs and starting awesome projects! 🔥💻 #DevNetwork</p>
                    <p className=" text-end">- {userData[0].firstName}  {userData[0].lastName} </p>
                </div>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                <hr />
            </li>

            <li>
                <hr />
                <div className='timeline-start timeline-box'>

                    <p className=''>Best way to grow your dev network and explore opportunities! 💡👨‍💻 #BuildTogether</p>
                    <p className=" text-end">- {userData[2].firstName}  {userData[2].lastName} </p>
                </div>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                    </svg>

                </div>
                <div className="timeline-end timeline-box"><div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            className='rounded-xl'
                            src={userData[5].photoUrl}
                            alt="Image" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{userData[2].firstName}  {userData[2].lastName} </h2>
                        <p className='m-0'>{userData[5].age},  {userData[2].gender}</p>
                        <p>{userData[5].about}</p>
                        <p className='font-semibold'>[ {userData[5].skills.join(", ")} ]</p>
                        <div className="card-actions justify-end">
                            <img role='button' className=" w-32 rounded-lg" src={BUTTON_IMAGE} alt="" />
                        </div>
                    </div>
                </div></div>
                <hr />
            </li>
            <li>
                <hr />
                <div className="timeline-start timeline-box">
                    <div className="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                className='rounded-xl'
                                src={userData[2].photoUrl}
                                alt="Image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{userData[2].firstName}  {userData[2].lastName} </h2>
                            <p className='m-2'>{userData[2].age},  {userData[2].gender}</p>
                            <p>{userData[2].about}</p>
                            <p className='font-semibold'>[ {userData[2].skills.join(", ")} ]</p>
                            <div className="card-actions justify-end">
                                <img role='button' className=" w-32 rounded-lg" src={BUTTON_IMAGE} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='timeline-end timeline-box'>

                    <p className=''>Connected with amazing developers and kickstarted new collaborations! 🚀 #CodeTogether</p>
                    <p className=" text-end">- {userData[2].firstName}  {userData[2].lastName} </p>
                </div>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd" />
                    </svg>
                </div>
                <hr />
            </li>
        </ul>
    )
}

export default FeedBack
