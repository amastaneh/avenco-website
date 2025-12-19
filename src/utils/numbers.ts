// src/utils/numbers.ts

export function toPersianDigits(n: string | number): string {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
}

// برای پول (سه رقم سه رقم جدا می‌کند)
export function formatPrice(price: number | string): string {
    return Number(price).toLocaleString('fa-IR');
}