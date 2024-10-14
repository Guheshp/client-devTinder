import React from 'react';

const FeedBack = ({ userData, BUTTON_IMAGE }) => {
    const theme = localStorage.getItem("theme");

    const cardClassName = `card card-compact shadow-xl lg:w-96 md:w-80 sm:w-64 w-full ${theme === "dark" ? "bg-white text-black" : "bg-slate-700 text-white"
        }`;

    const chatBubbleClassName = `chat-bubble bg-base-300 text-white text-xs md:text-sm lg:text-base`;

    return (
        <ul className="timeline timeline-vertical">
            {/* First Feedback */}
            <li>
                <div className="timeline-start timeline-box border-none">
                    <div className={cardClassName}>
                        <figure className="flex flex-col items-center md:flex-row">
                            <img
                                className="rounded-xl w-32 md:w-28 sm:w-24 mx-3 mt-2"
                                src={userData[0].photoUrl}
                                alt="User Image"
                            />
                            <div className="md:p-3 p-2">
                                <h2 className="card-title text-base sm:text-sm md:text-lg">
                                    {userData[0].firstName} {userData[0].lastName}
                                </h2>
                                <p className="text-sm md:text-base">{userData[0].age}, {userData[0].gender}</p>
                                <p className="font-semibold text-xs sm:text-sm md:text-base">
                                    Skills: [{userData[0].skills.join(", ")}]
                                </p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <p className="text-sm md:text-base">{userData[0].about}</p>
                            <div className="card-actions justify-end">
                                <img
                                    role="button"
                                    className="w-24 md:w-32 rounded-lg border border-gray-600 transform transition duration-300 hover:scale-105 shadow-xl"
                                    src={BUTTON_IMAGE}
                                    alt="Button"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="chat chat-start timeline-end timeline-box border-none">
                    <div className={`chat-bubble bg-base-300 text-white chat-bubble-error text-xs md:text-sm lg:text-base`}>
                        <p className={`${theme === "dark" ? "text-white" : "text-dark"}`}>
                            Great platform for finding talented devs and starting awesome projects! 🔥💻 #DevNetwork
                        </p>
                        <p className="text-end text-orange text-xs md:text-sm">
                            - {userData[0].firstName} {userData[0].lastName}
                        </p>
                    </div>
                </div>

                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <hr />
            </li>

            {/* Second Feedback */}
            <li>
                <hr />
                <div className="chat chat-end timeline-start timeline-box border-none">
                    <div className={chatBubbleClassName} >
                        {/* Dynamic text color based on the theme */}
                        Best way to grow your dev network and explore opportunities! 💡👨‍💻 #BuildTogether


                        {/* Author info with consistent text styling */}
                        <p className="text-orange text-end text-xs md:text-sm p-1 mt-3">
                            - {userData[2].firstName} {userData[2].lastName}
                        </p>
                    </div>
                </div>

                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="timeline-end timeline-box border-none">
                    <div className={cardClassName}>
                        <figure className="flex flex-col items-center md:flex-row">
                            <img
                                className="rounded-xl w-24 md:w-28 mx-3 mt-2"
                                src={userData[5].photoUrl}
                                alt="User Image"
                            />
                            <div className="p-2">
                                <h2 className="card-title text-base md:text-lg">
                                    {userData[2].firstName} {userData[2].lastName}
                                </h2>
                                <p className="text-xs md:text-base">
                                    {userData[5].age}, {userData[2].gender}
                                </p>
                                <p className="font-semibold text-xs sm:text-sm md:text-base">
                                    Skills: [{userData[5].skills.join(", ")}]
                                </p>
                            </div>
                        </figure>
                        <div className="card-body">
                            <p className="text-sm md:text-base">{userData[5].about}</p>
                            <div className="card-actions justify-end">
                                <img
                                    role="button"
                                    className="w-24 md:w-32 rounded-lg border border-gray-600 transform transition duration-300 hover:scale-105 shadow-xl"
                                    src={BUTTON_IMAGE}
                                    alt="Button"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </li>
        </ul >
    );
};

export default FeedBack;
