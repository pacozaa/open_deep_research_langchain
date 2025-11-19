import { useState, useCallback } from 'react'
// import api from '../services/api' // Uncomment when integrating with backend

/**
 * Custom hook for managing research operations
 * This hook will handle the integration with the LangGraph backend
 */
export function useResearch() {
  const [isResearching, setIsResearching] = useState(false)
  const [progress, setProgress] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const addProgressMessage = useCallback((message) => {
    setProgress(prev => [...prev, { 
      message, 
      timestamp: new Date() 
    }])
  }, [])

  const startResearch = useCallback(async (query, config) => {
    setIsResearching(true)
    setProgress([{ message: 'Starting research...', timestamp: new Date() }])
    setResult(null)
    setError(null)

    try {
      // TODO: Integrate with actual LangGraph backend
      // Uncomment the following code when backend is ready:
      
      /*
      // Create a thread
      addProgressMessage('Creating research session...')
      const thread = await api.createThread({ query })
      
      // Start the research run
      addProgressMessage(`Researching: "${query}"`)
      const run = await api.startResearch(thread.thread_id, query, config)
      
      // Poll for completion
      addProgressMessage('Searching for information...')
      const finalStatus = await api.pollRunStatus(thread.thread_id, run.run_id)
      
      if (finalStatus.status === 'success') {
        addProgressMessage('Generating report...')
        const messages = await api.getMessages(thread.thread_id)
        
        // Extract the final report from messages
        const lastMessage = messages[messages.length - 1]
        const report = lastMessage.content
        
        setResult({
          query: query,
          report: report,
          timestamp: new Date()
        })
      } else {
        throw new Error('Research failed: ' + finalStatus.error)
      }
      */

      // Placeholder implementation - simulates the research process
      addProgressMessage(`Researching: "${query}"`)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      addProgressMessage('Searching for information...')
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      addProgressMessage('Analyzing results...')
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      addProgressMessage('Generating report...')
      
      setResult({
        query: query,
        report: `# Research Report\n\nThis is a placeholder report. The frontend is ready to integrate with the LangGraph backend API.\n\n## Overview\n\nThe research process has been initiated for: **${query}**\n\n## Next Steps\n\n1. Connect to LangGraph API endpoint\n2. Stream progress updates via WebSocket\n3. Display final research report\n\nThe system is configured with:\n- Research Model: ${config.research_model}\n- Search API: ${config.search_api}`,
        timestamp: new Date()
      })
    } catch (err) {
      setError(err.message)
      addProgressMessage(`Error: ${err.message}`)
    } finally {
      setIsResearching(false)
    }
  }, [addProgressMessage])

  return {
    isResearching,
    progress,
    result,
    error,
    startResearch,
  }
}
