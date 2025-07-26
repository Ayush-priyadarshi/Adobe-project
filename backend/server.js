const express = require('express');
const fileUpload = require('express-fileupload');
const { extractOutline } = require('./pdfOutlineExtractor');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  abortOnLimit: true,
}));

// API Routes
app.post('/api/extract-outline', async (req, res) => {
    if (!req.files || !req.files.pdf) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    const file = req.files.pdf;
    
    // Validate file type
    if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Please upload a valid PDF file' });
    }
    
    try {
        const outline = await extractOutline(file.data);
        res.json(outline);
    } catch (error) {
        console.error('PDF processing error:', error);
        res.status(500).json({ error: 'Failed to process PDF. Please try again.' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'PDF Outline Extractor API is running' });
});

// frontend serving
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

