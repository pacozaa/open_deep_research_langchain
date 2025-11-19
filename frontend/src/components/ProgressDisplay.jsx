import { Loader2 } from 'lucide-react'

function ProgressDisplay({ progress }) {
  return (
    <div className="progress-display">
      <div className="progress-header">
        <Loader2 size={20} className="spinner" />
        <h3>Research in Progress</h3>
      </div>
      
      <div className="progress-timeline">
        {progress.map((item, index) => (
          <div key={index} className="progress-item">
            <div className="progress-marker"></div>
            <div className="progress-content">
              <span className="progress-message">{item.message}</span>
              <span className="progress-time">
                {item.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressDisplay
