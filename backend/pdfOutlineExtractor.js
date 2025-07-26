const pdfParse = require('pdf-parse');

async function extractOutline(pdfBuffer) {
    try {
        // Parse the PDF
        const data = await pdfParse(pdfBuffer);
        
        // Split text into lines
        const lines = data.text.split('\n').filter(line => line.trim().length > 0);
        
        const headingCandidates = [];
        let title = "";
        
        // Simple heuristic: lines that are shorter and contain common heading words
        const headingWords = ['chapter', 'section', 'part', 'introduction', 'conclusion', 'summary', 'abstract'];
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Skip very long lines (likely paragraphs)
            if (trimmedLine.length > 100) return;
            
            // Check if line contains heading-like patterns
            const isHeading = headingWords.some(word => 
                trimmedLine.toLowerCase().includes(word)
            ) || 
            // Check for numbered headings (1., 2., etc.)
            /^\d+\./.test(trimmedLine) ||
            // Check for all caps (common for headings)
            trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3;
            
            if (isHeading) {
                headingCandidates.push({
                    text: trimmedLine,
                    level: determineLevel(trimmedLine),
                    page: Math.floor(index / 50) + 1 // Rough page estimation
                });
            }
        });
        
        // If no headings found, use first few lines as potential headings
        if (headingCandidates.length === 0) {
            lines.slice(0, 10).forEach((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine.length > 3 && trimmedLine.length < 100) {
                    headingCandidates.push({
                        text: trimmedLine,
                        level: index === 0 ? 'H1' : 'H2',
                        page: 1
                    });
                }
            });
        }
        
        // Use the first line as title
        title = lines[0]?.trim() || "Untitled Document";
        
        return { 
            title, 
            outline: headingCandidates.slice(0, 20) // Limit to first 20 headings
        };
        
    } catch (error) {
        console.error('PDF parsing error:', error);
        throw new Error('Failed to parse PDF file');
    }
}

function determineLevel(text) {
    const lowerText = text.toLowerCase();
    
    // H1: Chapter, Part, Introduction, etc.
    if (lowerText.includes('chapter') || lowerText.includes('part') || 
        lowerText.includes('introduction') || lowerText.includes('conclusion')) {
        return 'H1';
    }
    
    // H2: Section, Summary, etc.
    if (lowerText.includes('section') || lowerText.includes('summary') || 
        lowerText.includes('abstract')) {
        return 'H2';
    }
    
    // H3: Everything else
    return 'H3';
}

module.exports = { extractOutline };
