import axios from 'axios';
const BASE_URL = "http://localhost:3001";


/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // Check if the token is undefined and the endpoint is not 'auth/token'
    if (!JoblyApi.token && endpoint !== 'auth/token' && endpoint !== 'auth/register') {
      console.warn("Authority Required First");
    }

    console.debug("API Call:", endpoint, data, method);
    let url = `${BASE_URL}/${endpoint}`;

    if (method === "get" && Object.keys(data).length > 0) {
      // Filter out undefined or null values and accumulate the remaining key-value pairs into a new object
      const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Construct the URL with the filtered data
      url += `?${new URLSearchParams(filteredData).toString()}`;
      data = {}; // Clear data since we're sending it as query params
    }

    // Adjust headers to include the token
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };

    try {
      const result = await axios({
        url,
        method,
        data,
        params: data,
        headers
      });

      // Special handling for 'auth/token' and 'auth/register' endpoints
      if (endpoint === "auth/token" && !JoblyApi.token) {
        JoblyApi.token = result.data.token;
      } else if (endpoint === "auth/register") {
        // Additional logic for 'auth/register' if needed
      }

      return result.data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err;
      throw Array.isArray(message) ? message : [message];
    }
  }


  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */

  static async getAllCompanies(queryParams = {}) {
    let res = await this.request("companies", queryParams);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of jobs (filtered by title if not undefined) */

  static async getJobs(queryParams = {}) {
    let res = await this.request("jobs", queryParams);
    return res.jobs;
  }

  /** Apply to a job */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}



export default JoblyApi;
