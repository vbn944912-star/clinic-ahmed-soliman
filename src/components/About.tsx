import { Award, ShieldAlert, HeartHandshake, ShieldCheck, CheckCircle } from 'lucide-react';

interface AboutProps {
  doctorPortraitPath: string;
  onBookAppointment: () => void;
}

export default function About({ doctorPortraitPath, onBookAppointment }: AboutProps) {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-sky-600" />,
      title: 'الخبرة الطبية الشاملة',
      description: 'نجمع بين المعرفة العلمية المتقدمة والتطبيق العملي الدقيق لتشخيص وعلاج كافة الحالات الجلدية الحرجة والجمالية.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'أقصى درجات التعقيم والسلامة',
      description: 'نطبق معايير صارمة لمكافحة العدوى والتعقيم الفائق لجميع الغرف والأدوات لضمان بيئة علاجية آمنة كلياً.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-600" />,
      title: 'الخصوصية التامة والاهتمام',
      description: 'نوفر رعاية مشخصنة وسط أجواء تحفظ للمريض حريته وخصوصيته السرية التامة طوال فترة الكشف والاستشارة.',
    },
  ];

  const highlights = [
    'استشارات تشخيصية متخصصة ودقيقة لكافة الأعمار.',
    'بروتوكولات حديثة معتمدة من الهيئات والجمعيات الدولية للجلدية.',
    'علاجات تجميلية آمنة وغير جراحية تحقق نتائج ملموسة وطبيعية.',
    'تقييم دوري لمدى استجابة البشرة والجرعات الدوائية للمريض.',
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            من نحن وعيادتنا الطبية
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full mt-4" />
          <p className="text-slate-600 mt-4 font-medium leading-relaxed text-sm sm:text-base">
            تعرف على الطبيب المعالج ورؤية الكادر الطبي للوصول بك إلى مستويات ممتازة من الصحة الجلدية واستعادة نضارة المظهر.
          </p>
        </div>

        {/* Primary Row Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text bio details */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <span className="text-sky-600 font-black text-sm tracking-widest uppercase">التميز في طب الجلدية والتجميل</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              الرعاية الطبية الموثوقة تحت إشراف <span className="text-sky-600">د. أحمد سليمان</span>
            </h3>

            <p className="text-slate-600 font-medium leading-relaxed text-base">
              في عيادتنا، نوظف الخبرات الطبية المتراكمة لتقديم باقة مخصصة من التشخيصات والعلاجات السليمة للأمراض الجلدية المستعصية والمزمنة، بالإضافة إلى الإجراءات التجميلية المتطورة. 
            </p>

            <p className="text-slate-600 font-medium leading-relaxed text-base">
              نحن نؤمن بأن جمال البشرة الخارجي ينطلق أساساً من صحتها ونظافتها الداخلية؛ لذا لا نكتفي فقط بوصف العلاجات الظاهرية بل نقوم بدراسة الأسباب وتوفير المتابعة الدورية والنصح المتكامل لحياة صحية ملأى بالنشاط والثقة.
            </p>

            {/* Bullets lists */}
            <div className="space-y-3 pt-2">
              {highlights.map((tag, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 text-sky-500 mt-1 shrink-0" />
                  <span className="text-slate-700 font-bold text-sm leading-relaxed">{tag}</span>
                </div>
              ))}
            </div>

            {/* In-view button */}
            <div className="pt-4">
              <button
                onClick={onBookAppointment}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all hover:shadow-lg active:scale-95"
              >
                اطلب استشارتك الطبية الآن
              </button>
            </div>
          </div>

          {/* Doctor Portrait Image Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-sm">
              {/* background ring ornament */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-rose-100 rounded-3xl -rotate-6 transform scale-102 -z-10 shadow-lg" />
              
              <div className="overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 shadow-xl p-2.5">
                <img
                  src={doctorPortraitPath}
                  alt="الدكتور أحمد سليمان استشاري الجلدية"
                  className="w-full aspect-square object-cover rounded-2xl hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Tag box overlay */}
              <div className="absolute -bottom-6 left-6 right-6 bg-sky-600 text-white px-5 py-4 rounded-2xl shadow-xl text-center border border-sky-500">
                <div className="font-extrabold text-sm">استشاري أمراض الجلدية والتناسلية</div>
                <div className="text-[11px] opacity-90 mt-0.5">عيادة مجهزة على أعلى معايير الجودة والتعقيم والوقاية</div>
              </div>
            </div>
          </div>

        </div>

        {/* Clinic core values grid segment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {values.map((v, i) => (
            <div key={i} className="bg-slate-50/50 hover:bg-sky-50/30 border border-slate-100/80 p-6 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1 text-right">
              <div className="inline-flex p-3 rounded-xl bg-white border border-slate-100 mb-4 shadow-2xs">
                {v.icon}
              </div>
              <h4 className="text-slate-900 font-extrabold text-lg mb-2">{v.title}</h4>
              <p className="text-slate-600 font-bold ml-1 text-xs sm:text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
