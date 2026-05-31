import { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Share2, FileWarning, ExternalLink } from 'lucide-react';
import { getClinicStatus } from '../utils';

export default function ClinicInfo() {
  const [status, setStatus] = useState(getClinicStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getClinicStatus());
    }, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const weeklySchedule = [
    { day: 'السبت', hours: '2:00 مساءً - 8:30 مساءً' },
    { day: 'الأحد', hours: '2:00 مساءً - 8:30 مساءً' },
    { day: 'الاثنين', hours: '2:00 مساءً - 8:30 مساءً' },
    { day: 'الثلاثاء', hours: '2:00 مساءً - 8:30 مساءً' },
    { day: 'الأربعاء', hours: '2:00 مساءً - 8:30 مساءً' },
    { day: 'الخميس', hours: '2:00 مساءً - 8:30 مساءً' },
    { day: 'الجمعة', hours: 'مغلق (عطلة رسمية)' },
  ];

  // Saturday Peak Hours chart based on user uploaded screenshots
  const peakHours = [
    { time: '12 م', density: 5 },
    { time: '2 م', density: 35 },
    { time: '3 م', density: 55 },
    { time: '4 م', density: 80 },
    { time: '5 م', density: 95 },
    { time: '6 م', density: 75 },
    { time: '7 م', density: 40 },
    { time: '8 م', density: 15 },
    { time: '9 م', density: 5 },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-white text-right relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-extrabold text-xs sm:text-sm tracking-widest uppercase">سهولة الوصول والتواصل المباشر</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            موقع العيادة ومواعيد العمل والاتصال
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full mt-4" />
          <p className="text-slate-600 mt-4 font-semibold text-sm sm:text-base leading-relaxed">
            نسعد بتوفير بيئة تصفح ومعلومات ميسرة لتمهيد زيارتكم لعيادة الدكتور أحمد سليمان بكل يسر وسرعة.
          </p>
        </div>

        {/* Big Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Working schedule & Live widget */}
          <div className="col-span-1 lg:col-span-5 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-3xl space-y-6">
            
            {/* Live Clock Open/Close Indicator Widget */}
            <div className={`p-4.5 rounded-2xl border text-right ${status.colorClass}`}>
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-base">{status.statusText}</span>
                <span className="w-3 h-3 rounded-full bg-current animate-ping" />
              </div>
              <p className="text-xs font-black leading-relaxed mt-2">{status.detailText}</p>
            </div>

            {/* Timings Schedule */}
            <div className="space-y-3.5">
              <h4 className="font-extrabold text-slate-900 text-lg border-r-2 border-sky-500 pr-2 mb-4">جدول المواعيد الأسبوعية:</h4>
              <div className="divide-y divide-slate-200/60 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xs">
                {weeklySchedule.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3.5 px-4 text-xs font-semibold">
                    <span className="text-slate-900 font-extrabold">{s.day}</span>
                    <span className={`font-black ${s.hours.includes('مغلق') ? 'text-rose-500' : 'text-slate-600'}`}>{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact quick actions */}
            <div className="space-y-3">
              <a
                href="tel:01021282678"
                className="flex items-center justify-center gap-2.5 w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md shadow-sky-600/15 transition-all hover:scale-101"
              >
                <Phone className="w-5 h-5" />
                <span>اتصل بنا الآن للحجز: 01021282678</span>
              </a>
            </div>

          </div>

          {/* Location details card & coordinates */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            
            {/* Address cards group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl flex gap-3">
                <div className="bg-sky-50 text-sky-600 p-3 h-fit rounded-xl border border-sky-100">
                  <MapPin className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">العنوان الدقيق للعيادة:</h4>
                  <p className="text-slate-600 text-xs font-bold mt-1.5 leading-normal">
                    أبو كبير، مركز أبو كبير، محافظة الشرقية، مصر 7234501
                  </p>
                  <p className="text-[10px] text-sky-600 font-black mt-1">مركز أبو كبير بالقرب من الخدمات</p>
                </div>
              </div>

              <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl flex gap-3">
                <div className="bg-emerald-50 text-emerald-600 p-3 h-fit rounded-xl border border-emerald-100">
                  <MapPin className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">كود تحديد الموقع (Plus Code):</h4>
                  <p className="text-slate-600 text-xs font-bold mt-1.5 leading-normal">
                    PMFF+F5، مركز أبو كبير
                  </p>
                  <a
                    href="https://plus.codes/8G6GPMFF+F5"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-sky-600 font-black mt-1.5 hover:underline"
                  >
                    <span>عرض على خرائط جوجل 🌍</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

            {/* Peak hours representation Chart */}
            <div className="bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-black text-slate-900 text-base border-r-2 border-sky-500 pr-2">
                  أوقات الازدحام والذروة بالعيادة
                </h4>
                <span className="text-[11px] font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                  أيام السبت الأكثر ازدحاماً
                </span>
              </div>
              <p className="text-slate-500 font-bold text-xs leading-normal mb-8">
                يوضح المخطط أدناه كثافة إقبال وفترات ذروة الزيارة المعتادة للعيادة لمساعدتكم في اختيار الميعاد الأمثل والأسرع لتفادي ساعات الانتظار الطويلة:
              </p>

              {/* Peak SVG Bars */}
              <div className="relative pt-6">
                <div className="flex items-end justify-between gap-1 sm:gap-2.5 h-36 border-b border-slate-200 pb-2">
                  {peakHours.map((hour, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                      
                      {/* Density value floating on hover */}
                      <span className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm absolute mb-1 shadow-xs transition duration-200 translate-y-[-110%]"
                            style={{ bottom: `${hour.density}%` }}>
                        %{hour.density}
                      </span>

                      {/* Bar fill representation */}
                      <div
                        className="w-full bg-slate-300 rounded-t-md group-hover:bg-sky-500 transition duration-300"
                        style={{ 
                          height: `${hour.density}%`,
                          backgroundColor: hour.density > 70 ? '#0284c7' : '#94a3b8'
                        }}
                      />
                      
                      {/* x axis label */}
                      <span className="text-[10px] font-black text-slate-500 mt-2 shrink-0">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 justify-start mt-4 bg-white p-2.5 rounded-xl border border-slate-100 text-[10px] text-slate-400 font-extrabold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span>فترة الذروة الكبرى تقع عادة بين الساعة 3:00 عصراً وحتى 7:00 مساءً.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
