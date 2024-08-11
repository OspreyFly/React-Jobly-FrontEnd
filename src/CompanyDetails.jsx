import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyDetail = ({ id }) => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const response = await axios.get(`/api/companies/${id}`);
                setCompany(response.data);
            } catch (error) {
                console.error("Failed to fetch company details:", error);
            }
        };
        fetchCompanyDetails();
    }, [id]);

    if (!company) return <div>Loading...</div>;

    return (
        <div>
            <h2>{company.name}</h2>
            {/* Render other company details here */}
        </div>
    );
};

export default CompanyDetail;
