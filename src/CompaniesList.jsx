import React, { useState, useEffect } from 'react';
import { JoblyApi } from '../api';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await JoblyApi.getAllCompanies({ name: searchTerm });
                console.log(response);
                setCompanies(response);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
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
                placeholder="Search companies..."
            />
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {companies.map((company) => (
                    <li key={company.handle}>
                        <CompanyCard company={company} />
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default CompanyList;
