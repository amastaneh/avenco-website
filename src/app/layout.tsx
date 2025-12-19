import type { Metadata } from "next";
//import { Vazirmatn } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Facebook, Instagram, Twitter } from "lucide-react";

const fontVazirmatn = localFont({
	src: "../fonts/Vazirmatn[wght].ttf",
	display: "swap",
	variable: "--font-vazir",
});

export const metadata: Metadata = {
	title: "باشگاه فرهنگی ورزشی آونکو",
	description: "باشگاه فرهنگی ورزشی آونکو",
	icons: [
		{ rel: "icon", type: "image/png", sizes: "96x96", url: "/favicon-96x96.png" },
		{ rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
		{ rel: "shortcut icon", url: "/favicon.ico" },
		{ rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
	],
	appleWebApp: {
		title: "Avenco",
	},
	manifest: "/site.webmanifest",
	openGraph: {
		title: "باشگاه فرهنگی ورزشی آونکو",
		description: "باشگاه فرهنگی ورزشی آونکو",
	},
	twitter: {
		card: "summary_large_image",
		title: "باشگاه فرهنگی ورزشی آونکو",
		description: "باشگاه فرهنگی ورزشی آونکو",
	},
};

export default function RootLayout({ children }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fa" dir="rtl">
			<body className={`bg-gray-50 text-gray-800 ${fontVazirmatn.className} ${fontVazirmatn.variable} antialiased`}>
				{/* Header */}
				<header className="bg-white shadow-md sticky top-0 z-5">
					<nav className="container mx-auto px-6 py-1 flex justify-between items-center">
						{/* Logo and Site Name */}
						<div className="flex items-center space-x-1 ">
							<img src="logo-w.jpg" alt="Avenco Logo" className="h-20 w-20 object-contain" />
							<a href="#" className="text-xl font-bold text-gray-800">باشگاه فرهنگی ورزشی آونکو</a>
						</div>

						{/* Navigation Menu (Desktop) */}
						<div className="hidden lg:flex items-center space-x-8">
							<a href="/#" className="text-gray-600 hover:text-green-600 font-semibold border-b-2 border-green-500 pb-1">صفحه اصلی</a>
							<a href="/#clubs" className="text-gray-600 hover:text-green-600">باشگاه‌های ما</a>
							<a href="/#ai-planner" className="text-gray-600 hover:text-green-600">برنامه تمرینی</a>
							<a href="/#about" className="text-gray-600 hover:text-green-600">درباره ما</a>
							<a href="/#contact" className="text-gray-600 hover:text-green-600">تماس با ما</a>
						</div>

						{/* Mobile Menu Button */}
						<div className="lg:hidden">
							<button id="mobile-menu-button" className="text-gray-800 focus:outline-none">
								<i data-lucide="menu" className="h-6 w-6"></i>
							</button>
						</div>
					</nav>
				</header>

				{/* Main Content */}
				{children}

				{/* Footer */}
				<footer className="bg-gray-800 text-white">
					<div className="container mx-auto px-6 py-12">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center lg:text-right">
							{/* <!-- Logo and Name --> */}
							<div className="lg:col-span-1 mb-6 lg:mb-0">
								<div className="flex items-center justify-center lg:justify-start space-x-2  mb-4">
									<img src="logo.jpg" alt="Avenco Logo" className="h-12 w-12 object-contain" />
									<h3 className="text-2xl font-bold">آونکو</h3>
								</div>
								<p className="text-gray-400">ارتقاء سلامت و نشاط جامعه.</p>
							</div>
							{/* Links */}
							<div>
								<h4 className="font-semibold mb-4">لینک‌های مفید</h4>
								<ul className="space-y-2">
									<li><a href="#" className="text-gray-400 hover:text-white">حریم خصوصی</a></li>
									<li><a href="#" className="text-gray-400 hover:text-white">قوانین و مقررات</a></li>
									<li><a href="#" className="text-gray-400 hover:text-white">سوالات متداول</a></li>
								</ul>
							</div>
							{/* <!-- Navigation --> */}
							<div>
								<h4 className="font-semibold mb-4">دسترسی سریع</h4>
								<ul className="space-y-2">
									<li><a href="#clubs" className="text-gray-400 hover:text-white">باشگاه‌های ما</a></li>
									<li><a href="#about" className="text-gray-400 hover:text-white">درباره ما</a></li>
									<li><a href="#contact" className="text-gray-400 hover:text-white">تماس با ما</a></li>
								</ul>
							</div>
							{/* Social Media */}
							<div>
								<h4 className="font-semibold mb-4">شبکه‌های اجتماعی</h4>
								<div className="flex justify-center lg:justify-start space-x-4">
									<a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-6 h-6" /></a>
									<a href="#" className="text-gray-400 hover:text-white"><Twitter className="w-6 h-6" /></a>
									<a href="https://www.instagram.com/avenco.ir/" className="text-gray-400 hover:text-white"><Instagram className="w-6 h-6" /></a>
								</div>
							</div>
						</div>
						<div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
							<span>&copy; باشگاه فرهنگی ورزشی آونکو - کلیه حقوق محفوظ است. - ۱۴۰۳-۱۴۰۴ - نسخه ۲۵.۱.۲۶</span>
						</div>
					</div>
				</footer>
			</body>
		</html >
	);
}