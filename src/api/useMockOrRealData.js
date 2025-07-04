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

    // S3
    const[s3Data, sets3Data] = useState(null);
    const[errorsS3, setErrorS3] = useState(null);

    // Lambda
    const[lambdaData, setLambdaData] = useState(null);
    const[errorLambda, setErrorLambda] = useState(null);

    // Load balancers
    const[loadBalancersData, setLoadBalancersData] = useState(null);
    const[errorLoadBalancers, setErrorLoadBalancers] = useState(null);

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

    useEffect(() => {
        if(s3Data) {
            console.log('S3 data has been set successfully');

            if(s3Data.s3Buckets) {
                console.log('S3 instance can be found')
            }
        } else {
            console.log('S3 data has been set UNsuccessfully');
        }
    }, [s3Data]);

    useEffect(() => {
        if(lambdaData) {
            console.log('Lambda data has been set successfully');

            if(lambdaData.lambdaFunctions) {
                console.log('S3 instance can be found')
            }
        } else {
            console.log('Lambda data has been set UNsuccessfully');
        }
    }, [lambdaData]);

    useEffect(() => {
        if(loadBalancersData) {
            console.log('LOAD BALANCERS data has been set successfully');

            if(loadBalancersData.lambdaFunctions) {
                console.log('LOAD BALANCERS instance can be found')
            }
        } else {
            console.log('LOAD BALANCERS data has been set UNsuccessfully');
        }
    }, [loadBalancersData]);


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

            // S3 API calls ====================

            console.log('Requesting S3 instances');
            const responseS3 = await apiService.getS3();

            if(responseS3.data) {
                console.log('There is S3 response being retrieved');
                console.log(responseS3.data.s3Buckets);
            } else {
                console.log('There is NO S3 reponse being retrieved');
            }

            // If there is error in the returned call
            if(responseS3.error){
                console.warn('S3 API call failed, using mock data', responseS3.error);

                // Use mock data
                sets3Data(mockData);
            } else {
                console.log('No error, using real S3 data');
                sets3Data(responseS3.data);
            }

            // LAMBDA API calls ===================
            console.log('Requesting Lambda functions...');
            const responseLambda = await apiService.getLambda();
            
            if(responseLambda.data) {
                console.log('There is Lambda response being retrieved');
                console.log(responseLambda.data.lambdaFunctions);
            } else {
                console.log('There is NO Lambda response being retrieved');
            }

            if(responseLambda.error) {
                console.warn('Lambda API call failed, using mock data', responseLambda.error);

                setLambdaData(mockData);
            } else {
                console.log('No error, using real Lambda data');
                setLambdaData(responseLambda.data);
            }

            // ELB API calls ===================

            console.log('Requesting ELB functions...');
            const responseELB = await apiService.getELB();
            
            if(responseELB.data) {
                console.log('There is ELB response being retrieved');
                console.log(responseELB.data.loadBalancers);
            } else {
                console.log('There is NO ELB response being retrieved');
            }

            if(responseELB.error) {
                console.warn('ELB API call failed, using mock data', responseELB.error);

                setLoadBalancersData(mockData);
            } else {
                console.log('No error, using real ELB data');
                setLoadBalancersData(responseELB.data);
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
    return [ec2Data, errorEC2, rdsData, errorRDS, costData, errorCost, s3Data, errorsS3,lambdaData, errorLambda, loadBalancersData, errorLoadBalancers, isLoading];
}

export default useMockOrRealData;