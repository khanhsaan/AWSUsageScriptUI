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
        {/* If "Overview" is being selected */}
        {activeTab === 'overview' && (
          <div className='overview-grid'>
            <ServiceCard
              title={'EC2 Instances'}
              count={mockData.ec2Instances.length}
              icon={'💻'}
              status={'healthy'}
              // Show how many instances are running using filter
              details={`${mockData.ec2Instances.filter(i => i.status === 'running').length} running`}>

            </ServiceCard>
          </div>
        )}
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
