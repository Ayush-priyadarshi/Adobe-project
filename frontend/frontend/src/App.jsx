import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [outline, setOutline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }

    setLoading(true);
    setError(null);
    setOutline(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('/api/extract-outline', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOutline(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'H1': return '#2563eb';
      case 'H2': return '#7c3aed';
      case 'H3': return '#059669';
      default: return '#6b7280';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'H1': return '📋';
      case 'H2': return '📝';
      case 'H3': return '📄';
      default: return '•';
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📄</span>
            PDF Outline Extractor
          </h1>
          <p className="subtitle">
            Upload a PDF file to extract its structure and headings
          </p>
        </header>

        <main className="main">
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${loading ? 'loading' : ''}`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {loading ? (
              <div className="loading-content">
                <div className="spinner"></div>
                <p>Processing PDF...</p>
              </div>
            ) : (
              <>
                <div className="upload-icon">📁</div>
                <h3>Drop your PDF here</h3>
                <p>or</p>
                <label className="upload-button">
                  Choose File
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileInput}
                    disabled={loading}
                  />
                </label>
                <p className="upload-hint">Supports PDF files up to 50MB</p>
              </>
            )}
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {outline && (
            <div className="results">
              <div className="results-header">
                <h2>📖 Document Outline</h2>
                {outline.title && (
                  <div className="document-title">
                    <strong>Title:</strong> {outline.title}
                  </div>
                )}
              </div>
              
              <div className="outline-container">
                {outline.outline && outline.outline.length > 0 ? (
                  <div className="outline-list">
                    {outline.outline.map((item, index) => (
                      <div 
                        key={index} 
                        className="outline-item"
                        style={{ 
                          '--level-color': getLevelColor(item.level),
                          paddingLeft: `${(item.level === 'H1' ? 0 : item.level === 'H2' ? 20 : 40)}px`
                        }}
                      >
                        <span className="level-icon">{getLevelIcon(item.level)}</span>
                        <span className="level-badge" style={{ backgroundColor: getLevelColor(item.level) }}>
                          {item.level}
                        </span>
                        <span className="item-text">{item.text}</span>
                        <span className="page-number">Page {item.page}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-outline">
                    <p>No headings found in the PDF</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          <p>Built with React & Express</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

