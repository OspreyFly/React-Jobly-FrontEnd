import React from 'react';
import './JobCard.css';

function JobCard({ job }) {
    return (
        <div className="job-card">
            <h3>{job.title + " - " + "$" + job.salary}</h3>
        </div>
    );
}

export default JobCard;