// src/app/api/reserve/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { club, name, phone, people, date, time, notes, page } = body;

        // بررسی فیلدهای اجباری
        if (!name || !phone) {
            return NextResponse.json(
                { message: "نام و شماره تماس الزامی است." },
                { status: 400 }
            );
        }

        // ساخت متن پیام برای تلگرام
        const message = `
🔔 *رزرو جدید ثبت شد*

🏢 *باشگاه:* ${club}
👤 *نام:* ${name}
📱 *تلفن:* ${phone}
👥 *تعداد:* ${people} نفر
📅 *تاریخ:* ${date}
⏰ *ساعت:* ${time}

📝 *توضیحات:*
${notes || "ندارد"}

🔗 *صفحه:* ${page}
`;

        // ارسال به تلگرام
        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        const telegramResponse = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text: message?.trim(),
                parse_mode: "Markdown", // برای بولد کردن متن‌ها
            }),
        });

        if (!telegramResponse.ok) {
            console.error("Telegram API Error:", await telegramResponse.text());
            return NextResponse.json(
                { message: "خطا در ارسال به تلگرام" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "رزرو با موفقیت انجام شد" });

    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { message: "خطای سرور" },
            { status: 500 }
        );
    }
}