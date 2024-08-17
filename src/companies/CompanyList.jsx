import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/JoblyApi";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(handle) {
    let companies = await JoblyApi.getAllCompanies();
    setCompanies(companies);
  }

  if (!companies) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {companies.length
        ? (
          <div className="CompanyList-list">
            {companies.map(c => (
              <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
              />
            ))}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default CompanyList;
