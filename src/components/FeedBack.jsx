import React from 'react'

const FeedBack = ({ userData, BUTTON_IMAGE }) => {
    return (
        <ul className="timeline timeline-vertical">
            <li>
                <div className="timeline-start timeline-box">
                    <div className="card card-compact bg-white w-96 shadow-xl text-black">
                        <figure>
                            <img
                                className='rounded-xl w-32 mx-3 mt-2'
                                src={userData[0].photoUrl}
                                alt="Image" />
                            <div>
                                <h2 className="card-title">{userData[0].firstName}  {userData[0].lastName} </h2>
                                <p className='m-0'>{userData[0].age},  {userData[0].gender}</p>
                                <p className='font-semibold text-sm'>Skills: [ {userData[0].skills.join(", ")} ]</p>
                            </div>

                        </figure>
                        <div className="card-body">
                            <p>{userData[0].about}</p>

                            <div className="card-actions justify-end">
                                <img role='button' className=" w-32 rounded-lg border border-gray-600 transform transition duration-300 hover:scale-105 shadow-xl" src={BUTTON_IMAGE} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat chat-start timeline-end timeline-box border-none">
                    <div className="chat-bubble bg-base-300  text-white chat-bubble-error ">Great platform for finding talented devs and starting awesome projects! 🔥💻 #DevNetwork
                        <p className="text-end text-orange">- {userData[0].firstName}  {userData[0].lastName} </p>
                    </div>
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
                <div className="chat chat-end timeline-start timeline-box border-none">
                    <div className="chat-bubble bg-base-300  text-white chat-bubble-error ">Best way to grow your dev network and explore opportunities! 💡👨‍💻 #BuildTogether
                        <p className=" text-orange float-end p-1 mt-3 ">- {userData[2].firstName}  {userData[2].lastName} </p>
                    </div>
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
                <div className="timeline-end timeline-box"><div className="card card-compact bg-white text-black w-96 shadow-xl ">
                    <figure>
                        <img
                            className='rounded-xl w-32 mx-3 mt-2'
                            src={userData[5].photoUrl}
                            alt="Image" />
                        <div>
                            <h2 className="card-title">{userData[2].firstName}  {userData[2].lastName} </h2>
                            <p className='m-0'>{userData[5].age},  {userData[2].gender}</p>
                            <p className='font-semibold'>Skills: [ {userData[5].skills.join(", ")} ]</p>
                        </div>
                    </figure>
                    <div className="card-body">

                        <p>{userData[5].about}</p>

                        <div className="card-actions justify-end">
                            <img role='button' className=" w-32 rounded-lg border border-gray-600 transform transition duration-300 hover:scale-105 shadow-xl" src={BUTTON_IMAGE} alt="" />
                        </div>
                    </div>
                </div></div>
                <hr />
            </li>
            {/* <li>
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
            </li> */}
        </ul>
    )
}

export default FeedBack
