# Frontend-Backend Integration Guide

This guide explains how to integrate the React frontend with the LangGraph backend API.

## Architecture Overview

The frontend is built as a Single Page Application (SPA) using React and Vite. It communicates with the LangGraph backend through REST API calls.

```
┌─────────────────┐      HTTP/REST       ┌──────────────────┐
│                 │◄────────────────────►│                  │
│  React Frontend │    (Port 3000/8000)  │  LangGraph API   │
│   (Vite/SPA)    │                      │   (Port 2024)    │
│                 │                      │                  │
└─────────────────┘                      └──────────────────┘
```

## Current Implementation Status

### ✅ Completed
- React UI with modern design
- Configuration panel for models and settings
- Research form with validation
- Progress tracking display
- Markdown-rendered results viewer
- Copy and download functionality
- Responsive layout

### 🚧 To Be Implemented
- Real API integration with LangGraph backend
- WebSocket support for real-time streaming
- Error handling and retry logic
- Authentication (if needed)

## Integration Steps

### 1. API Service (`src/services/api.js`)

The API service is ready with methods for:
- Creating threads
- Starting research runs
- Polling for status
- Retrieving messages

**To enable real integration:**

1. Ensure the LangGraph backend is running on port 2024
2. Update the API base URL if needed (default: `http://localhost:2024`)
3. Uncomment the integration code in `src/hooks/useResearch.js`

### 2. Research Hook (`src/hooks/useResearch.js`)

The custom hook manages the research workflow. To enable:

```javascript
// In src/hooks/useResearch.js, uncomment the integration code:

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
}
```

### 3. WebSocket Integration (Optional)

For real-time progress updates, implement WebSocket streaming:

```javascript
// Example WebSocket integration
const streamResearch = async (threadId, runId) => {
  const ws = new WebSocket(`ws://localhost:2024/threads/${threadId}/runs/${runId}/stream`)
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    addProgressMessage(data.message)
  }
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
  
  ws.onclose = () => {
    console.log('Stream closed')
  }
}
```

## API Endpoints

The frontend expects these LangGraph API endpoints:

### Create Thread
```
POST /threads
Content-Type: application/json

{
  "metadata": {
    "created_at": "2025-11-19T08:00:00Z"
  }
}
```

### Start Research Run
```
POST /threads/{thread_id}/runs
Content-Type: application/json

{
  "assistant_id": "Deep Researcher",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": "Your research query here"
      }
    ]
  },
  "config": {
    "configurable": {
      "research_model": "openai:gpt-4o",
      "summarization_model": "openai:gpt-4o-mini",
      "compression_model": "openai:gpt-4o",
      "final_report_model": "openai:gpt-4o",
      "search_api": "tavily",
      "max_search_depth": 3,
      "max_concurrent_queries": 5
    }
  }
}
```

### Get Run Status
```
GET /threads/{thread_id}/runs/{run_id}
```

### Get Messages
```
GET /threads/{thread_id}/messages
```

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:2024

# Optional: Enable debug mode
VITE_DEBUG=false
```

### Model Options

The frontend supports these model configurations:

**Research Models:**
- openai:gpt-4o
- openai:gpt-4o-mini
- anthropic:claude-3-5-sonnet-20241022
- anthropic:claude-3-5-haiku-20241022
- google:gemini-2.0-flash-exp

**Search APIs:**
- tavily
- openai_native
- anthropic_native
- duckduckgo
- exa

## Development Workflow

1. **Start Backend:**
```bash
uvx --from "langgraph-cli[inmem]" --with-editable . --python 3.11 langgraph dev --allow-blocking
```

2. **Start Frontend:**
```bash
cd frontend
npm run dev
```

3. **Access Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:2024
- API Docs: http://localhost:2024/docs

## Testing

### Manual Testing
1. Enter a research query
2. Configure models and settings
3. Click "Start Research"
4. Observe progress updates
5. Review the generated report
6. Test copy and download functionality

### Integration Testing
```bash
# Test API connectivity
curl http://localhost:2024/health

# Test thread creation
curl -X POST http://localhost:2024/threads \
  -H "Content-Type: application/json" \
  -d '{"metadata": {}}'
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend has proper CORS configuration:

```python
# In backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Connection Refused
- Verify backend is running on port 2024
- Check firewall settings
- Ensure correct API URL in frontend configuration

### Streaming Not Working
- Check WebSocket support in backend
- Verify browser WebSocket compatibility
- Review network tab in browser DevTools

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

### Serve Built Files
The built files in `frontend/dist/` can be served by:
1. The included Python server: `python src/frontend_server.py`
2. Any static file server (nginx, Apache, etc.)
3. CDN or cloud hosting (Vercel, Netlify, etc.)

### Environment Configuration
Set production environment variables:
```env
VITE_API_URL=https://your-api-domain.com
```

## Future Enhancements

- [ ] Add authentication/authorization
- [ ] Implement WebSocket streaming
- [ ] Add research history/saved searches
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] Add collaborative features
- [ ] Implement caching for faster results
- [ ] Add analytics and usage tracking

## Support

For issues or questions:
- Check the main project README
- Review LangGraph documentation
- Open an issue on GitHub
