# Open Deep Research Frontend

A modern React-based frontend for the Open Deep Research agent, providing an intuitive interface for conducting AI-powered research.

## Features

- 🎨 Modern, responsive UI with dark theme
- 📝 Interactive research input form
- ⚙️ Configurable model and search settings
- 📊 Real-time progress tracking
- 📄 Markdown-rendered research reports
- 💾 Download and copy functionality
- 🚀 Built with Vite for fast development

## Prerequisites

- Node.js 18+ and npm
- Running LangGraph backend (see main project README)

## Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

The frontend connects to the LangGraph backend API. By default, it expects the backend to be running at `http://localhost:2024`.

To change the API URL, create a `.env` file:

```env
VITE_API_URL=http://your-api-url:port
```

## Project Structure

```
frontend/
├── src/
│   ├── components/         # React components
│   │   ├── ResearchForm.jsx
│   │   ├── ConfigPanel.jsx
│   │   ├── ProgressDisplay.jsx
│   │   └── ResultsViewer.jsx
│   ├── services/          # API services
│   │   └── api.js
│   ├── styles/            # CSS styles
│   │   ├── index.css
│   │   └── App.css
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── package.json           # Dependencies
└── vite.config.js         # Vite configuration
```

## Available Settings

### Model Configuration
- **Research Model**: The main LLM used for conducting research
- **Summarization Model**: Model for summarizing search results
- **Compression Model**: Model for compressing research findings
- **Final Report Model**: Model for generating the final report

### Search Settings
- **Search API**: Choose between Tavily, OpenAI Native, Anthropic Native, DuckDuckGo, or Exa
- **Max Search Depth**: Maximum depth of recursive searches (1-10)
- **Max Concurrent Queries**: Number of parallel search queries (1-20)

## Integration with Backend

The frontend integrates with the LangGraph backend through REST API calls:

1. Creates a new thread for each research session
2. Starts a research run with the query and configuration
3. Polls for status updates
4. Retrieves and displays the final report

## Contributing

Contributions are welcome! Please ensure:
- Code follows the existing style
- Components are well-documented
- CSS is organized and maintainable

## License

MIT License - See main project LICENSE file
