function CostBar({
    service, 
    total}) {
    
    const serviceName = service?.service ?? 'Unknown service';
    const safeTotal = total ?? 1;
    const cost = service?.cost ?? 1;
    const percentage = (cost / safeTotal) * 100;
    return (
        <div className="cost-bar-container">
            <div className="cost-bar-header">
                <span className="service-name">{serviceName}</span>
                <span className="cost-amount">${cost.toFixed(2)}</span>
            </div>
            <div className="cost-bar">
                <div className="cost-fill" style={{width: `${percentage}`}}></div>
            </div>
            <div className="cost-percentage">
                {percentage.toFixed(1)}%
            </div>
        </div>
    )
}

export default CostBar;