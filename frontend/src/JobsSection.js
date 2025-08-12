import React, { useEffect, useState } from "react";
import axios from "axios";
import './JobsSection.css';

function JobsSection({ username, onApplied, limit }) {
    const [jobs, setJobs] = useState([]);
    const [applied, setApplied] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/get-all-job-desc")
            .then(res => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
                setLoading(false);
            });

        if (username) {
            axios.get(`http://localhost:5000/get-user-applications?username=${encodeURIComponent(username)}`)
                .then(res => {
                    const appliedRoles = {};
                    res.data.forEach(j => { appliedRoles[j.role] = true; });
                    setApplied(appliedRoles);
                });
        }
    }, [username]);

    const handleApply = (role) => {
        axios.post("http://localhost:5000/apply-job", { username, role })
            .then(() => {
                setApplied({ ...applied, [role]: true });
                if (onApplied) onApplied(role);
            })
            .catch(() => alert("Already applied or error!"));
    };

    const handleWithdraw = (role) => {
        axios.post("http://localhost:5000/withdraw-job", { username, role })
            .then(() => {
                const newApplied = { ...applied };
                delete newApplied[role];
                setApplied(newApplied);
                if (onApplied) onApplied(role);
            })
            .catch(() => alert("Error withdrawing application!"));
    };

    // Limit jobs if limit prop is provided
    const jobsToShow = limit ? jobs.slice(0, limit) : jobs;

    return (
        <div className="jobs-section">
            <h2>🚀 Available Job Opportunities</h2>

            {loading ? (
                <div className="loading">Loading amazing opportunities...</div>
            ) : jobsToShow.length === 0 ? (
                <div className="no-jobs">No job opportunities available at the moment. Check back soon!</div>
            ) : (
                <ul>
                    {jobsToShow.map(job => (
                        <li key={job.role} className="job-item">
                            <div className="job-details">
                                <div className="job-title">{job.title}</div>
                                <div className="job-role">{job.role}</div>

                                <div className="job-info">
                                    <div className="job-info-item">
                                        <span className="job-info-label">Skills:</span>
                                        <div className="job-skills">{job.skills}</div>
                                    </div>
                                    <div className="job-info-item">
                                        <span className="job-info-label">Location:</span>
                                        <span className="job-location">📍 {job.location}</span>
                                    </div>
                                    {job.level && (
                                        <div className="job-info-item">
                                            <span className="job-info-label">Level:</span>
                                            <span>🎯 {job.level}</span>
                                        </div>
                                    )}
                                    {job.duration && (
                                        <div className="job-info-item">
                                            <span className="job-info-label">Duration:</span>
                                            <span>⏱️ {job.duration}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {username && (
                                <div className="job-actions">
                                    {applied[job.role] ? (
                                        <button
                                            onClick={() => handleWithdraw(job.role)}
                                            className="withdraw-btn"
                                        >
                                            Withdraw Application
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleApply(job.role)}
                                            className="apply-btn"
                                        >
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default JobsSection;
