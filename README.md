# PDF Outline Extractor

A modern web application that extracts document structure and headings from PDF files. Built with React frontend and Express backend.

## Features

- 📄 **PDF Upload**: Drag & drop or click to upload PDF files
- 🎯 **Smart Extraction**: Automatically detects headings and document structure
- 📊 **Visual Hierarchy**: Displays headings with proper hierarchy (H1, H2, H3)
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- ⚡ **Fast Processing**: Optimized for quick PDF analysis
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PDF.js** for PDF processing
- **CORS** for cross-origin requests
- **express-fileupload** for file handling

### Frontend
- **React 19** with Vite
- **Axios** for API communication
- **Modern CSS** with gradients and animations
- **Responsive design** for all devices

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend/frontend
npm install
```

## Running the Application

### Option 1: Development Mode (Recommended)

#### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:3001`

#### Start the Frontend Development Server
```bash
cd frontend/frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Production Mode

#### Build the Frontend
```bash
cd frontend/frontend
npm run build
```

#### Start the Production Server
```bash
cd backend
npm start
```
The application will be available on `http://localhost:3001`

## Usage

1. **Upload a PDF**: Drag and drop a PDF file onto the upload area or click "Choose File"
2. **Wait for Processing**: The app will analyze the PDF and extract headings
3. **View Results**: See the document structure with proper hierarchy and page numbers

## API Endpoints

- `POST /api/extract-outline` - Upload and process PDF files
- `GET /api/health` - Health check endpoint

## File Structure

```
backend/
├── backend/
│   ├── server.js              # Express server
│   ├── pdfOutlineExtractor.js # PDF processing logic
│   └── package.json
└── frontend/
    └── frontend/
        ├── src/
        │   ├── App.jsx        # Main React component
        │   ├── App.css        # Styling
        │   └── main.jsx       # React entry point
        ├── package.json
        └── vite.config.js
```

## Features in Detail

### PDF Processing
- Extracts text content from PDF files
- Analyzes font sizes to determine heading hierarchy
- Identifies H1, H2, and H3 headings automatically
- Extracts document title from the first page

### User Interface
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Loading States**: Spinner animation during PDF processing
- **Error Handling**: Clear error messages for invalid files
- **Responsive Design**: Optimized for all screen sizes
- **Modern Styling**: Beautiful gradients and smooth animations

### Error Handling
- Validates PDF file type
- Handles file size limits (50MB max)
- Provides clear error messages
- Graceful fallbacks for processing errors

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Backend: Change port in `backend/server.js` (line 45)
   - Frontend: Vite will automatically find an available port

2. **CORS Errors**
   - Ensure the backend is running on port 3001
   - Check that CORS middleware is properly configured

3. **PDF Processing Fails**
   - Ensure the PDF file is not corrupted
   - Try with a different PDF file
   - Check browser console for detailed error messages

### Development Tips

- Use `npm run dev` for backend development (auto-restart on changes)
- Frontend hot-reloads automatically with Vite
- Check browser developer tools for frontend errors
- Monitor backend console for server-side errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue in the repository. 