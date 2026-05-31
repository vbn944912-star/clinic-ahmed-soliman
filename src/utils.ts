import { Appointment, Review } from './types';

// Helper to get Cairo Local Time
export function getCairoDate(): Date {
  try {
    const cairoString = new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" });
    return new Date(cairoString);
  } catch (e) {
    // Fallback if timezone string is not supported
    return new Date();
  }
}

// Function to check if the clinic is currently open
export function getClinicStatus() {
  const now = getCairoDate();
  const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 5: Friday, 6: Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;

  const openTimeInMinutes = 14 * 60; // 2:00 PM
  const closeTimeInMinutes = 20 * 60 + 30; // 8:30 PM

  const isFriday = day === 5;

  if (isFriday) {
    return {
      isOpen: false,
      statusText: 'مغلق الآن',
      detailText: 'يوم الجمعة عطلة أسبوعية. نلقاكم السبت بدءاً من 2:00 ظهراً.',
      colorClass: 'bg-rose-100 text-rose-700 border-rose-300',
    };
  }

  const isOpenHours = currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;

  if (isOpenHours) {
    const hoursLeft = Math.floor((closeTimeInMinutes - currentTimeInMinutes) / 60);
    const minsLeft = (closeTimeInMinutes - currentTimeInMinutes) % 60;
    const timeString = hoursLeft > 0 
      ? `متبقي ${hoursLeft} ساعة و ${minsLeft} دقيقة` 
      : `متبقي ${minsLeft} دقيقة`;
      
    return {
      isOpen: true,
      statusText: 'مفتوح الآن',
      detailText: `نستقبلكم حتى الساعة 8:30 مساءً (${timeString})`,
      colorClass: 'bg-emerald-100 text-emerald-700 border-emerald-300 animate-pulse',
    };
  } else {
    // If it's before 2:00 PM today
    if (currentTimeInMinutes < openTimeInMinutes) {
      return {
        isOpen: false,
        statusText: 'مغلق الآن',
        detailText: 'يفتح اليوم الساعة 2:00 ظهراً',
        colorClass: 'bg-amber-100 text-amber-700 border-amber-300',
      };
    } else {
      // If it's after 8:30 PM today
      const nextDayStr = day === 4 ? 'السبت' : 'غداً'; // if Thursday night, next day open is Saturday (Friday closed)
      const openTimeText = day === 4 ? 'السبت الساعة 2:00 ظهراً' : 'غداً الساعة 2:00 ظهراً';
      return {
        isOpen: false,
        statusText: 'مغلق الآن',
        detailText: `نستقبلكم ${openTimeText}`,
        colorClass: 'bg-rose-100/80 text-rose-800 border-rose-200',
      };
    }
  }
}

// Default reviews list based on user images
export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'atef Gamal',
    rating: 5,
    content: 'دكتور ممتاز وأنصح الجميع بالتعامل معه.. ربنا يحفظك معالي الدكتور. بالتوفيق دائمًا ..جمال ايوب',
    date: 'منذ 4 سنوات',
  },
  {
    id: 'rev-2',
    author: 'Mohamed Gamal',
    rating: 5,
    content: 'دكتور الدكاترة والله من افضل اطباء الجلدية والتناسلية .. وانصح الكل بالتعامل معه وكانت تجربتي واسرتي ممتازة مع الدكتور محمد الطوانسي ... ربنا يوفقة ... دمتم بخير',
    date: 'منذ 4 سنوات',
    isLocal: false,
  },
  {
    id: 'rev-3',
    author: 'سمير عبد العاطي',
    rating: 4,
    content: 'عيادة مجهزة وأحدث التقنيات وتعامل محترم وخصوصية تامة. دكتور خلوق ومتمكن جداً.',
    date: 'منذ عامين',
  },
  {
    id: 'rev-4',
    author: 'أمل محمود',
    rating: 5,
    content: 'قمت بعمل جلسات تجديد نضارة البشرة والنتيجة مذهلة للبشرة والشعر. أنصح به بشدة للبنات في أبو كبير والشرقية.',
    date: 'منذ سنة',
  }
];

// Helper to save review to localStorage
export function getSavedReviews(): Review[] {
  try {
    const saved = localStorage.getItem('dr_soliman_reviews');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_REVIEWS;
}

export function saveReview(newReview: Review) {
  try {
    const current = getSavedReviews();
    const updated = [newReview, ...current];
    localStorage.setItem('dr_soliman_reviews', JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Generate an appt code like DS-2026-X
export function generateBookingCode(): string {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `DS-${randNum}`;
}
