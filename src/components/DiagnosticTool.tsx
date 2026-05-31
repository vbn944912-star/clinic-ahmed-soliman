import { useState } from 'react';
import { Sparkles, ArrowLeft, RefreshCw, Clipboard, CheckCircle2, ChevronLeft, ShieldAlert } from 'lucide-react';
import { SkinType, SkinConcern } from '../types';

interface DiagnosticToolProps {
  onBookRecommended: (service: string, notes: string) => void;
}

export default function DiagnosticTool({ onBookRecommended }: DiagnosticToolProps) {
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [concern, setConcern] = useState<SkinConcern | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const skinTypes = [
    { id: 'oily' as SkinType, name: 'بشرة دهنية', desc: 'مسام واضحة، لمعان مستمر، ظهور متكرر لحب الشباب والزيوت.' },
    { id: 'dry' as SkinType, name: 'بشرة جافة', desc: 'ملمس خشن، رقة في الجلد، إحساس بالشد، قشور واحمرار أحياناً.' },
    { id: 'combination' as SkinType, name: 'بشرة مختلطة', desc: 'دهنية في منطقة الجبهة والأنف (T-Zone) وجافة أو عادية بالخدين.' },
    { id: 'normal' as SkinType, name: 'بشرة عادية', desc: 'بشرة متوازنة، رطوبة معتدلة، خالية من العيوب الكبيرة والتحسس.' },
    { id: 'not-sure' as SkinType, name: 'غير متأكد', desc: 'لست متأكداً تماماً من تصنيف بشرتي الحالي.' },
  ];

  const concerns = [
    { id: 'acne' as SkinConcern, name: 'حب الشباب وآثاره', icon: '🔴', clinicService: 'الأمراض الجلدية المزمنة' },
    { id: 'hair-loss' as SkinConcern, name: 'تساقط الشعر وقشرة الفروة', icon: '💇', clinicService: 'مشكلات الشعر وفروة الرأس' },
    { id: 'wrinkles' as SkinConcern, name: 'التجاعيد والخطوط التعبيرية', icon: '✨', clinicService: 'الإجراءات التجميلية غير الجراحية' },
    { id: 'pigmentation' as SkinConcern, name: 'التصبغات والبقع الداكنة', icon: '🎭', clinicService: 'الإجراءات التجميلية غير الجراحية' },
    { id: 'dryness' as SkinConcern, name: 'علاج الجفاف الشديد والتحسس', icon: '💧', clinicService: 'الأمراض الجلدية المزمنة' },
    { id: 'routine' as SkinConcern, name: 'تحديد روتين نضارة ووقاية يومية', icon: '🌸', clinicService: 'الإجراءات التجميلية غير الجراحية' },
  ];

  const getDiagnosis = () => {
    if (!skinType || !concern) return null;

    let title = '';
    let description = '';
    let routine = [] as string[];
    let clinicalTreatment = '';
    let associatedService = '';

    // Acne Logic
    if (concern === 'acne') {
      associatedService = 'الأمراض الجلدية المزمنة';
      clinicalTreatment = 'بروتوكول تفريغ حب الشباب بالبخار، والتقشير المائي أو الكيميائي المحدد بالعيادة.';
      title = 'بروتوكول تنقية البشرة وعلاج ثورات الشباب';
      description = `للتعامل مع مشكلة حب الشباب خصوصاً مع حالة (${skinTypes.find(t => t.id === skinType)?.name})، يتطلب ذلك نهجاً ثنائياً يجمع بين العلاجات الموضعية الطبية وجلسات العيادة لمنع ظهور ندبات دائمة.`;
      routine = [
        'غسول يحتوي على ساليسيليك أسيد (مرة إلى مرتين يومياً).',
        'مصل النياسيناميد لضبط الإفرازات الدهنية وتهدئة الاحمرار.',
        'ترطيب خفيف بجل مائي خالٍ من الزيوت لتفادي سد المسام.',
        'تجنب حك أو الضغط على البثور لمنع التصبغات العميقة.'
      ];
    }
    // Hair Loss Logic
    else if (concern === 'hair-loss') {
      associatedService = 'مشكلات الشعر وفروة الرأس';
      clinicalTreatment = 'جلسات الميزوثيرابي المغذية المقوية وحقن البلازما الغنية بالصفائح (PRP) لتنشيط الجذور وبصيلات الشعر الضعيفة.';
      title = 'بروتوكول إعادة تنشيط نمو الشعر ومكافحة التساقط';
      description = 'تساقط الشعر يحتاج إلى خطة علاج وتغذية جذرية متدرجة تشتمل على الفحص السريري للهرمونات ومستويات المعادن في الدم بالعيادة، تليها جلسات تنشيط تغذية الفروة.';
      routine = [
        'تونيك أو شامبو طبي مخصص ومقوي لخيوط الشعر.',
        'الابتعاد عن مصففات الحرارة العالية والغسيل المفرط.',
        'الحصول على قسط كافٍ من النوم والتغذية المتوازنة الزاخرة بالزنك والحديد.'
      ];
    }
    // wrinkles non surgical
    else if (concern === 'wrinkles') {
      associatedService = 'الإجراءات التجميلية غير الجراحية';
      clinicalTreatment = 'حقن البوتوكس العضلي الدقيق للتخلص من التجاعيد التعبيرية، أو الفيلر السائل للخطوط المحفورة.';
      title = 'بروتوكول شد البشرة واستعادة النضارة ومكافحة علامات التقدم بالسن';
      description = `أفضل خيار طبي تجميلي حالياً هو العلاج الوقائي غير الجراحي السريع بالعيادة الذي يحافظ على النعومة ومظهرك الشاب الطبيعي بدون فترات نقاهة صعبة.`;
      routine = [
        'استخدام سيروم ريتينول ليلاً بحذر وترطيب كافٍ.',
        'تطبيق واقي شمس طيف واسع يومياً في الصبح.',
        'مصل حمض الهيالورونيك على بشرة رطبة صباحاً لتعزيز الامتلاء.'
      ];
    }
    // Pigmentations
    else if (concern === 'pigmentation') {
      associatedService = 'الإجراءات التجميلية غير الجراحية';
      clinicalTreatment = 'جلسات التقشير البارد المتقن أو التقشير بالفواكه والمواد المفتحة الطبية بالعيادة.';
      title = 'بروتوكول توحيد لون البشرة وإزالة بقع الكلف والنمش';
      description = `البشرة بحاجة إلى مواد فعالة تثبط إنتاج صبغة الميلانين المصاحبة للالتهابات أو التعرض المباشر للشمس، لاسيما بوجود (${skinTypes.find(t => t.id === skinType)?.name}).`;
      routine = [
        'واقي شمس فيزيائي بعامل حماية +50 يجدد كل ساعتين خارج المنزل.',
        'سيروم فيتامين سي الموضعي بالصباح لتعزيز الإشراق وحماية الخلايا.',
        'مفتحات آمنة تحتوي على الألفا أربوتين وحمض الكوجيك ليلاً.'
      ];
    }
    // Dryness or sensitivity
    else if (concern === 'dryness') {
      associatedService = 'الأمراض الجلدية المزمنة';
      clinicalTreatment = 'بروتوكول ترميم الحاجز الواقي بالدهون الفولتية وجلسات الترطيب العميق ومكافحة التحسس.';
      title = 'بروتوكول ترميم حاجز البشرة المتهيج وعلاج الجفاف';
      description = `البشرة الجافة أو المتحسسة بحاجة ماسة لترميم حاجزها الواقي الخارجي الذي تعرض للتلف نتيجة الجفاف أو مواد تجميل قاسية وعلاجه طبياً.`;
      routine = [
        'استخدام منظفات كريمية لطيفة خالية من الصابون والعطور.',
        'كريمات غنية بالسيراميد والبانثينول لترطيب وحبس النعومة.',
        'تجنب الماء الساخن المقشر على الوجه تماماً.'
      ];
    }
    // Preventive routine
    else {
      associatedService = 'الإجراءات التجميلية غير الجراحية';
      clinicalTreatment = 'جلسات التنظيف المائي الماسي للوجه لإكساب البشرة حيوية وإشراقاً طبيعياً مع استشارات الوقاية المستدامة.';
      title = 'بروتوكول الحفاظ على النضارة الصحية والوقاية المستدامة';
      description = 'المحافظة على التوازن الحالي للبشرة والارتقاء بنضارتها من خلال روتين تدليكي وقائي ذكي يمنع علامات التعب والإجهاد.';
      routine = [
        'ترطيب متوازن يومي يناسب نوع بشرتك.',
        'وقاية وثيقة من مسببات الأكسدة باستعمال فيتامين سي صباحاً.',
        'تنظيف شامل للبشرة ليلاً للتخلص من الأتربة العالقة.'
      ];
    }

    return { title, description, routine, clinicalTreatment, associatedService };
  };

  const currentDiagnosis = getDiagnosis();

  const handleNextStep = () => {
    if (step === 1 && skinType) {
      setStep(2);
    } else if (step === 2 && concern) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleReset = () => {
    setSkinType(null);
    setConcern(null);
    setStep(1);
  };

  return (
    <section id="skin-advisor" className="py-16 md:py-24 bg-white relative overflow-hidden text-right">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-200/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-0 right-10 w-64 h-64 bg-sky-200/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex p-3 rounded-full bg-sky-50 text-sky-600 mb-3 border border-sky-100">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            مستشار البشرة والشعر الرقمي
          </h2>
          <div className="w-16 h-1 bg-sky-500 mx-auto rounded-full mt-3" />
          <p className="text-slate-500 mt-3 font-semibold text-xs sm:text-sm">
            أجب عن سؤالين سريعين لتلقي تحليل أولي مجاني وتوصيات روتينية مخصصة مع العلاج الطبي التجميلي الموصى به من قبل د. أحمد سليمان.
          </p>
        </div>

        {/* Wizard Main Container Card */}
        <div className="bg-slate-50 border border-slate-100/80 rounded-3xl p-6 sm:p-10 shadow-lg min-h-[360px] flex flex-col justify-between">
          
          {/* Progress Header */}
          <div className="flex justify-between items-center mb-8 border-b border-slate-200/55 pb-4">
            <span className="text-xs font-black text-slate-400">
              خطوة {step} من 3
            </span>
            <div className="flex gap-1.5 direction-ltr">
              <span className={`w-6 h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-sky-600' : 'bg-slate-200'}`} />
              <span className={`w-6 h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-sky-600' : 'bg-slate-200'}`} />
              <span className={`w-6 h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'bg-sky-600' : 'bg-slate-200'}`} />
            </div>
          </div>

          {/* STEP 1: SKIN TYPE */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                1. حددي أو حدد طبيعة ونوع بشرتك الحالية:
              </h3>
              <p className="text-xs text-slate-500 font-bold">بشرة جافة، دهنية، مختلطة؟ اختر الخيار الأقرب لحالتك اليومية:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {skinTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSkinType(t.id)}
                    className={`p-4 rounded-2xl border text-right transition-all group ${
                      skinType === t.id
                        ? 'bg-sky-600 border-transparent text-white shadow-md'
                        : 'bg-white border-slate-200/70 hover:border-sky-300 text-slate-700 hover:bg-white/80'
                    }`}
                  >
                    <div className="font-extrabold text-sm sm:text-base group-hover:text-primary-600 dark:group-hover:text-white transition">
                      {t.name}
                    </div>
                    <p className={`text-xs mt-1.5 font-bold leading-relaxed ${
                      skinType === t.id ? 'text-sky-50' : 'text-slate-400'
                    }`}>
                      {t.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SKIN CONCERN */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                2. ما هي المشكلة الرئيسية أو الهدف الذي تود علاجه؟
              </h3>
              <p className="text-xs text-slate-500 font-bold">يرجى اختيار المشكلة التي تؤرقك وتريد لعيادة د. أحمد تقديم حل متقدم لها:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {concerns.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setConcern(c.id)}
                    className={`p-4.5 rounded-2xl border text-right transition-all flex items-center gap-4 group ${
                      concern === c.id
                        ? 'bg-sky-600 border-transparent text-white shadow-md'
                        : 'bg-white border-slate-200/70 hover:border-sky-300 text-slate-700 hover:bg-white/80'
                    }`}
                  >
                    <span className="text-2xl shrink-0 p-2 bg-slate-50 rounded-xl border border-slate-100 block">{c.icon}</span>
                    <div>
                      <div className="font-extrabold text-sm sm:text-base">
                        {c.name}
                      </div>
                      <p className={`text-[10px] font-bold mt-0.5 ${concern === c.id ? 'text-sky-100' : 'text-sky-600'}`}>
                        التشخيص الموصى به: {c.clinicService}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: RESULTS DIAGNOSIS */}
          {step === 3 && currentDiagnosis && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* success notification badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-2xl text-xs font-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>تم إعداد بطاقة التوصية الشخصية والروتين المقترح بنجاح!</span>
              </div>

              {/* Title & Description of medical advice */}
              <div className="space-y-2 border-b border-slate-200 pb-5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentDiagnosis.title}
                </h3>
                <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
                  {currentDiagnosis.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                {/* Proposed Routine list */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100/90 shadow-2xs space-y-3">
                  <h4 className="font-extrabold text-xs sm:text-sm text-sky-700 border-r-2 border-sky-500 pr-2">الروتين المنزلي اليومي المقترح للتجربة:</h4>
                  <ul className="space-y-2 pt-1">
                    {currentDiagnosis.routine.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-bold text-slate-600 leading-relaxed">
                        <span className="w-4 h-4 bg-sky-50 text-sky-600 rounded-full shrink-0 flex items-center justify-center text-[10px] border border-sky-100 font-extrabold">{idx + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Highly recommended Clinic Treatment */}
                <div className="bg-sky-100/30 p-5 rounded-2xl border border-sky-200/50 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 border-r-2 border-slate-700 pr-2">العلاج والجلسات الموصى بها في العيادة بدقة:</h4>
                    <p className="text-xs font-semibold text-slate-600 mt-2 leading-relaxed">
                      للتمتع بنتائج سريعة تدوم طويلاً، ينصح د. أحمد بالحجز لجلسة واحدة أو كورس علاجي مكمل بالعيادة يتضمن:
                    </p>
                    <p className="text-sm font-black text-slate-800 mt-2 leading-normal">
                      ✨ {currentDiagnosis.clinicalTreatment}
                    </p>
                  </div>

                  <div className="bg-white border border-sky-100 p-2.5 rounded-xl flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-500">القسم المعني:</span>
                    <span className="font-black text-sky-600 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-lg">من خدمات {currentDiagnosis.associatedService}</span>
                  </div>
                </div>

              </div>
              
              {/* Caution warning strictly */}
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5">
                <span className="bg-amber-100 p-1 rounded-lg shrink-0 text-amber-700">⚠️</span>
                <p className="text-[10px] text-amber-700 font-bold leading-normal">
                  هذا التقرير هو تحليل استرشادي أولي مبني على البيانات المدخلة؛ ولا يغني بأي نسبة عن الكشف المباشر داخل العيادة لتشخيص حالتك بالعدسات الطبية المتخصصة ومكابح البشرة.
                </p>
              </div>

            </div>
          )}

          {/* Action Button Controls Footer */}
          <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-slate-200/50">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="flex items-center gap-1 bg-slate-200/80 hover:bg-slate-200 text-slate-700 px-4.5 py-2.5 rounded-xl text-sm font-extrabold transition-all"
              >
                <ChevronLeft className="w-4 h-4 rotate-180" />
                <span>السابق</span>
              </button>
            ) : (
              <div /> // empty holding spacer
            )}

            {step < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={(step === 1 && !skinType) || (step === 2 && !concern)}
                className={`flex items-center gap-1.5 px-6 py-3 rounded-xl text-sm font-extrabold transition-all leading-none ${
                  ((step === 1 && skinType) || (step === 2 && concern))
                    ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>المتابعة</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2.5 w-full justify-between items-center flex-wrap">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 border border-slate-300 hover:bg-slate-100 text-slate-600 px-4.5 py-3 rounded-xl text-xs font-black transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تحليل جديد</span>
                </button>

                <button
                  onClick={() => onBookRecommended(
                    currentDiagnosis?.associatedService || 'عام', 
                    `حجز مخصص للشعر والبشرة عبر المستشار الرقمي: نوع البشرة (${skinType})، الشكوى الرئيسية (${concern})`
                  )}
                  className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl text-sm font-extrabold transition-all shadow-md shadow-sky-600/15 text-center mt-2 sm:mt-0"
                >
                  <span>حجز موعد عيادة مقترح للبرنامج</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
