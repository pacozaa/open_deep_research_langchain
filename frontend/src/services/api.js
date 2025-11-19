import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2024'

class ResearchAPI {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Create a new thread for a research session
   */
  async createThread(metadata = {}) {
    try {
      const response = await this.client.post('/threads', {
        metadata: {
          ...metadata,
          created_at: new Date().toISOString(),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error creating thread:', error)
      throw error
    }
  }

  /**
   * Start a research run
   */
  async startResearch(threadId, query, config = {}) {
    try {
      const response = await this.client.post(`/threads/${threadId}/runs`, {
        assistant_id: 'Deep Researcher',
        input: {
          messages: [
            {
              role: 'user',
              content: query,
            },
          ],
        },
        config: {
          configurable: {
            research_model: config.research_model || 'openai:gpt-4o',
            summarization_model: config.summarization_model || 'openai:gpt-4o-mini',
            compression_model: config.compression_model || 'openai:gpt-4o',
            final_report_model: config.final_report_model || 'openai:gpt-4o',
            search_api: config.search_api || 'tavily',
            max_search_depth: config.max_search_depth || 3,
            max_concurrent_queries: config.max_concurrent_queries || 5,
          },
        },
      })
      return response.data
    } catch (error) {
      console.error('Error starting research:', error)
      throw error
    }
  }

  /**
   * Stream research progress
   */
  async streamRun(threadId, runId, onUpdate) {
    try {
      const response = await this.client.get(
        `/threads/${threadId}/runs/${runId}/stream`,
        {
          responseType: 'stream',
          headers: {
            Accept: 'text/event-stream',
          },
        }
      )

      // Note: This is a simplified version. In production, you'd use EventSource or similar
      // for proper SSE handling
      return response
    } catch (error) {
      console.error('Error streaming run:', error)
      throw error
    }
  }

  /**
   * Get run status
   */
  async getRunStatus(threadId, runId) {
    try {
      const response = await this.client.get(`/threads/${threadId}/runs/${runId}`)
      return response.data
    } catch (error) {
      console.error('Error getting run status:', error)
      throw error
    }
  }

  /**
   * Get thread messages
   */
  async getMessages(threadId) {
    try {
      const response = await this.client.get(`/threads/${threadId}/messages`)
      return response.data
    } catch (error) {
      console.error('Error getting messages:', error)
      throw error
    }
  }

  /**
   * Poll for run completion
   */
  async pollRunStatus(threadId, runId, interval = 2000) {
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await this.getRunStatus(threadId, runId)
          
          if (status.status === 'success' || status.status === 'error') {
            clearInterval(pollInterval)
            resolve(status)
          }
        } catch (error) {
          clearInterval(pollInterval)
          reject(error)
        }
      }

      const pollInterval = setInterval(poll, interval)
      poll() // Initial poll
    })
  }
}

export default new ResearchAPI()
