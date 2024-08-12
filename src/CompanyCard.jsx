import React from 'react';
import './CompanyCard.css';

function CompanyCard({ company }) {
    return (
        <div className="company-card">
            <h3>{company.name}</h3>
            <img src={company.logo_url} alt={company.name + ' logo'} />
        </div>
    );
}

export default CompanyCard;

