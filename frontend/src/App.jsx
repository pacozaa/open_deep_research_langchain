import { useState } from 'react'
import ResearchForm from './components/ResearchForm'
import ConfigPanel from './components/ConfigPanel'
import ProgressDisplay from './components/ProgressDisplay'
import ResultsViewer from './components/ResultsViewer'
import { useResearch } from './hooks/useResearch'
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
  
  const { isResearching, progress, result, error, startResearch } = useResearch()

  const handleConfigChange = (newConfig) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
  }

  const handleStartResearch = async (query) => {
    await startResearch(query, config)
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
