import { Settings } from 'lucide-react'

function ConfigPanel({ config, onChange, disabled }) {
  const handleChange = (key, value) => {
    onChange({ [key]: value })
  }

  return (
    <div className="config-panel">
      <h3>
        <Settings size={20} />
        Configuration
      </h3>

      <div className="config-section">
        <h4>Models</h4>
        
        <div className="config-item">
          <label>Research Model</label>
          <select
            value={config.research_model}
            onChange={(e) => handleChange('research_model', e.target.value)}
            disabled={disabled}
          >
            <option value="openai:gpt-4o">GPT-4o</option>
            <option value="openai:gpt-4o-mini">GPT-4o Mini</option>
            <option value="anthropic:claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
            <option value="anthropic:claude-3-5-haiku-20241022">Claude 3.5 Haiku</option>
            <option value="google:gemini-2.0-flash-exp">Gemini 2.0 Flash</option>
          </select>
        </div>

        <div className="config-item">
          <label>Summarization Model</label>
          <select
            value={config.summarization_model}
            onChange={(e) => handleChange('summarization_model', e.target.value)}
            disabled={disabled}
          >
            <option value="openai:gpt-4o-mini">GPT-4o Mini</option>
            <option value="openai:gpt-4o">GPT-4o</option>
            <option value="anthropic:claude-3-5-haiku-20241022">Claude 3.5 Haiku</option>
          </select>
        </div>

        <div className="config-item">
          <label>Compression Model</label>
          <select
            value={config.compression_model}
            onChange={(e) => handleChange('compression_model', e.target.value)}
            disabled={disabled}
          >
            <option value="openai:gpt-4o">GPT-4o</option>
            <option value="openai:gpt-4o-mini">GPT-4o Mini</option>
            <option value="anthropic:claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
          </select>
        </div>

        <div className="config-item">
          <label>Final Report Model</label>
          <select
            value={config.final_report_model}
            onChange={(e) => handleChange('final_report_model', e.target.value)}
            disabled={disabled}
          >
            <option value="openai:gpt-4o">GPT-4o</option>
            <option value="anthropic:claude-3-5-sonnet-20241022">Claude 3.5 Sonnet</option>
            <option value="google:gemini-2.0-flash-exp">Gemini 2.0 Flash</option>
          </select>
        </div>
      </div>

      <div className="config-section">
        <h4>Search Settings</h4>
        
        <div className="config-item">
          <label>Search API</label>
          <select
            value={config.search_api}
            onChange={(e) => handleChange('search_api', e.target.value)}
            disabled={disabled}
          >
            <option value="tavily">Tavily</option>
            <option value="openai_native">OpenAI Native</option>
            <option value="anthropic_native">Anthropic Native</option>
            <option value="duckduckgo">DuckDuckGo</option>
            <option value="exa">Exa</option>
          </select>
        </div>

        <div className="config-item">
          <label>Max Search Depth</label>
          <input
            type="number"
            value={config.max_search_depth}
            onChange={(e) => handleChange('max_search_depth', parseInt(e.target.value))}
            disabled={disabled}
            min="1"
            max="10"
          />
        </div>

        <div className="config-item">
          <label>Max Concurrent Queries</label>
          <input
            type="number"
            value={config.max_concurrent_queries}
            onChange={(e) => handleChange('max_concurrent_queries', parseInt(e.target.value))}
            disabled={disabled}
            min="1"
            max="20"
          />
        </div>
      </div>

      <div className="config-info">
        <p>💡 Configuration is applied to the next research session</p>
      </div>
    </div>
  )
}

export default ConfigPanel
