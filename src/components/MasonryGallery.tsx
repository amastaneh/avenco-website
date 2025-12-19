"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, PlayCircle, ZoomIn } from "lucide-react";

// اینترفیس هماهنگ با دیتای شما
interface GalleryItem {
	url: string;      // تغییر نام از image به url طبق دیتای شما
	type: string;     // در دیتای شما string است
	caption: string;
	poster?: string;
}

interface MasonryGalleryProps {
	items: GalleryItem[];
}

export default function MasonryGallery({ items }: MasonryGalleryProps) {
	const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// قفل کردن اسکرول صفحه وقتی مودال باز است
	useEffect(() => {
		if (selectedItem) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [selectedItem]);

	if (!items || items.length === 0) return null;

	return (
		<>
			{/* --- Grid Layout (Real Masonry) --- */}
			<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 px-2 dir-ltr">
				{items.map((item, index) => (
					<div
						key={index}
						className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-gray-100 mb-4 shadow-sm hover:shadow-lg transition-all duration-300"
						onClick={() => setSelectedItem(item)}
					>
						{item.type === "video" ? (
							<div className="relative w-full">
								{/* برای ویدیو در گرید، حتما از پوستر استفاده می‌کنیم تا نسبت تصویر درست باشد */}
								{/* اگر پوستر نداشت، خود ویدیو را لود می‌کنیم */}
								{item.poster ? (
									<Image
										src={item.poster}
										alt={item.caption}
										width={500}
										height={0}
										className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity"
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										style={{ height: 'auto' }} // این خط حیاتی است برای ماسونری
									/>
								) : (
									<video
										src={`${item.url}#t=0.1`}
										className="w-full h-auto object-cover"
										preload="metadata"
										muted
										playsInline
									/>
								)}

								{/* آیکون Play */}
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
									<PlayCircle className="w-12 h-12 text-white/90 drop-shadow-xl transform group-hover:scale-110 transition-transform" />
								</div>
							</div>
						) : (
							// بخش تصاویر
							<div className="relative">
								<Image
									src={item.url}
									alt={item.caption}
									width={500}
									height={0} // ارتفاع اتوماتیک
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="w-full h-auto object-cover"
									style={{ height: 'auto' }} // عکس ارتفاع خودش را دیکته می‌کند
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
									<ZoomIn className="text-white w-8 h-8 drop-shadow-md" />
								</div>
							</div>
						)}

						{/* کپشن محو در پایین کارت */}
						{item.caption && (
							<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<p className="text-white text-xs text-right font-medium line-clamp-1" dir="rtl">
									{item.caption}
								</p>
							</div>
						)}
					</div>
				))}
			</div>

{/* --- Lightbox Modal (داخل Portal) --- */}
	  {/* 3. شرط mounted و استفاده از createPortal */}
	  {mounted && selectedItem && createPortal(
		<div
		  className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-200"
		  onClick={() => setSelectedItem(null)}
		>
		  <button
			className="absolute top-4 right-4 md:top-8 md:right-8 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-[100000] cursor-pointer"
			aria-label="Close Lightbox"
			onClick={(e) => {
				 e.stopPropagation();
				 setSelectedItem(null);
			}}
		  >
			<X className="w-8 h-8" />
		  </button>

		  <div
			className="relative w-full h-full md:max-h-[90vh] md:max-w-5xl flex flex-col items-center justify-center pointer-events-none"
		  >
			<div 
				className="relative w-auto h-auto max-w-full max-h-full pointer-events-auto flex flex-col items-center justify-center" 
				onClick={(e) => e.stopPropagation()}
			>
				{selectedItem.type === "video" ? (
				  <video
					src={selectedItem.url}
					className="max-w-[100vw] max-h-[80vh] md:max-h-[85vh] rounded-none md:rounded-lg shadow-2xl bg-black"
					controls
					autoPlay
					playsInline
				  />
				) : (
				  <img
					src={selectedItem.url}
					alt={selectedItem.caption}
					className="max-w-[100vw] max-h-[80vh] md:max-h-[85vh] object-contain rounded-none md:rounded-lg shadow-2xl"
				  />
				)}
				
				{selectedItem.caption && (
					<div className="mt-4 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-center">
						<p className="text-white text-sm md:text-base" dir="rtl">
							{selectedItem.caption}
						</p>
					</div>
				)}
			</div>
		  </div>
		</div>,
		document.body // <--- مودال اینجا (در انتهای بادی) تزریق می‌شود
	  )}
	</>
  );
}