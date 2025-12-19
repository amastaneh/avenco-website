"use client";
import { clubsData } from "@/data/clubs";

const ClubCard = ({ club }: { club: typeof clubsData[number] }) => (
	<a
		className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer"
		href={club.reservable && club.slug ? `/${club.slug}` : "#"}
		target={club.reservable ? "_blank" : "_self"}
		rel={club.reservable ? "noopener noreferrer" : undefined}
	>
		<img
			src={club.image}
			alt={club.name}
			className="w-full h-48 object-cover" />
		<div className="p-6 flex flex-col flex-grow">
			<h3 className="text-xl font-semibold mb-2">{club.name}</h3>
			<p className="text-gray-600 mb-4 flex-grow">{club.description}</p>
			<div
				className={`w-full mt-auto font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-center ${club.reservable
					? "bg-green-500 text-white"
					: "text-white bg-gray-500/40"
					}`}
				aria-disabled={!club.reservable}
			>
				رزرو سانس و اطلاعات بیشتر
			</div>
		</div>
	</a>
);

export default function Home() {

	return <main>
		{/* Hero Section */}
		<section
			className="text-white py-20 lg:py-32"
			style={{
				background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/avenco-background.jpeg')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className="container mx-auto px-6 text-center">
				<h1 className="text-4xl lg:text-6xl font-bold mb-4 !leading-tight">به آونکو خوش آمدید!</h1>
				<p className="text-lg lg:text-xl max-w-3xl mx-auto mb-8">
					ما با افتخار، مدیریت حرفه‌ای چندین مجموعه تفریحی، فرهنگی و ورزشی در ایران را بر عهده داریم. از زمین‌های
					فوتبال تا آب‌های زلال استخرها، هدف ما ارتقاء سلامت و نشاط جامعه است.
				</p>
				<a href="#clubs"
					className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition-transform transform hover:scale-105"
				>
					همین حالا سانس خود را رزرو کنید!
				</a>
			</div>
		</section>

		{/* "Our Clubs" Section */}
		<section id="clubs" className="py-16 lg:py-24 bg-white">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center mb-12">باشگاه‌های ما</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
					{clubsData.map((club, index) => (
						<ClubCard key={index} club={club} />
					))}
				</div>
			</div>
		</section>

		{/* AI Workout Planner Section */}
		<section id="ai-planner" className="py-16 lg:py-24 bg-gray-50">
			<div className="container mx-auto px-6 text-center">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-3xl font-bold mb-4">برنامه تمرینی هوشمند شما</h2>
					<p className="text-gray-600 mb-8 leading-relaxed">
						نمی‌دانید از کجا شروع کنید؟ به کمک هوش مصنوعی Gemini، یک برنامه تمرینی شخصی‌سازی‌شده بر اساس
						اهداف و علاقه خود دریافت کنید و اولین قدم را برای رسیدن به تناسب اندام بردارید.
					</p>
					<button id="open-modal-btn"
						className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition-transform transform hover:scale-105 inline-flex items-center"
					>
						✨ ساخت برنامه تمرینی شخصی
					</button>
				</div>
			</div>
		</section>

		{/* "About Us" Section */}
		<section id="about" className="py-16 lg:py-24 bg-white">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold mb-6">درباره باشگاه آونکو</h2>
				<p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
					باشگاه آونکو، با تکیه بر تجربه و تخصص در حوزه مدیریت ورزشی، فعالیت خود را در شهرهای قوچان و اسفراین
					آغاز کرده است. ما متعهد به ارائه بهترین خدمات و ایجاد فضایی پویا برای ورزشکاران و علاقه‌مندان به
					ورزش هستیم. هدف ما ارتقاء سطح ورزش و سلامتی در جامعه، با ارائه امکانات ورزشی مدرن و مدیریت کارآمد
					است.
				</p>
				<a href="#" className="mt-6 inline-block text-green-600 font-semibold hover:underline"
				>
					اطلاعات بیشتر &larr;
				</a>
			</div>
		</section>

		{/* "Contact Us" Section */}
		<section id="contact" className="py-16 lg:py-24 bg-gray-50">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center mb-12">تماس با ما</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Contact Info */}
					<div>
						<p className="text-lg text-gray-600 mb-6">
							برای کسب اطلاعات بیشتر، همکاری با ما، یا هرگونه پرسش، لطفا از طریق راه‌های ارتباطی زیر با ما
							در تماس باشید:
						</p>
						<div className="space-y-4">
							<div className="flex items-center">
								<i data-lucide="phone" className="w-6 h-6 text-green-500 ml-3 flex-shrink-0"></i>
								<span>
									<strong>شماره تماس اسفراین:</strong> 058-XXXXXXX
								</span>
							</div>
							<div className="flex items-center">
								<i data-lucide="phone" className="w-6 h-6 text-green-500 ml-3 flex-shrink-0"></i>
								<span>
									<strong>شماره تماس قوچان:</strong> 051-XXXXXXX
								</span>
							</div>
							<div className="flex items-center">
								<i data-lucide="mail" className="w-6 h-6 text-green-500 ml-3 flex-shrink-0"></i>
								<span>
									<strong>ایمیل:</strong>
									<a href="mailto:info@avenco.ir" className="text-green-600 hover:underline">
										info@avenco.ir
									</a>
								</span>
							</div>
							<div className="flex items-center">
								<i data-lucide="map-pin" className="w-6 h-6 text-green-500 ml-3 flex-shrink-0"></i>
								<span>
									<strong>آدرس:</strong>
									اسفراین، انتهای بلوار فرطان (شهید فهمیده)، مجموعه تفریحی ورزشی کارگران اسفراین
								</span>
							</div>
							<div className="flex items-center">
								<i data-lucide="map-pin" className="w-6 h-6 text-green-500 ml-3 flex-shrink-0"></i>
								<span>
									<strong>آدرس:</strong> قوچان، زمین های ارتش، مجموعه ورزشی سیمرغ
								</span>
							</div>
							<div className="flex items-center">
								<i data-lucide="map-pin" className="w-6 h-6 text-green-500 ml-3 flex-shrink-0"></i>
								<span>
									<strong>آدرس:</strong> قوچان، بلوار باهنر، روبروی هایپرمارکت، مجموعه ورزشی حجاب
								</span>
							</div>
						</div>
					</div>
					{/* Contact Form */}
					<div className="bg-white p-8 rounded-lg shadow-md">
						{/* فرم تماس */}
						<div id="contact-form-container">
							<form id="contact-form">
								<div className="mb-4">
									<label
										htmlFor="name"
										className="block text-gray-700 font-semibold mb-2"
									>
										نام شما
									</label>
									<input
										type="text"
										id="name"
										name="name"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="email"
										className="block text-gray-700 font-semibold mb-2"
									>
										ایمیل
									</label>
									<input
										type="email"
										id="email"
										name="email"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="message"
										className="block text-gray-700 font-semibold mb-2"
									>
										پیام شما
									</label>
									<textarea
										id="message"
										name="message"
										rows={4}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
									></textarea>
								</div>
								<button
									type="submit"
									id="contact-submit-btn"
									className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
								>
									ارسال پیام
								</button>
							</form>
						</div>

						{/* باکس موفقیت */}
						<div
							id="contact-success-box"
							className="hidden text-center py-6"
						>
							<div
								className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
							>
								<i data-lucide="check" className="w-10 h-10"></i>
							</div>
							<h3 className="text-2xl font-bold mb-2">پیام شما ارسال شد!</h3>
							<p className="text-gray-600">ممنون از شما. به‌زودی با شما تماس می‌گیریم.</p>
							<button
								id="contact-success-close"
								className="mt-6 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
							>
								بستن
							</button>
						</div>
						{/* باکس خطا (اختیاری) */}
						<div
							id="contact-error-box"
							className="hidden text-center py-6"
						>
							<div
								className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"
							>
								<i data-lucide="alert-triangle" className="w-10 h-10"></i>
							</div>
							<h3 className="text-2xl font-bold mb-2">ارسال ناموفق بود</h3>
							<p className="text-gray-600">لطفاً دوباره تلاش کنید یا بعداً مراجعه کنید.</p>
							<button
								id="contact-error-retry"
								className="mt-6 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
							>
								تلاش مجدد
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
}