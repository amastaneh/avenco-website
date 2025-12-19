// src/data/clubs.ts

export interface Club {
    id: number;
    name: string;
    image: string;
    description: string;
    reservable: boolean;
    slug: string;
    page: {
        features?: Array<string | {
            icon: string;
            text: string
        }>;
        tagline?: string;
        description?: string;
        hours?: {
            men: Array<{
                day: string;
                open: string;
                close: string;
            }>;
            women: Array<{
                day: string;
                open: string;
                close: string;
            }>;
        };
        gallery?: Array<{
            url: string;
            type: string;
            caption: string;
            poster?: string;
        }>;
        address?: string;
        mapLink?: string;
        mapEmbed?: string;
        phone?: string;
    };
}

export const clubsData: Club[] = [
    {
        id: 1,
        name: "استخر کارگران اسفراین",
        image: "/images/avenco-esfarayen.jpeg",
        description: "آب‌های زلال، محیطی آرام، برای شنا و آب‌درمانی.",
        reservable: true,
        slug: "esfarayen-kargaran-pool",
        page: {
            features: [
                { icon: "🏊‍♂️", text: "استخر شنا با آب زلال و تمیز" },
                { icon: "🧖‍♀️", text: "سونای خشک و بخار برای آرامش عضلات" },
                { icon: "💆‍♂️", text: "جکوزی گرم برای رفع خستگی" },
                { icon: "☕", text: "کافی‌شاپ با محیطی دلنشین" },
                { icon: "🧼", text: "محیطی کاملاً تمیز و استاندارد" },
            ],
            tagline: "آب‌های زلال، محیطی آرام، برای شنا و آب‌درمانی.",
            description: `
اگر دنبال جایی هستید که چند ساعت را از تمام شلوغی‌های روزمره فرار کنید و فقط به آرامش خودتان برسید، ما دقیقا همان‌جاییم.
✨ در استخر ما ترکیبی از آب زلال، فضای آرام، امکانات لوکس و تیم حرفه‌ای منتظر شماست تا تجربه‌ای متفاوت بسازید.
از شنا و ریلکس‌کردن گرفته تا سونای خشک و بخار، جکوزی گرم و محیطی کاملاً تمیز و استاندارد… همه چیز برای یک روز فوق‌العاده آماده است.
بیایید و به خودتان یک هدیه واقعی بدهید؛ آرامشی که لایقش هستید.
            `,
            hours: {
                men: [
                    { day: "شنبه", open: "18:00", close: "23:00" },
                    { day: "یکشنبه", open: "18:00", close: "23:00" },
                    { day: "دوشنبه", open: "18:00", close: "23:00" },
                    { day: "چهارشنبه", open: "18:00", close: "23:00" },
                    { day: "پنج‌شنبه", open: "18:00", close: "23:00" },
                    { day: "جمعه", open: "18:00", close: "23:00" },
                ],
                women: [
                    { day: "یکشنبه", open: "13:00", close: "17:00" },
                    { day: "سه‌شنبه", open: "18:00", close: "22:00" },
                    { day: "پنج‌شنبه", open: "13:00", close: "17:00" },
                    { day: "جمعه", open: "13:00", close: "17:00" },
                ],
            },
            gallery: [
                { url: "/images/esfarayen-swimming-pool-01.jpg", poster: "/images/esfarayen-swimming-pool-01.jpg", type: "image", caption: "مسیر صحیح خیابون های منتهی به استخر" },
                { url: "/images/esfarayen-swimming-pool-02.mp4", poster: "/images/esfarayen-swimming-pool-02.jpg", type: "video", caption: "نمایی از استخر کارگران اسفراین" },
                { url: "/images/esfarayen-swimming-pool-03.mp4", poster: "/images/esfarayen-swimming-pool-03.jpg", type: "video", caption: "نمایی از استخر کارگران اسفراین" },
                { url: "/images/esfarayen-swimming-pool-04.mp4", poster: "/images/esfarayen-swimming-pool-04.jpg", type: "video", caption: "نمایی از استخر کارگران اسفراین" },
                { url: "/images/esfarayen-swimming-pool-05.mp4", poster: "/images/esfarayen-swimming-pool-05.jpg", type: "video", caption: "نمایی از استخر کارگران اسفراین" },
                { url: "/images/esfarayen-swimming-pool-06.mp4", poster: "/images/esfarayen-swimming-pool-06.jpg", type: "video", caption: "نمایی از استخر کارگران اسفراین" },
            ],
            address: "اسفراین، انتهای بلوار شهید فهمیده (روستای فرطان)، مجموعه ورزشی کارگران",
            phone: "905-242-0022",
            mapLink: "https://maps.app.goo.gl/wGqLFShM65MAAXGp8",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1689.7169840549632!2d57.539614837717394!3d37.05679003625834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f7105a6cee43629%3A0xc9267c8530f66428!2z2KfYs9iq2K7YsSDYtNmG2KfbjCDaqdin2LHar9ix2KfZhiDYp9iz2YHYsdin24zZhg!5e1!3m2!1sen!2sca!4v1766165361669!5m2!1sen!2sca",
        },
    },
    {
        id: 2,
        name: "باشگاه چند منظوره سیمرغ قوچان",
        image: "/images/avenco-quchan-simurgh.jpeg",
        description: "فوتسال، والیبال، هندبال، بدمینتون و اسکیت",
        reservable: true,
        slug: "quchan-simurgh-pool",
        page: {
            features: [
                { icon: "⚽", text: "زمین فوتسال سرپوشیده" },
                { icon: "🏐", text: "زمین والیبال" },
                { icon: "🏸", text: "زمین بدمینتون" },
                { icon: "⛸️", text: "زمین اسکیت" },
            ],
        }
    },
    {
        id: 3,
        name: "باشگاه حجاب قوچان",
        image: "/images/avenco-quchan-hejab.jpeg",
        description: "فوتسال، والیبال، هندبال، بدمینتون و اسکیت",
        reservable: false,
        slug: "quchan-hejab-club",
        page: {
            features: [
                { icon: "⚽", text: "زمین فوتسال سرپوشیده" },
                { icon: "🏐", text: "زمین والیبال" },
                { icon: "🏸", text: "زمین بدمینتون" },
                { icon: "⛸️", text: "زمین اسکیت" },
            ],
        }
    },
];