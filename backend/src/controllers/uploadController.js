const { cloudinary, upload } = require('../config/cloudinary');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Presign stub — this scaffold returns a generic uploadUrl/fileUrl and does
// not require a bucket. Replace with your provider implementation (S3/GCS/etc.)
// when integrating real storage. If using S3 you may optionally configure
// region/credentials in env vars; bucket usage is optional and depends on your provider.
exports.presign = async (req, res, next) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename || !contentType) return res.status(400).json({ message: 'Missing' });
    // Return a fake signed URL and a resulting file URL — replace with S3 presign logic
    const uploadUrl = `https://fake-storage.example.com/upload/${encodeURIComponent(filename)}`;
    const fileUrl = `https://cdn.example.com/${encodeURIComponent(filename)}`;
    res.json({ uploadUrl, fileUrl });
  } catch (err) { next(err); }
};

// Parse file content based on type
const parseFileContent = async (buffer, mimetype) => {
  try {
    if (mimetype === 'text/plain') {
      return buffer.toString('utf-8');
    }
    // For now, return placeholder for PDF and DOC files
    // TODO: Implement full parsing
    return 'File uploaded successfully. Please edit the resume content manually.';
  } catch (error) {
    console.error('Error parsing file:', error);
    return 'Error parsing file. Please edit manually.';
  }
};

// Extract resume data from parsed text
const extractResumeData = (text) => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);

  const personalInfo = {};
  const experience = [];
  const education = [];
  const skills = [];

  let currentSection = '';

  for (const line of lines) {
    // Extract email
    if (line.includes('@') && !personalInfo.email) {
      personalInfo.email = line;
    }
    // Extract phone
    else if (/\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(line) && !personalInfo.phone) {
      personalInfo.phone = line;
    }
    // Extract name
    else if (!personalInfo.name && line.split(' ').length <= 4 && line === line.toUpperCase()) {
      personalInfo.name = line;
    }
    // Section detection
    else if (line.toLowerCase().includes('experience')) {
      currentSection = 'experience';
    }
    else if (line.toLowerCase().includes('education')) {
      currentSection = 'education';
    }
    else if (line.toLowerCase().includes('skills')) {
      currentSection = 'skills';
    }
    // Add content to sections
    else if (currentSection === 'experience' && line.length > 10) {
      experience.push({ title: line, company: '', description: '' });
    }
    else if (currentSection === 'education' && line.length > 10) {
      education.push({ degree: line, institution: '' });
    }
    else if (currentSection === 'skills') {
      skills.push(...line.split(',').map(s => s.trim()));
    }
  }

  return {
    personal_info: personalInfo,
    experience,
    education,
    skills: skills.filter(skill => skill.length > 0)
  };
};

// Handle file upload with parsing
exports.uploadResume = [
  upload.single('resume'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const file = req.file;
      const fileUrl = file.path; // Cloudinary URL

      // Parse file content
      const text = await parseFileContent(file.buffer, file.mimetype);
      const parsedData = extractResumeData(text);

      // Return parsed data and file URL
      res.json({
        fileUrl,
        parsedData,
        filename: file.originalname,
        message: 'File uploaded and parsed successfully'
      });

    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Upload failed', error: error.message });
    }
  }
];