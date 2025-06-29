import logo from './logo.svg';
import './App.css';
import { act, useEffect, useState } from 'react';
import mockData from './constants/MockData';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Set setIsLoading to false after 1.5 seconds to give the data some time to be retrieved properly
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // if the loading state is true, render loading screen and loading wheel
  if(isLoading) {
    return (
      <div className='loading-screen'>
        <div className='loading-spinner'></div>
        <p>Loading AWS Resources...</p>
      </div>
    )
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className='header-content'>
          <div className='header-left'>
            <h1> AWS Resource Monitor</h1>
            {/* Display region */}
            <p>Region: <span className='region-badge'>{mockData.region}</span></p>
          </div>
          <div className='header-right'>
            <div className='cost-summary'>
              {/* toFixed(2) to ensure the number is being displayed with 2 decimal points */}
              <h2>${mockData.totalCost.toFixed(2)}</h2>
              <p>Total Cost This Month</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className='nav-tabs'>
        {/* "Overview" button */}
        {/* If the activeTab is set to overview, className is active, otherwise, className is empty */}
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}>
            Overview
        </button>

        {/* "Services" button */}
        <button
          className={activeTab === 'services' ? 'active': ''}
          onClick={() => setActiveTab('services')}>
            Services
        </button>

        {/* "Cost Breakdown" button */}
        <button
          className={activeTab == 'costs' ? 'active': ''}
          onClick={() => setActiveTab('costs')}>
            Cost Breakdown
        </button>
      </nav>

      {/* Main Content */}
      <main className='main-content'>
        {/* If "Overview" tab is being selected */}
        {activeTab === 'overview' && (
          <div className='overview-grid'>

            {/* Service Card of EC2 Instances */}
            <ServiceCard
              title={'EC2 Instances'}
              count={mockData.ec2Instances.length}
              icon={'💻'}
              status={'healthy'}
              // Show how many instances are running using filter
              details={`${mockData.ec2Instances.filter(i => i.status === 'running').length} running`}>
            </ServiceCard>

            {/* Service Card of RDS Databases */}
            <ServiceCard
              title={'RDS Databases'}
              count={mockData.rdsInstances.length}
              icon={'🗄️'}
              status={'healthy'}
              // Show how many databases are available using filter
              details={`${mockData.rdsInstances.filter(i => i.status === 'available').length} available`}>
            </ServiceCard>

            {/* Service Card of S3 Buckets */}
            <ServiceCard
              title={'S3 Buckets'}
              count={mockData.s3Buckets.length}
              icon={'🪣'}
              status={'healthy'}

              // .reduce((acc, bucket) => acc + bucket.size, 0):
              // The reduce function loops over all elements in the array.
              // acc is the accumulator that keeps a running total.
              // bucket.size adds the size of each bucket to the total.
              // 0 is the initial value of the accumulator.
              details={`${mockData.s3Buckets.reduce((accumulator, bucket) => accumulator + bucket.size, 0).toFixed(1)} GB totals`}>
            </ServiceCard>

            {/* Service Card of Lambda Functions */}
            <ServiceCard
              title={'Lamda Functions'}
              count={mockData.lambdaFunctions.length}
              icon={'λ'}
              status={'healthy'}
              details={`All functions are active`}>
            </ServiceCard>

            {/* Service Card of Load Balancers */}
            <ServiceCard
              title={'Load Balancers'}
              count={mockData.loadBalancers.length}
              icon={'⚖️'}
              status={'healthy'}
              // Show how many functions are active using filter
              details={`${mockData.loadBalancers.filter(i => i.state === 'active').length} active`}>
            </ServiceCard>

            {/* Service Card of EBS Volumes*/}
            <ServiceCard
              title={'EBS Volumes'}
              count={mockData.loadBalancers.length}
              icon={'💾'}
              status={'healthy'}
              // Show how many functions are active using filter
              details={`${mockData.ebsVolumes.reduce((accumulator, vol) => accumulator + vol.size, 0).toFixed(1)} GB totals`}>
            </ServiceCard>
          </div>
        )};

        {/* If Services tab are being selected */}
        {activeTab === 'services' && (
          <div className='overview-grid'>
            <ServiceCard
              title={"hello"}></ServiceCard>
          </div>
        )};
      </main>
    </div>
  );
}

// Service Card Component
function ServiceCard({
  // Passed parameters
  title,
  count,
  icon,
  status,
  details
}) {

  // Dictionary of status with corresponding colors
  const statusColors = {
    healthy: 'green',
    warning: 'orange',
    error: 'red'
  };

  return (
    <div className='service-card'>
      <div className = 'card-header'>

        {/* Display the passed icon for the corresponding service */}
        <span className='service-icon'>{icon}</span>

        {/* Display the passed title with style */}
        <div className='card-title'>
          <h3>{title}</h3>
          {/* Display the corresponding status with style */}
          <span className = {`status-indicator ${status}`}></span>
        </div>
      </div>
      
      {/* Display the card content with style */}
      <div className='card-content'>
        {/* Display the total number of instances */}
        <div className='count'>{count}</div>
        {/* Display how many services are running */}
        <div className='details'>{details}</div>
      </div>
    </div>
  );
}

export default App;
