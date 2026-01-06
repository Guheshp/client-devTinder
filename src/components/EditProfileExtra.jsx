import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaPlus, FaTrash } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

const EditProfileExtra = ({ register, errors, control }) => {
    // Mock state for projects (In real app, manage this via useFieldArray or Redux)
    const [projects, setProjects] = useState([
        { title: "DevTinder", desc: "A platform for devs", link: "#" }
    ]);

    const handleAddProject = () => {
        // Logic to open a modal or add a field would go here
        alert("Feature: Open 'Add Project' Modal");
    };

    const handleDeleteProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* --- SECTION 1: Social Links --- */}
            <div className="card bg-base-100 shadow-xl rounded-box">
                <div className="card-body">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <FaGlobe className="text-primary" /> Social Presence
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* GitHub */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaGithub /> GitHub URL
                                </span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://github.com/username"
                                className="input input-bordered w-full"
                                {...register("githubUrl")}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaLinkedin className="text-blue-600" /> LinkedIn URL
                                </span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://linkedin.com/in/username"
                                className="input input-bordered w-full"
                                {...register("linkedinUrl")}
                            />
                        </div>

                        {/* Portfolio */}
                        <div className="form-control w-full md:col-span-2">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                    <FaGlobe className="text-green-500" /> Portfolio Website
                                </span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://myportfolio.com"
                                className="input input-bordered w-full"
                                {...register("portfolioUrl")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: Project Showcase --- */}
            <div className="card bg-base-100 shadow-xl rounded-box">
                <div className="card-body">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <HiDocumentText className="text-primary" /> Project Showcase
                        </h3>
                        <button
                            type="button"
                            onClick={handleAddProject}
                            className="btn btn-sm btn-outline btn-primary gap-2"
                        >
                            <FaPlus /> Add Project
                        </button>
                    </div>

                    {projects.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3">
                            {projects.map((proj, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-base-200 rounded-lg hover:bg-base-200/50 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{proj.title}</h4>
                                        <p className="text-xs text-gray-500">{proj.desc}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="btn btn-xs btn-ghost">View</a>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteProject(index)}
                                            className="btn btn-xs btn-circle btn-ghost text-red-500"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 border-2 border-dashed border-base-300 rounded-lg">
                            <p className="text-gray-400 text-sm">No projects added yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- SECTION 3: Resume Upload --- */}
            <div className="card bg-base-100 shadow-xl rounded-box">
                <div className="card-body">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Resume / CV</h3>
                    <div className="flex items-center gap-4 border border-gray-300 p-4 rounded-lg bg-gray-50">
                        <div className="p-3 bg-white rounded-full shadow-sm">
                            <HiDocumentText className="text-2xl text-red-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold">Upload your Resume (PDF)</p>
                            <p className="text-xs text-gray-500">Max size 5MB</p>
                        </div>
                        <input
                            type="file"
                            accept=".pdf"
                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                            {...register("resumeFile")}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EditProfileExtra;