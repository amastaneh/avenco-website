// src/app/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { clubsData } from "@/data/clubs";
import { MapPin, Phone, User, Clock, Info } from "lucide-react";
import InlineReservationForm from "@/components/InlineReservationForm";
import MasonryGallery from "@/components/MasonryGallery";
import { toPersianDigits } from "@/utils/numbers";


// Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const club = clubsData.find((c) => c.slug === slug);
    if (!club) return { title: "یافت نشد" };

    return {
        title: `${club.name} | آونکو`,
        description: club.description,
    };
}

// Static Params Generation
export async function generateStaticParams() {
    return clubsData.map((club) => ({
        slug: club.slug,
    }));
}

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const club = clubsData.find((c) => c.slug === slug);

    if (!club) notFound();

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] lg:h-[60vh]">
                <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent flex flex-col justify-end p-6 lg:p-12 text-white">
                    <div className="container mx-auto max-w-5xl">
                        <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-bold rounded-full mb-3 shadow-lg">
                            {club.reservable ? "آماده رزرو" : "تکمیل ظرفیت"}
                        </span>
                        <h1 className="text-3xl lg:text-5xl font-bold mb-3 drop-shadow-md">{club.name}</h1>
                        {club.page.tagline && (
                            <p className="text-lg text-gray-200 font-light max-w-2xl mb-4">{club.page.tagline}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-6 max-w-5xl -mt-8 relative z-2 space-y-8">

                {/* Intro Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Info className="text-blue-600" />
                                درباره مجموعه
                            </h2>
                            <div className="prose prose-gray max-w-none text-justify whitespace-pre-line leading-relaxed text-gray-600">
                                {club.page.description}
                            </div>

                            {/* Features Grid */}
                            {club.page.features && (
                                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {club.page.features.map((feature, idx) => {
                                        const isObject = typeof feature === 'object';
                                        return (
                                            <div key={idx} className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100 transition hover:bg-blue-100">
                                                <span className="text-xl">{isObject ? feature.icon : "✨"}</span>
                                                <span className="text-sm font-medium text-gray-700">{isObject ? feature.text : feature}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Side Info */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">اطلاعات تماس</h3>

                                {/* Mini Map */}
                                {club.page.mapEmbed && (
                                    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                                        <div className="aspect-[16/10] w-full">
                                            <iframe
                                                src={club.page.mapEmbed}
                                                className="h-full w-full"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                lang="fa"
                                                title="نقشه"
                                                aria-label="نقشه"
                                                aria-hidden="true"
                                                tabIndex={-1}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3">
                                        <a
                                            href={club.page.mapLink || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-3"
                                        >
                                            <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                                            <p className="text-gray-600">{club.page.address}</p>
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400 shrink-0" />
                                        <a
                                            href={`tel:0${club?.page?.phone?.replace(/-/g, '')}`}
                                            className="text-blue-600 font-bold hover:underline" dir="ltr">
                                            {club.page.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule Section */}
                {club.page.hours && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* لاجیک هوشمند تبدیل ساعت */}
                        {(() => {
                            const todayIndex = (new Date().getDay() + 1) % 7;
                            const daysMap = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];
                            const todayName = daysMap[todayIndex];

                            // تابع دقیق برای تشخیص بازه زمانی
                            const formatPersianTime = (timeStr: string) => {
                                const [h] = timeStr.split(':').map(Number);
                                if (h >= 0 && h < 6) return `${h === 0 ? 12 : h} بامداد`;
                                if (h >= 6 && h < 12) return `${h} صبح`;
                                if (h === 12) return `۱۲ ظهر`;
                                if (h > 12 && h < 16) return `${h - 12} بعدازظهر`;
                                if (h >= 16 && h < 20) return `${h - 12} عصر`;
                                if (h >= 20) return `${h - 12} شب`;
                                return timeStr;
                            };

                            return (
                                <>
                                    {/* Men Schedule */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border-r-4 border-blue-500">
                                        <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            سانس آقایان
                                        </h3>
                                        <div className="space-y-2">
                                            {club.page.hours.men.map((h, i) => {
                                                const isToday = h.day.includes(todayName);
                                                return (
                                                    <div key={i}
                                                        className={`flex justify-between items-center text-sm py-3 border-b last:border-0 border-gray-100 px-3 rounded-lg transition-colors duration-200
											${isToday ? "bg-blue-50/60" : "hover:bg-gray-50"} 
										 `}>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-medium ${isToday ? "text-blue-700 font-bold" : "text-gray-700"}`}>
                                                                {h.day}
                                                            </span>
                                                            {isToday && (
                                                                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 animate-pulse">
                                                                    امروز
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-gray-600 font-medium text-xs sm:text-sm">
                                                            {formatPersianTime(h.open)} <span className="text-gray-300 mx-1">تا</span> {formatPersianTime(h.close)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Women Schedule */}
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border-r-4 border-pink-500">
                                        <h3 className="font-bold text-lg mb-4 text-pink-800 flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            سانس بانوان
                                        </h3>
                                        <div className="space-y-2">
                                            {club.page.hours.women.map((h, i) => {
                                                const isToday = h.day.includes(todayName);
                                                return (
                                                    <div key={i}
                                                        className={`flex justify-between items-center text-sm py-3 border-b last:border-0 border-gray-100 px-3 rounded-lg transition-colors duration-200
											${isToday ? "bg-pink-50/60" : "hover:bg-gray-50"}
										 `}>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-medium ${isToday ? "text-pink-700 font-bold" : "text-gray-700"}`}>
                                                                {h.day}
                                                            </span>
                                                            {isToday && (
                                                                <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full border border-pink-200 animate-pulse">
                                                                    امروز
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span className="text-gray-600 font-medium text-xs sm:text-sm">
                                                            {formatPersianTime(h.open)} <span className="text-gray-300 mx-1">تا</span> {formatPersianTime(h.close)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}

                {/* Inline Reservation Form Section */}
                {club.reservable ? (
                    <div id="reservation-section" className="scroll-mt-24">
                        <InlineReservationForm clubName={club.name} />
                    </div>
                ) : (
                    <div className="bg-gray-100 rounded-2xl p-8 text-center border-2 border-dashed border-gray-300">
                        <h3 className="text-xl font-bold text-gray-500">در حال حاضر رزرو آنلاین برای این مجموعه غیرفعال است.</h3>
                    </div>
                )}

                {/* Gallery Section */}
                {club.page.gallery && club.page.gallery.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-r-4 border-blue-500 pr-3">
                            گالری تصاویر و ویدیوها
                        </h3>
                        <MasonryGallery items={club.page.gallery} />
                    </div>
                )}
            </div>
        </div>
    );
}