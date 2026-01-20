import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft } from 'lucide-react';

const ResumeBuilder = () => {
  const { resumeID } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadResume();
  }, [resumeID]);

  const loadResume = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/resumes/${resumeID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setResume(data.resume);
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:5001/api/v1/resumes/${resumeID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(resume)
      });
      if (response.ok) {
        alert('Resume saved successfully!');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateResume = (field, value) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const updatePersonalInfo = (field, value) => {
    setResume(prev => ({
      ...prev,
      personal_info: { ...prev.personal_info, [field]: value }
    }));
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!resume) return <div>Resume not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/app')} className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={resume.title}
              onChange={(e) => updateResume('title', e.target.value)}
              className="text-xl font-semibold border-none outline-none bg-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveResume}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => navigate(`/view/${resumeID}`)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={async () => {
                const fileUrl = localStorage.getItem(`uploaded_file_${resumeID}`);
                if (fileUrl) {
                  try {
                    // Try to open in new tab first
                    const newWindow = window.open(fileUrl, '_blank');
                    if (!newWindow) {
                      // If popup blocked, try to download instead
                      const link = document.createElement('a');
                      link.href = fileUrl;
                      link.download = 'original_resume';
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  } catch (error) {
                    console.error('Error opening file:', error);
                    alert('Unable to open the file. It may have been deleted or access may be restricted.');
                  }
                } else {
                  alert('No uploaded file found for this resume.');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              📄 View Original File
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={resume.personal_info?.name || ''}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                className="p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={resume.personal_info?.email || ''}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="p-3 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={resume.personal_info?.phone || ''}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="p-3 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Location"
                value={resume.personal_info?.location || ''}
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
                className="p-3 border border-gray-300 rounded"
              />
            </div>
            <textarea
              placeholder="Summary"
              value={resume.personal_info?.summary || ''}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-4"
              rows="4"
            />
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <textarea
              placeholder="Enter your skills (one per line or separated by commas)"
              value={Array.isArray(resume.skills) ? resume.skills.join('\n') : (resume.skills || '')}
              onChange={(e) => {
                const value = e.target.value;
                // Allow both comma-separated and newline-separated skills
                const skills = value.split(/[\n,]/).map(s => s.trim()).filter(s => s.length > 0);
                updateResume('skills', skills);
              }}
              className="w-full p-3 border border-gray-300 rounded"
              rows="4"
            />
          </div>

          {/* Experience */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            <div className="space-y-4">
              {(resume.experience || []).map((exp, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title || ''}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[index] = { ...newExp[index], title: e.target.value };
                      updateResume('experience', newExp);
                    }}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company || ''}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[index] = { ...newExp[index], company: e.target.value };
                      updateResume('experience', newExp);
                    }}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={exp.description || ''}
                    onChange={(e) => {
                      const newExp = [...resume.experience];
                      newExp[index] = { ...newExp[index], description: e.target.value };
                      updateResume('experience', newExp);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                  />
                </div>
              ))}
              <button
                onClick={() => updateResume('experience', [...(resume.experience || []), {}])}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Experience
              </button>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {(resume.education || []).map((edu, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree || ''}
                    onChange={(e) => {
                      const newEdu = [...resume.education];
                      newEdu[index] = { ...newEdu[index], degree: e.target.value };
                      updateResume('education', newEdu);
                    }}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution || ''}
                    onChange={(e) => {
                      const newEdu = [...resume.education];
                      newEdu[index] = { ...newEdu[index], institution: e.target.value };
                      updateResume('education', newEdu);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              ))}
              <button
                onClick={() => updateResume('education', [...(resume.education || []), {}])}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Education
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;