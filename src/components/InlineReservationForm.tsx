"use client";

import { useState, useEffect, FormEvent } from "react";
import { CheckCircle, Loader2, Calendar, Clock, User, Phone, FileText } from "lucide-react";

const persianMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default function InlineReservationForm({ clubName }) {
    const [step, setStep] = useState<"form" | "success" | "failure">("form");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        people: "1",
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        notes: ""
    });
    const [dateOptions, setDateOptions] = useState<{ years: number[], days: number[] }>({ years: [], days: [] });

    useEffect(() => {
        const now = new Date();
        const dtf = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        const parts = dtf.formatToParts(now);
        const get = (type: string) => parts.find(p => p.type === type)?.value ?? "";

        const jy = get("year");
        const jm = get("month"); // 1..12
        const jd = get("day");   // 1..31

        // Round time to next quarter-hour (and handle day rollover safely)
        const next = new Date(now.getTime() + 60 * 60 * 1000);
        const m = next.getMinutes();
        const quarters = [0, 15, 30, 45];
        let nextMin = quarters.find(q => q >= m);
        if (nextMin === undefined) {
            next.setHours(next.getHours() + 1);
            nextMin = 0;
        }
        next.setMinutes(nextMin, 0, 0);

        setDateOptions({
            years: [Number(jy), Number(jy) + 1],
            days: Array.from({ length: 31 }, (_, i) => i + 1),
        });

        setFormData(prev => ({
            ...prev,
            year: jy,
            month: jm,
            day: jd,
            hour: String(next.getHours()).padStart(2, "0"),
            minute: String(next.getMinutes()).padStart(2, "0"),
        }));
    }, []);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const monthName = persianMonths[parseInt(formData.month) - 1];

        const payload = {
            club: clubName,
            name: formData.name,
            phone: formData.phone,
            people: formData.people,
            date: `${formData.year}-${monthName}-${formData.day}`,
            time: `${formData.hour}:${formData.minute}`,
            notes: formData.notes,
            page: window.location.href,
        };

        try {
            const response = await fetch("/api/reserve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                setStep("success");
            }
            else {
                console.error(response);
                setStep("failure");
            }
        } catch (error) {
            console.error(error);
            setStep("failure");
        } finally {
            setLoading(false);
        }
    };

    // 1- Success Step
    if (step === "success") {
        return (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">درخواست شما ثبت شد</h3>
                <p className="text-gray-600">همکاران ما جهت هماهنگی نهایی به زودی با شما تماس خواهند گرفت.</p>
                <button onClick={() => setStep("form")} className="mt-6 text-green-600 font-semibold hover:underline">
                    ثبت رزرو جدید
                </button>
            </div>
        );
    }

    // 2- Failure Step
    if (step === "failure") {
        return (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center shadow-sm">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">خطا در ثبت درخواست</h3>
                <p className="text-gray-600">متاسفانه در ثبت درخواست شما مشکلی پیش آمد. لطفاً مستقلماً با باشگاه تماس بگیرید.</p>
                <button onClick={() => setStep("form")} className="mt-6 text-red-600 font-semibold hover:underline">
                    تلاش مجدد برای ثبت رزرو
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-10">
            <div className="mb-8 border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-800">رزرو آنلاین سانس</h3>
                <p className="text-gray-500 mt-2">لطفاً اطلاعات زیر را جهت هماهنگی وارد نمایید.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">نام و نام خانوادگی</label>
                        <div className="relative">
                            <User className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                required
                                type="text"
                                placeholder="مثال: علی محمدی"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                name="name"
                                autoComplete="name"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">شماره تماس</label>
                        <div className="relative">
                            <Phone className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-left"
                                required
                                type="tel"
                                placeholder="0912..."
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                name="tel"
                                autoComplete="tel"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">تاریخ</label>
                        <div className="flex gap-2">
                            <select className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-blue-500" value={formData.day} onChange={e => setFormData({ ...formData, day: e.target.value })}>
                                {dateOptions.days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <select className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-blue-500" value={formData.month} onChange={e => setFormData({ ...formData, month: e.target.value })}>
                                {persianMonths.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ساعت</label>
                        <div className="relative flex items-center">
                            <Clock className="absolute right-3 text-gray-400 w-5 h-5 z-5" />
                            <div className="flex w-full gap-2">
                                <select className="w-full pr-10 pl-2 py-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-blue-500" value={formData.hour} onChange={e => setFormData({ ...formData, hour: e.target.value })}>
                                    {Array.from({ length: 16 }, (_, i) => i + 7).map(h => { // 7am to 10pm
                                        const val = String(h).padStart(2, '0');
                                        return <option key={val} value={val}>{val}</option>;
                                    })}
                                </select>
                                <span className="self-center font-bold">:</span>
                                <select className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-blue-500" value={formData.minute} onChange={e => setFormData({ ...formData, minute: e.target.value })}>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">تعداد نفرات</label>
                        <select className="w-full p-3 border border-gray-200 rounded-xl bg-white outline-none focus:border-blue-500"
                            value={formData.people} onChange={e => setFormData({ ...formData, people: e.target.value })}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} نفر</option>)}
                            <option value="+10">بیشتر از ۱۰ نفر</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">توضیحات تکمیلی</label>
                    <div className="relative">
                        <FileText className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                        <textarea rows={3} className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                            placeholder="اگر نکته خاصی وجود دارد اینجا بنویسید..."
                            value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                    </div>
                </div>

                <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2 transform active:scale-[0.99]">
                    {loading ? <Loader2 className="animate-spin" /> : "ثبت نهایی و رزرو سانس"}
                </button>
            </form>
        </div>
    );
}