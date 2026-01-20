import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MinimalTemplate from '../assets/templates/MinimalTemplate';
import ModernTemplate from '../assets/templates/ModernTemplate';
import ClassicTemplate from '../assets/templates/ClassicTemplate';
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate';

const Preview = () => {
  const { resumeID } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const renderTemplate = () => {
    if (!resume) return null;

    const templateMap = {
      minimal: MinimalTemplate,
      modern: ModernTemplate,
      classic: ClassicTemplate,
      minimalimage: MinimalImageTemplate,
    };

    const TemplateComponent = templateMap[resume.template] || MinimalTemplate;

    // Transform data to match template expectations
    const transformedData = {
      ...resume,
      personal_info: {
        ...resume.personal_info,
        full_name: resume.personal_info?.name,
      },
      professional_summary: resume.personal_info?.summary,
    };

    return <TemplateComponent data={transformedData} accentColor={resume.accent_color || '#3B82F6'} />;
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!resume) return <div>Resume not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Preview;