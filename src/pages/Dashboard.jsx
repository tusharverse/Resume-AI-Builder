import { FilePenLine, Pencil, Plus, Trash, UploadCloud } from "lucide-react";
import React, { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const loadAllResumes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/v1/resumes', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAllResumes(data.items || []);
      }
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/v1/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          title: 'New Resume',
          personal_info: {},
          experience: [],
          education: [],
          skills: [],
          projects: []
        })
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/app/builder/${data.resume._id}`);
      }
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please log in first to upload files.');
      return;
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOCX, DOC, or TXT file.');
      return;
    }

    setUploading(true);

    try {
      console.log('Starting file upload for:', file.name);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('resume', file);

      console.log('Uploading to Cloudinary...');

      // Upload file to Cloudinary and parse content
      const uploadResponse = await fetch('http://localhost:5001/api/v1/uploads/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });

      console.log('Upload response status:', uploadResponse.status);

      let uploadData = null;
      if (uploadResponse.ok) {
        uploadData = await uploadResponse.json();
        console.log('Upload successful:', uploadData);
      } else {
        console.warn('Upload to Cloudinary failed, proceeding with basic resume creation');
      }

      // Create resume with parsed data or basic template
      const resumeData = {
        title: `Resume from ${file.name}`,
        ...(uploadData?.parsedData || {
          personal_info: {
            name: 'Please edit your name',
            email: 'Please edit your email',
            phone: 'Please edit your phone',
            location: 'Please edit your location'
          },
          experience: [{ title: 'Please edit job title', company: 'Please edit company name', description: 'Please edit job description' }],
          education: [{ degree: 'Please edit your degree', institution: 'Please edit institution name' }],
          skills: ['Please edit your skills']
        }),
        template: 'minimal'
      };

      console.log('Creating resume with data:', resumeData);

      const resumeResponse = await fetch('http://localhost:5001/api/v1/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(resumeData)
      });

      console.log('Resume creation response status:', resumeResponse.status);

      if (resumeResponse.ok) {
        const data = await resumeResponse.json();
        console.log('Resume created successfully:', data);

        // Store file URL for later access if upload was successful
        if (uploadData?.fileUrl) {
          localStorage.setItem(`uploaded_file_${data.resume._id}`, uploadData.fileUrl);
        }

        // Reset file input
        event.target.value = '';

        alert(`✅ File "${file.name}" uploaded successfully!\n\nA resume has been created. You can now edit the content and view your uploaded file in the resume builder.`);
        navigate(`/app/builder/${data.resume._id}`);
      } else {
        const errorData = await resumeResponse.json().catch(() => ({}));
        console.error('Resume creation failed:', errorData);
        throw new Error(errorData.message || `Resume creation failed (${resumeResponse.status})`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(`Upload failed: ${error.message}. Please try again or create a resume manually.`);
    } finally {
      setUploading(false);
    }
  };

  const deleteResume = async (resumeId) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    setDeleting(resumeId);
    try {
      const response = await fetch(`http://localhost:5001/api/v1/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.ok) {
        setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));
        alert('Resume deleted successfully!');
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, {user?.name || 'User'}
        </p>
        <div className="flex gap-4">
          <button onClick={createResume} className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <Plus className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className=" text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>
          <>
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => document.getElementById('resume-upload').click()}
              disabled={uploading}
              className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              <UploadCloud className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
              <p className=" text-sm group-hover:text-purple-600 transition-all duration-300">
                {uploading ? 'Uploading...' : 'Upload Existing'}
              </p>
            </button>
          </>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />
        <div>
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return(
            <button
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40 )`,
                borderColor: baseColor + "40",
              }}>
              <FilePenLine className="size-7 group-hover:scale-105 transition-all" style={{color:baseColor}} />

              <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{color:baseColor}}>{resume.title}</p>
              <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center" style={{color:baseColor + '90'}}> 
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                  disabled={deleting === resume._id}
                  className="p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors disabled:opacity-50"
                >
                  <Trash className="size-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/app/builder/${resume._id}`);
                  }}
                  className="p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                >
                  <Pencil className="size-5" />
                </button>
              </div>
            </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
