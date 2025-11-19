import { useState } from 'react'
import { Search } from 'lucide-react'

function ResearchForm({ onSubmit, disabled }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query)
    }
  }

  return (
    <div className="research-form">
      <h2>Start Your Research</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your research question or topic... 
            
Examples:
• What are the latest developments in quantum computing?
• Analyze the impact of AI on healthcare
• Compare different approaches to climate change mitigation"
            rows={6}
            disabled={disabled}
            className="query-input"
          />
        </div>
        <button 
          type="submit" 
          disabled={disabled || !query.trim()}
          className="submit-button"
        >
          <Search size={20} />
          <span>{disabled ? 'Researching...' : 'Start Research'}</span>
        </button>
      </form>
    </div>
  )
}

export default ResearchForm
