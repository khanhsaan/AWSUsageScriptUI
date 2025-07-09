const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000/api";

const apiCall = async(endpoint, options = {}) => {
    try{
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                // Ensures the request specifies it is sending/expecting JSON data.
                'Content-Type': 'application/json',

                // Allows the caller to add or override headers via the options.headers object.
                ...options.headers,
            },
            // Spreads any other custom request configurations (like method, body, credentials, etc.) into the fetch call.
            ...options,
        });

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Debug
        // console.log(data);

        return {
            data,
            error: null,
        }
    } catch (error) {
        console.log(`API call failed for ${endpoint}:`, error);

        return {
            data: null,
            error: error.message
        };
    }
}

const authcall = async(endpoint, credentials) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
        // Specify the method: POST
        method: 'POST',
        // JSON format the passed credentials
        body: JSON.stringify(credentials)
    };

    // Pass the endpoint and option to apiCall()
    return await apiCall(endpoint, options);
}

const awsResourceApi = {
    // configure AWS credentials
    configureAWS: async (credentials) => {
        // Map the passed credentials with the new specified attributes
        const {access_key, secret_access_key, region} = credentials;

        // Validate the credentials
        if(!access_key || !secret_access_key || !region) {
            return {
                data: null,
                // raise error
                error: 'Missing required credentials: access_key, secret_access_key, and region are all required'
            }
        }
        
        // Pass the endpoint and mapped credentials to apiCall(), then wait and return its repsonse
        return await authcall('/configure', {
            access_key,
            secret_access_key,
            region
        });
    },

    // get current region
    getAWSRegion: async () => {
        return await apiCall('/region')
    },

    // get AWS Cost
    getAWSCosts: async () => {
        return await apiCall('/costs')
    },

    // Get EC2 instances
    getRDS: async () => {
        return await apiCall('/rds');
    },

    // Get RDS
    getS3: async () => {
        return await apiCall('/s3');
    },

    // Get Lambda
    getLambda: async () => {
        return await apiCall('/lambda');
    },

    // Get load balancers
    getELB: async () => {
        return await apiCall('/elb');
    },

    // Get EC2
    getEC2: async () => {
        return await apiCall('/ec2');
    },

    // Get EBS
    getEBS: async () => {
        return await apiCall('/ebs');
    },

    // Get Elastic IPs
    getEIP: async () => {
        return await apiCall('/eip');
    }
}   

export default awsResourceApi;