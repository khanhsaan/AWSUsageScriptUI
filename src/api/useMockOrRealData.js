import { useEffect, useState } from "react"
import mockData from "../constants/MockData";
import apiService from "./apiService";

const useMockOrRealData = () => {
    // const[data, setData] = useState(null);

    const[ec2Data, setEC2Data] = useState(null);
    const[errorEC2, setErrorEC2] = useState(null);

    const[isLoading, setIsLoading] = useState(true);
    // const[useMockData, setUseMockData] = useState(false);

    const fetchAWSData = async () => {
        // Turn on the loading state
        setIsLoading(true);
        // There is no error initially
        setErrorEC2(null);

        try {
            // response = {
            //      data, error
            // }
            console.log('Requesting EC2 instances');
            const responseEC2 = apiService.getEC2();

            // If threre is error in the returned call
            if(responseEC2.error){
                console.warn('EC2 API call failed, using mock data', responseEC2.error);

                // Use mock data
                setEC2Data(mockData);
            } else {
                console.log('No error, using real EC2 data');
                // else use the real data
                setEC2Data(responseEC2.data);
            }
        } catch (err) {
            console.log('Failed to fetch EC2 instances: ', err);
            console.log('EC2 API call failed, using mock data');
            // Set the error
            setErrorEC2(err.message);
            // Use the mock data
            setEC2Data(mockData.ec2Instances);
        } finally {
            // Turn off loading state
            setIsLoading(false);
        }
    }

    // Call fetchAWSData on mount
    useEffect(() => {
        fetchAWSData();
    }, []);

    // Return the values
    return [ec2Data, errorEC2, isLoading];
}

export default useMockOrRealData;