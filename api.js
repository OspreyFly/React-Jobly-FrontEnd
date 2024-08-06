import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


 // Companies API methods

  static async createCompany(company) {
    return this.request("companies", company, "POST");
  }
  
  static async getAllCompanies(query) {
    return this.request("companies", query, "GET");
  }
  
  static async getCompanyByHandle(handle) {
    return this.request(`companies/${handle}`, {}, "GET");
  }
  
  static async updateCompany(handle, updates) {
    return this.request(`companies/${handle}`, updates, "PATCH");
  }
  
  static async deleteCompany(handle) {
    return this.request(`companies/${handle}`, {}, "DELETE");
  }
  
  // Jobs API methods

static async createJob(job) {
    return this.request("jobs", job, "POST");
  }
  
  static async getAllJobs(query) {
    return this.request("jobs", query, "GET");
  }
  
  static async getJobById(id) {
    return this.request(`jobs/${id}`, {}, "GET");
  }
  
  static async updateJob(id, updates) {
    return this.request(`jobs/${id}`, updates, "PATCH");
  }
  
  static async deleteJob(id) {
    return this.request(`jobs/${id}`, {}, "DELETE");
  }
  
  // Users API methods

  static async createUser(user) {
    return this.request("users", user, "POST");
  }
  
  static async getAllUsers() {
    return this.request("users", {}, "GET");
  }
  
  static async getUserByUsername(username) {
    return this.request(`users/${username}`, {}, "GET");
  }
  
  static async updateUser(username, updates) {
    return this.request(`users/${username}`, updates, "PATCH");
  }
  
  static async deleteUser(username) {
    return this.request(`users/${username}`, {}, "DELETE");
  }
  
  static async applyToJob(username, jobId) {
    return this.request(`${username}/jobs/${jobId}`, {}, "POST");
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";