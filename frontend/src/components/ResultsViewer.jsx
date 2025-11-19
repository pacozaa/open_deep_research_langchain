import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FileText, Download, Copy, Check } from 'lucide-react'

function ResultsViewer({ result }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([result.report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `research-report-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="results-viewer">
      <div className="results-header">
        <div className="results-title">
          <FileText size={24} />
          <h2>Research Report</h2>
        </div>
        <div className="results-actions">
          <button onClick={handleCopy} className="action-button" title="Copy to clipboard">
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleDownload} className="action-button" title="Download as Markdown">
            <Download size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="results-meta">
        <span className="meta-item">
          <strong>Query:</strong> {result.query}
        </span>
        <span className="meta-item">
          <strong>Completed:</strong> {result.timestamp.toLocaleString()}
        </span>
      </div>

      <div className="results-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {result.report}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default ResultsViewer
