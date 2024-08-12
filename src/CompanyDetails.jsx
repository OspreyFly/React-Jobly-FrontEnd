import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JoblyApi } from '../api';
import JobsList from './JobsList';

const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);


    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const response = await JoblyApi.getCompany(handle);
                setCompany(response);
            } catch (error) {
                console.error("Failed to fetch company details:", error);
            }
        };
        fetchCompanyDetails();
    }, [handle]);


    if (!company) return <div>Loading...</div>;
    if (!company.num_employees) company.num_employees = "Unknown # of "


    return (
        <div>
            <image href={company.logo_url} alt_text={company.name + " logo"}></image>
            <h2>{company.name + " - " + company.num_employees + " Employees"}</h2>
            <p>{company.description}</p>
            <JobsList jobs={company.jobs} />
        </div>
    );
};

export default CompanyDetail;
