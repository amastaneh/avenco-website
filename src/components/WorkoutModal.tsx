"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkoutModal({ isOpen, onClose }: WorkoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  // استیت‌های فرم
  const [goal, setGoal] = useState("کاهش وزن");
  const [sport, setSport] = useState("فوتبال سالنی");
  const [level, setLevel] = useState("مبتدی");

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    const systemPrompt = "You are a helpful and creative fitness assistant for Avenco Sports Club. Generate a simple, clear, and safe 3-day workout plan based on the user's preferences. The plan must be in Persian. Structure the response with clear headings for each day. Use HTML tags like <b>, <br>, <ul>, <li> for formatting.";
    const userQuery = `یک برنامه تمرینی ۳ روزه برای یک فرد ${level} با هدف ${goal} که ورزش مورد علاقه‌اش ${sport} است، ایجاد کن.`;
    
    // نکته امنیتی: در پروژه واقعی API Key را در سمت کلاینت نگذارید. برای سادگی اینجا گذاشته شده.
    const apiKey = ""; // کلید خود را اینجا وارد کنید
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (text) {
             // فرمت دهی ساده مارک‌داون به HTML
             let formatted = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
             setResult(formatted);
        } else {
            setResult("خطا در دریافت پاسخ.");
        }
    } catch (e) {
        setResult("خطا در ارتباط با سرور.");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-5 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative p-6 lg:p-8" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6">ساخت برنامه تمرینی شخصی</h2>

            {!result && !loading && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                         <div>
                            <label className="block font-semibold mb-2">هدف</label>
                            <select className="w-full p-2 border rounded-lg" value={goal} onChange={e => setGoal(e.target.value)}>
                                <option>کاهش وزن</option><option>عضله سازی</option><option>بهبود استقامت</option>
                            </select>
                         </div>
                         <div>
                            <label className="block font-semibold mb-2">ورزش</label>
                            <select className="w-full p-2 border rounded-lg" value={sport} onChange={e => setSport(e.target.value)}>
                                <option>فوتبال سالنی</option><option>والیبال سالنی</option><option>شنا</option>
                            </select>
                         </div>
                         <div>
                            <label className="block font-semibold mb-2">سطح</label>
                            <select className="w-full p-2 border rounded-lg" value={level} onChange={e => setLevel(e.target.value)}>
                                <option>مبتدی</option><option>متوسط</option><option>پیشرفته</option>
                            </select>
                         </div>
                    </div>
                    <button onClick={handleGenerate} className="w-full bg-brand text-white font-bold py-3 rounded-lg hover:bg-brand-dark transition-colors">
                        ایجاد برنامه هوشمند
                    </button>
                </div>
            )}

            {loading && (
                <div className="py-12 flex justify-center flex-col items-center">
                    <div className="loader mb-4"></div>
                    <p>در حال مشورت با هوش مصنوعی...</p>
                </div>
            )}

            {result && (
                <div className="mt-4 prose max-w-none text-right" dir="rtl">
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                    <button onClick={() => setResult(null)} className="mt-6 w-full bg-gray-100 py-2 rounded-lg">شروع مجدد</button>
                </div>
            )}
       </div>
    </div>
  );
}