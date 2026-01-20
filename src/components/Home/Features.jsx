import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";
const Features = () => {
  const [isHover, setIsHover] = React.useState(false);
  return (
     <div id="features" className="flex flex-col items-center my-10 scroll-mt-12">
 <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border rounded-full px-6 py-1.5">
<Zap width={14} />
<span>Simple Process</span>
       </div>
       <Title title='Build your resume'  description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.  '/>

  <div className="flex flex-col md:flex-row items-center justify-center">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">AI-Powered Writing</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Get intelligent suggestions to improve your resume content and make it stand out.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Professional Templates</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Choose from multiple professionally designed templates to showcase your experience.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                            <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7,10 12,15 17,10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Easy Export & Share</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Download your resume as PDF or share it with a public link for easy access.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
  );
};

export default Features;