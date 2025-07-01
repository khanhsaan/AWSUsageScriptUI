import { use, useEffect, useState } from "react"
import mockData from "../constants/MockData";
import apiService from "./apiService";

const useMockOrRealData = () => {
    // const[data, setData] = useState(null);

    // EC2
    const[ec2Data, setEC2Data] = useState(null);
    const[errorEC2, setErrorEC2] = useState(null);

    // RDS
    const[rdsData, setRDSData] = useState(null);
    const[errorRDS, setErrorRDS] = useState(null);

    useEffect(() => {
        if (rdsData) {
            console.log('RDS data has been set successfully');

            if(rdsData.rdsInstances) {
                console.log('RDS instances can be found')
            }
        } else {
            console.log('RDS data has been set UNsuccessfully');
        }
    }, [rdsData]);

    const[isLoading, setIsLoading] = useState(true);
    // const[useMockData, setUseMockData] = useState(false);

    const fetchAWSData = async () => {
        // Turn on the loading state
        setIsLoading(true);
        // There is no error initially
        setErrorEC2(null);
        setErrorRDS(null);

        // EC2 API calls
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
            setEC2Data(mockData);
        }

        // RDS API calls
        try {
            // response = {
            //      data, error
            // }
            console.log('Requesting RDS instances');
            const responseRDS = await apiService.getRDS();
            
            if(responseRDS.data) {
                console.log('There is RDS response being retrieved');
                console.log(responseRDS.data.rdsInstances);
            
            } else {
                console.log('There is NO RDS response being retrieved')
            }

            // If threre is error in the returned call
            if(responseRDS.error){
                console.warn('RDS API call failed, using mock data', responseRDS.error);

                // Use mock data
                setRDSData(mockData);
            } else {
                console.log('No error, using real RDS data');
                // else use the real data
                setRDSData(responseRDS.data);

                // console.log(rdsData?.rdsInstances?.length);
            }
        } catch (err) {
            console.log('Failed to fetch RDS instances: ', err);
            console.log('RDS API call failed, using mock data');
            // Set the error
            setErrorRDS(err.message);
            // Use the mock data
            setRDSData(mockData);
        }

        // At the end, turn off the loading state
        setIsLoading(false);
    }

    // Call fetchAWSData on mount
    useEffect(() => {
        fetchAWSData();
    }, []);

    // Return the values
    return [ec2Data, errorEC2, rdsData, errorRDS, isLoading];
}

export default useMockOrRealData;