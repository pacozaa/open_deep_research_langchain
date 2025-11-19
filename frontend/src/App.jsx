import { useState } from 'react'
import ResearchForm from './components/ResearchForm'
import ConfigPanel from './components/ConfigPanel'
import ProgressDisplay from './components/ProgressDisplay'
import ResultsViewer from './components/ResultsViewer'
import './styles/App.css'

function App() {
  const [config, setConfig] = useState({
    research_model: 'openai:gpt-4o',
    summarization_model: 'openai:gpt-4o-mini',
    compression_model: 'openai:gpt-4o',
    final_report_model: 'openai:gpt-4o',
    search_api: 'tavily',
    max_search_depth: 3,
    max_concurrent_queries: 5,
  })
  
  const [isResearching, setIsResearching] = useState(false)
  const [progress, setProgress] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleConfigChange = (newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
  }

  const handleStartResearch = async (query) => {
    setIsResearching(true)
    setProgress([{ message: 'Starting research...', timestamp: new Date() }])
    setResult(null)
    setError(null)

    // This will be implemented with actual API calls
    try {
      // Placeholder for API integration
      setProgress(prev => [...prev, { 
        message: `Researching: "${query}"`, 
        timestamp: new Date() 
      }])
      
      // Simulate research process
      setTimeout(() => {
        setProgress(prev => [...prev, { 
          message: 'Searching for information...', 
          timestamp: new Date() 
        }])
      }, 1000)

      setTimeout(() => {
        setProgress(prev => [...prev, { 
          message: 'Analyzing results...', 
          timestamp: new Date() 
        }])
      }, 2000)

      setTimeout(() => {
        setProgress(prev => [...prev, { 
          message: 'Generating report...', 
          timestamp: new Date() 
        }])
        
        setResult({
          query: query,
          report: '# Research Report\n\nThis is a placeholder report. The frontend is ready to integrate with the LangGraph backend API.\n\n## Overview\n\nThe research process has been initiated for: **' + query + '**\n\n## Next Steps\n\n1. Connect to LangGraph API endpoint\n2. Stream progress updates via WebSocket\n3. Display final research report\n\nThe system is configured with:\n- Research Model: ' + config.research_model + '\n- Search API: ' + config.search_api,
          timestamp: new Date()
        })
        setIsResearching(false)
      }, 3000)
    } catch (err) {
      setError(err.message)
      setIsResearching(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔬 Open Deep Research</h1>
        <p className="subtitle">AI-Powered Deep Research Agent</p>
      </header>

      <div className="app-container">
        <div className="main-content">
          <ResearchForm 
            onSubmit={handleStartResearch} 
            disabled={isResearching}
          />
          
          {isResearching && <ProgressDisplay progress={progress} />}
          
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {result && <ResultsViewer result={result} />}
        </div>

        <aside className="sidebar">
          <ConfigPanel 
            config={config} 
            onChange={handleConfigChange}
            disabled={isResearching}
          />
        </aside>
      </div>
    </div>
  )
}

export default App
