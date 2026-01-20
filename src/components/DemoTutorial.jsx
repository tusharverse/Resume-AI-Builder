import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, FileText, User, Briefcase, GraduationCap, Award, Target } from 'lucide-react';

const DemoTutorial = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Resume Builder",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      content: "Learn how to create a high ATS-scoring resume that gets you noticed by recruiters and applicant tracking systems.",
      tips: [
        "ATS systems scan for keywords, formatting, and structure",
        "Use industry-specific keywords from job descriptions",
        "Keep formatting simple and consistent"
      ]
    },
    {
      title: "Step 1: Personal Information",
      icon: <User className="w-8 h-8 text-green-600" />,
      content: "Start with your contact information and professional summary. This section should be concise and impactful.",
      tips: [
        "Include your full name, phone, email, and location",
        "Write a 2-3 sentence professional summary",
        "Use keywords from the job description",
        "Avoid photos unless specifically requested"
      ]
    },
    {
      title: "Step 2: Work Experience",
      icon: <Briefcase className="w-8 h-8 text-purple-600" />,
      content: "List your work experience in reverse chronological order, focusing on achievements rather than duties.",
      tips: [
        "Use action verbs (achieved, implemented, managed)",
        "Include quantifiable results (increased sales by 30%)",
        "Tailor experience to match job requirements",
        "Keep descriptions to 4-6 bullet points per role"
      ]
    },
    {
      title: "Step 3: Education",
      icon: <GraduationCap className="w-8 h-8 text-orange-600" />,
      content: "Include your educational background, certifications, and relevant coursework.",
      tips: [
        "List degrees, institutions, and graduation dates",
        "Include GPA if above 3.5 (or omit if below)",
        "Add relevant certifications and coursework",
        "Place education after experience (unless recent graduate)"
      ]
    },
    {
      title: "Step 4: Skills & Keywords",
      icon: <Award className="w-8 h-8 text-red-600" />,
      content: "Highlight relevant skills and incorporate keywords from the job posting for better ATS matching.",
      tips: [
        "Include both hard and soft skills",
        "Use exact keywords from job descriptions",
        "Categorize skills (Technical, Soft Skills, Tools)",
        "Keep the list concise and relevant"
      ]
    },
    {
      title: "Step 5: Final Review",
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      content: "Review your resume, proofread carefully, and ensure it follows ATS-friendly formatting.",
      tips: [
        "Use standard fonts (Arial, Calibri, Times New Roman)",
        "Save as PDF to preserve formatting",
        "Use simple headings and bullet points",
        "Get feedback from others before applying",
        "Customize for each job application"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Resume Builder Tutorial</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              {currentStepData.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentStepData.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {currentStepData.content}
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              ATS Optimization Tips:
            </h4>
            <ul className="space-y-2">
              {currentStepData.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-blue-800">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoTutorial;