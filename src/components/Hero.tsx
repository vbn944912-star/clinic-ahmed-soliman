import { Sparkles, Calendar, Clock, Star, PhoneCall } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
  onExploreServices: () => void;
  clinicHeroPath: string;
}

export default function Hero({ onBookNow, onExploreServices, clinicHeroPath }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 py-12 md:py-20 lg:py-24">
      {/* Absolute Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogans and CTAs */}
          <div className="lg:col-span-7 space-y-8 text-right">
            
            {/* Soft Badge announcement */}
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 px-4 py-2 rounded-full text-sky-700/90 text-sm font-extrabold tracking-wide">
              <Sparkles className="w-4 h-4 text-sky-500 animate-spin-slow" />
              <span>أحدث تقنيات تجميل ونضارة الجلد والشعر</span>
            </div>

            {/* Slogans */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight sm:leading-none">
                بشرة صحية...
                <span className="block mt-2 bg-gradient-to-r from-sky-700 to-sky-500 bg-clip-text text-transparent">
                  وجمال طبيعي يعكس ثقتك
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed">
                إذا كنت تبحث عن الخبرة الطبية الموثوقة والنتائج التجميلية الملموسة، فإن <span className="text-slate-900 font-extrabold">عيادة د. أحمد سليمان</span> هي وجهتك الأولى في أبو كبير لعلاج الأمراض الجلدية والعناية بصحة البشرة والشعر. نلتزم بأرقى الحلول العلاجية المدعمة علمياً.
              </p>
            </div>

            {/* Highlights bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-white border border-slate-100 p-3.5 rounded-xl shadow-xs">
                <div className="bg-sky-50 p-2 rounded-lg text-sky-600">
                  <Star className="w-5 h-5 fill-sky-500 text-sky-500" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-extrabold text-sm">تقييم 4.1 ممتاز</h4>
                  <p className="text-slate-500 text-xs mt-0.5">آراء مرضى موثقة في أبو كبير</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white border border-slate-100 p-3.5 rounded-xl shadow-xs">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-extrabold text-sm">مواعيد يومية ملائمة</h4>
                  <p className="text-slate-500 text-xs mt-0.5">السبت - الخميس: 2:00 م - 8:30 م</p>
                </div>
              </div>
            </div>

            {/* CTA buttons container */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onBookNow}
                className="flex items-center justify-center gap-2.5 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-sky-600/25 transition-all text-base hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>احجز موعد مسبق الآن</span>
              </button>

              <button
                onClick={onExploreServices}
                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-6 py-4 rounded-2xl transition-all text-base border border-slate-200"
              >
                <span>تصفح خدماتنا العلاجية</span>
              </button>
            </div>

            {/* Call alert notice */}
            <div className="flex items-center gap-2 justify-start mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-xs font-bold text-slate-500">
                يمكنك الحجز عبر الاتصال المباشر بالعيادة: <a href="tel:01021282678" className="text-sky-600 font-extrabold underline hover:text-sky-700">01021282678</a>
              </p>
            </div>

          </div>

          {/* Banner Graphic Image Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Back decoration block */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-sky-200 rounded-[2.5rem] rotate-3 -z-10 shadow-2xl opacity-40 shadow-sky-400/20" />
              
              {/* Main Image container frame */}
              <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl border border-slate-100">
                <img
                  src={clinicHeroPath}
                  alt="تجهيزات عيادة د. أحمد سليمان للجلدية"
                  className="w-full h-[320px] sm:h-[400px] object-cover rounded-[2rem] hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-6 -right-6 md:-right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-sky-100/60 max-w-xs text-right hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <span className="bg-sky-50 text-sky-600 p-1.5 rounded-lg font-black text-sm">4.1 ★</span>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs text-right">رعاية متميزة</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">تقييم عالي للتعقيم لمكافحة العدوى والوقاية</p>
                  </div>
                </div>
              </div>

              {/* Address floating card */}
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] text-right hidden sm:block">
                <div className="text-xs font-black text-slate-800">أبو كبير، الشرقية</div>
                <div className="text-[10px] text-slate-500 mt-1 leading-normal">مبنى العيادة مجهز بأعلى سبل الراحة والخصوصية</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
