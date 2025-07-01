import { use, useEffect, useState } from "react"
import mockData from "../constants/MockData";
import apiService from "./apiService";

const useMockOrRealData = () => {
    // const[data, setData] = useState(null);

    // Cost
    const[costData, setCostData] = useState(null);
    const[errorCost, setErrorCost] = useState(null);

    // EC2
    const[ec2Data, setEC2Data] = useState(null);
    const[errorEC2, setErrorEC2] = useState(null);

    // RDS
    const[rdsData, setRDSData] = useState(null);
    const[errorRDS, setErrorRDS] = useState(null);

    // since set in useState is asynchronous, use useEffect
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


    useEffect(() => {
        if (ec2Data) {
            console.log('EC2 data has been set successfully');

            if(ec2Data.ec2Instances) {
                console.log('EC2 instances can be found')
            }
        } else {
            console.log('EC2 data has been set UNsuccessfully');
        }
    }, [ec2Data]);

    useEffect(() => {
        if (costData) {
            console.log('COST data has been set successfully');

            if(costData.totalCost) {
                console.log('COST instance can be found')
            }
        } else {
            console.log('COST data has been set UNsuccessfully');
        }
    }, [costData]);

    const[isLoading, setIsLoading] = useState(true);
    // const[useMockData, setUseMockData] = useState(false);

    const fetchAWSData = async () => {
        // Turn on the loading state
        console.log('Loading ON ==================');

        // There is no error initially
        setErrorEC2(null);
        setErrorRDS(null);
        setErrorCost(null);

        // EC2 API calls
        try {
            // EC2 API calls ===============================

            // response = {
            //      data, error
            // }
            console.log('Requesting EC2 instances');
            const responseEC2 = await apiService.getEC2();

            if(responseEC2.data) {
                console.log('There is EC2 response being retrieved');
                console.log(responseEC2.data.ec2Instances);
            
            } else {
                console.log('There is NO EC2 response being retrieved')
            }
            
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
            // RDS API calls ============================

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
            }
            // COST API calls ===============================

            // response = {
            //      data, error
            // }
            console.log('Requesting COST instances');
            const reponseCOST = await apiService.getAWSCosts();
            
            if(reponseCOST.data) {
                console.log('There is COST response being retrieved');
                console.log(reponseCOST.data.totalCost);
            
            } else {
                console.log('There is NO COST response being retrieved')
            }

            // If threre is error in the returned call
            if(reponseCOST.error){
                console.warn('COST API call failed, using mock data', reponseCOST.error);

                // Use mock data
                setCostData(mockData);
            } else {
                console.log('No error, using real COST data');
                // else use the real data
                setCostData(reponseCOST.data);

                // console.log(rdsData?.rdsInstances?.length);
            }
        } catch (err) {
            console.log('Failed to fetch AWS data: ', err);
            console.log('API call failed, using mock data');

            setEC2Data(mockData);
            setCostData(mockData);
            setRDSData(mockData)
            
        } finally {
            setIsLoading(false);
        }
    }

    // Call fetchAWSData on mount
    useEffect(() => {
        fetchAWSData();
    }, []);

    // Return the values
    return [ec2Data, errorEC2, rdsData, errorRDS, costData, errorCost, isLoading];
}

export default useMockOrRealData;