const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8000/api";

const apiCall = async(endpoint, options = {}) => {
    try{
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
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

const awsResourceApi = {
    // get current region
    getAWSRegion: async () => {
        return apiCall('/region')
    },

    // get AWS Cost
    getAWSCosts: async () => {
        return apiCall('/costs')
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