import { useState } from 'react';
import { Activity, Sparkles, Scissors, Syringe, Heart, Calendar, ShieldCheck, Check } from 'lucide-react';

interface ServicesProps {
  onBookNow: (serviceName: string) => void;
  skincareTreatmentPath: string;
}

export default function Services({ onBookNow, skincareTreatmentPath }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const servicesList = [
    {
      id: 1,
      title: 'الأمراض الجلدية المزمنة',
      subtitle: 'تشخيص وعلاجات وقائية دقيقة',
      icon: <Activity className="w-6 h-6 text-sky-600" />,
      description: 'نقدم حلولاً دوائية معاصرة وعناية متكاملة لمرضى حب الشباب، الإكزيما المزعجة، الصدفية، والحساسية الجلدية بفئاتها المختلفة، لتقليل تكرار النوبات والتعافي الدائم.',
      conditions: ['حب الشباب وآثاره العميقة', 'الإكزيما والتحسس المزمن', 'الصدفية والبهاق وأمراض المناعة الذاتية', 'الحكة الشديدة وفرط الأكزيما العصبية'],
      advice: 'ينصح بالمتابعة الدورية للفحوصات والجرعات للتحكم الكامل بأمراض الجلد الموسمية.',
    },
    {
      id: 2,
      title: 'الإجراءات التجميلية غير الجراحية',
      subtitle: 'نضارة فائقة ومظهر طبيعي جذّاب',
      icon: <Sparkles className="w-6 h-6 text-rose-600" />,
      description: 'تجديد مظهر البشرة وشبابها عبر أحدث تقنيات الحقن والشد غير الجراحي، بما يحقق ملامح متناسقة خالية من التجاعيد وعلامات التقدم في السن بكل أمان وسرية.',
      conditions: ['جلسات نضارة البشرة وتقشيرها الماسي', 'حقن البوتوكس للتجاعيد التعبيرية', 'الفيلر لملء الفراغات وتناسق الخدين والشفاه', 'شد البشرة وعلاج الخطوط الدقيقة'],
      advice: 'نستخدم حصرياً خامات ومواد تعبئة وشد فائقة الجودة ومعتمدة طبياً لسلامتك كلياً.',
    },
    {
      id: 3,
      title: 'مشكلات الشعر وفروة الرأس',
      subtitle: 'علاجات جذرية لتساقط الشعر والضعف',
      icon: <Scissors className="w-6 h-6 text-amber-600" />,
      description: 'فحص البصيلات وتحديد جذور مشكلة تساقط الشعر وجلسات تحفيز النمو، لتنعمي بشعر قوي وصحي وخالي تماماً من القشور والتهابات الفروة الشائعة والأمراض الموسمية.',
      conditions: ['علاج التساقط الوراثي والتفاعلي المستعصي', 'علاج ضعف بصيلات الشعر والصلع الموضعي', 'القضاء الجذري على قشرة وفطريات فروة الرأس', 'جلسات تغذية وميزوثيرابي وبلازما الشعر ذاتية المنشأ'],
      advice: 'التشخيص المبكر يوفر 80% من جهود استعادة كثافة وقوة الشعر من الجذور.',
    },
    {
      id: 4,
      title: 'الأمراض التناسلية والذكورة',
      subtitle: 'تشخيص دقيق وبأسلوب يحترم خصوصيتك',
      icon: <Heart className="w-6 h-6 text-purple-600" />,
      description: 'تشخيص وعلاج الأمراض التناسلية والذكورة بأرقى الأساليب الطبية السرية ووفق أحدث البروتوكولات المعتمدة عالمياً لضمان شفائك مع حفظ الخصوصية التامة.',
      conditions: ['تشخيص وعلاج الالتهابات التناسلية المعدية', 'الفيروسات الجلدية التناسلية وعواقبها', 'ضعف الخصوبة والمشاكل الوظيفية الذكورية', 'استشارات خاصة بالصحة الجنسية للمقبلين على الزواج'],
      advice: 'عيادتنا تلتزم ببروتوكول تعتيم وسرية كامل لمعلومات وسجلات المريض دون أي استثناء.',
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-extrabold text-xs sm:text-sm tracking-widest uppercase">خدماتنا الطبية والتجميلية المتميزة</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            رعايتنا الشاملة لصحة وجهك وجسمك
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full mt-4" />
          <p className="text-slate-600 mt-4 font-semibold text-sm sm:text-base leading-relaxed">
            نعتمد في عيادة د. أحمد سليمان على مناهج طبية تكاملية مخصصة لكل حالة منفردة للوصول لنتائج ممتازة ملموسة تلمس ثقتك بنفسك.
          </p>
        </div>

        {/* Highlight Banner featuring skincare therapy image */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8">
          <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-slate-100 h-[220px] md:h-[280px]">
            <img
              src={skincareTreatmentPath}
              alt="جلسة تجميلية وتقنية حديثة بنضارة البشرة"
              className="w-full h-full object-cover rounded-2xl. hover:scale-105 transition duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-8 space-y-4 text-right">
            <span className="bg-rose-50 text-rose-700 font-black text-xs px-3.5 py-1.5 rounded-full inline-block">التقنيات المتطورة لعام 2026</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">أرقى بروتوكولات العناية السريرية والتجميل بأحدث المواد</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
              يسعدنا في العيادة تجهيز غرف العمليات التجميلية الدقيقة وغير الجراحية طبقاً لأحدث المعايير الطبية لعام 2026. من خلال استخدام أحدث أجهزة الليزر وحقن الميزوثيرابي الدقيقة ومواد الفيلر والبوتوكس الحاصلة على موافقة المنظمات الطبية الدولية.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>تعقيم ومكافحة عدوى كاملة</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-700 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>مواد علاجية مصرحة رسمياً</span>
              </span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => {
            const isExpanded = selectedService === service.id;
            return (
              <div
                key={service.id}
                className={`bg-white rounded-2xl transition-all duration-300 border text-right p-6 md:p-8 flex flex-col justify-between cursor-pointer group ${
                  isExpanded 
                    ? 'shadow-xl ring-2 ring-sky-500/85 border-transparent' 
                    : 'shadow-xs hover:shadow-lg border-slate-100 hover:border-slate-200'
                }`}
                onClick={() => setSelectedService(isExpanded ? null : service.id)}
              >
                <div>
                  {/* Top line with Icon and badge */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="inline-flex p-3 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs group-hover:scale-110 transition duration-300">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-black text-sky-600 bg-sky-50 border border-sky-100/50 px-3 py-1.5 rounded-full inline-block">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title and Short description */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 mb-3 group-hover:text-sky-700 transition">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 hover:text-slate-700 leading-relaxed font-bold text-xs sm:text-sm mb-6">
                    {service.description}
                  </p>

                  {/* Toggle view contents details indicator */}
                  <div className="text-sky-600 font-extrabold text-xs flex items-center gap-1 mb-4 select-none">
                    <span>{isExpanded ? 'إخفاء التفاصيل العلاجية ↑' : 'عرض التفاصيل والبرامج العلاجية والوقائية وبطاقة التشخيص...'}</span>
                  </div>

                  {/* Dynamic expanded details section */}
                  {isExpanded && (
                    <div className="space-y-4 border-t border-slate-100 pt-5 mt-4 text-slate-800 animate-fadeIn">
                      <h4 className="font-extrabold text-sm text-slate-900 border-r-2 border-sky-500 pr-2">الحالات والوسائل المعالجة بالعيادة:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.conditions.map((item, id) => (
                          <li key={id} className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="bg-sky-50/50 p-3.5 rounded-xl border border-sky-100/50 mt-4">
                        <span className="text-xs font-black text-sky-700 block">نصيحة د. أحمد:</span>
                        <p className="text-[11px] font-bold text-slate-600 mt-1 lines leading-relaxed">{service.advice}</p>
                      </div>
                    </div>
                  )}

                </div>

                {/* footer button trigger booking */}
                <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500">خصوصية تامة واهتمام طبي</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent collapsing/expanding parent block
                      onBookNow(service.title);
                    }}
                    className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-extrabold px-4.5 py-3 rounded-xl transition shadow-xs hover:shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>حجز موعد {service.title}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
