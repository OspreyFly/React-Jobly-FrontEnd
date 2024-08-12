import React, { useState, useEffect } from 'react';
import { JoblyApi } from '../api';
import JobCard from './JobCard';
import './JobsList.css';

const JobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await JoblyApi.getJobs({ title: searchTerm });
                setJobs(response);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                setError(error.message || "An unknown error occurred.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search jobs..."
            />
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {jobs.map((job) => (
                    <li key={job.handle}>
                        <JobCard job={job} />
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default JobsList;