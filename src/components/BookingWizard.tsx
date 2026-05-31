import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle, Ticket, Trash2, ShieldCheck, AlertCircle, Copy, ClipboardCheck } from 'lucide-react';
import { Appointment } from '../types';
import { generateBookingCode } from '../utils';

interface BookingWizardProps {
  preselectedService: string;
  preselectedNotes: string;
  onClearPreselection: () => void;
}

export default function BookingWizard({ preselectedService, preselectedNotes, onClearPreselection }: BookingWizardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Form states
  const [service, setService] = useState('الأمراض الجلدية المزمنة');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('02:30 مساءً');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [step, setStep] = useState<1 | 2>(1);
  const [activeTicket, setActiveTicket] = useState<Appointment | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preselection support
  useEffect(() => {
    if (preselectedService && preselectedService !== 'عام') {
      setService(preselectedService);
    }
    if (preselectedNotes) {
      setNotes(preselectedNotes);
    }
  }, [preselectedService, preselectedNotes]);

  // Load appointments of user from localstorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dr_soliman_bookings');
      if (saved) {
        setAppointments(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const services = [
    'الأمراض الجلدية المزمنة',
    'الإجراءات التجميلية غير الجراحية',
    'مشكلات الشعر وفروة الرأس',
    'الأمراض التناسلية وعلاجها'
  ];

  const timeSlots = [
    '02:00 مساءً',
    '02:30 مساءً',
    '03:00 مساءً',
    '03:30 مساءً',
    '04:00 مساءً',
    '04:30 مساءً',
    '05:00 مساءً',
    '05:30 مساءً',
    '06:00 مساءً',
    '06:30 مساءً',
    '07:00 مساءً',
    '07:30 مساءً',
    '08:00 مساءً',
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field Validation
    if (!name.trim()) {
      setErrorMessage('يرجى تحديد الاسم الثلاثي بشكل صحيح.');
      return;
    }

    const cleanedPhone = phone.replace(/\s+/g, '');
    if (!/^01[0125]\d{8}$/.test(cleanedPhone)) {
      setErrorMessage('يرجى كتابة رقم موبايل مصري صحيح مكون من 11 رقم (مثال: 01021282678).');
      return;
    }

    if (!date) {
      setErrorMessage('يرجى اختيار تاريخ الحجز.');
      return;
    }

    // Check if appointment date falls on Friday (closed)
    const selectedDate = new Date(date);
    if (selectedDate.getDay() === 5) { // 5 is Friday
      setErrorMessage('العيادة مغلقة يوم الجمعة. يرجى اختيار أي يوم آخر من السبت للخميس.');
      return;
    }

    const appt: Appointment = {
      id: generateBookingCode(),
      patientName: name,
      phoneNumber: cleanedPhone,
      service: service,
      date: date,
      timeSlot: timeSlot,
      notes: notes,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    const updated = [appt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('dr_soliman_bookings', JSON.stringify(updated));

    setActiveTicket(appt);
    setStep(2);

    // reset fields
    onClearPreselection();
  };

  const handleCopyTicket = (ticket: Appointment) => {
    const textMsg = `تذكرة حجز عيادة د. أحمد سليمان:
كود الحجز: ${ticket.id}
الاسم الكريّم: ${ticket.patientName}
العيادة والخدمة: ${ticket.service}
التاريخ: ${ticket.date}
الوقت التقريبي: ${ticket.timeSlot}
موقع العيادة: أبو كبير، مجمع العيادات (PMFF+F5)
للتواصل والاتصال: 01021282678`;

    navigator.clipboard.writeText(textMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const cancelAppointment = (id: string) => {
    const filt = appointments.filter(a => a.id !== id);
    setAppointments(filt);
    localStorage.setItem('dr_soliman_bookings', JSON.stringify(filt));
    if (activeTicket?.id === id) {
      setActiveTicket(null);
      setStep(1);
    }
  };

  // Helper to format Arabic date representation
  const formatFriendlyArabicDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('ar-EG', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="booking-wizard" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-sky-50 text-right relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sky-600 font-extrabold text-xs sm:text-sm tracking-widest uppercase">توفير الوقت والخصوصية</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            احجز موعد كشفك التمكيني الآن
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full mt-4" />
          <p className="text-slate-600 mt-4 font-semibold text-sm sm:text-base leading-relaxed">
            دون الحاجة للوقوف بالدور الطويل، احجز كود موعدك التقريبي الآن. املأ استمارة البيانات واحصل على تذكرة دافعة لحفظ دورك لمقابلة الطبيب.
          </p>
        </div>

        {/* Wizard Panel wrapper */}
        <div className="bg-white border border-slate-100/80 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 border-r-4 border-sky-500 pr-3.5 mb-6 leading-none">
                استمارة حجز موعد عيادة:
              </h3>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-start gap-2.5 text-xs font-black">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Grid 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full name */}
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="block text-xs font-black text-slate-600" htmlFor="booking-name">اسم المريض الكريم (ثلاثي):</label>
                  <div className="relative">
                    <User className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: جمال أيوب الشرقاوي"
                      className="w-full border border-slate-200 pr-11 pl-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/20"
                    />
                  </div>
                </div>

                {/* Mobile number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-600" htmlFor="booking-phone">رقم موبايل للتأكيد والمتابعة:</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="مثال: 01021282678"
                      className="w-full border border-slate-200 pr-11 pl-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/20 tracking-wide"
                    />
                  </div>
                </div>

              </div>

              {/* Grid 2: Service & datetime */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* service picker */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-600">الفئة والخدمة الطبية المطلوبة:</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/50"
                  >
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* date picker (from Sat to Thu, except Friday) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-600" htmlFor="booking-date">تاريخ الفحص المفضل:</label>
                  <div className="relative">
                    <Calendar className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]} // ensure only futuristic and today's dates
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-slate-200 pr-11 pl-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/20"
                    />
                  </div>
                </div>

              </div>

              {/* Grid 3: Time Slot and Custom comments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Time slot */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-600">الوقت المفضل للكشف (تقريبي):</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/50"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* notes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-slate-600" htmlFor="booking-notes">ملاحظات أو أسئلة إضافية (اختياري):</label>
                  <input
                    id="booking-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: أعاني من تساقط شديد منذ شهر..."
                    className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/20"
                  />
                </div>

              </div>

              {/* Warn clinic working rules */}
              <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl flex items-start gap-2.5">
                <span className="text-sky-600 shrink-0 text-xs">ℹ️</span>
                <p className="text-[11px] text-slate-500 leading-normal font-bold">
                  تلتزم العيادة باستقبال الحالات طبقا للأوقات واليوم المحجوز بالتذكرة، المراجعة تتم دورياً عبر سكرتارية العيادة. الرجاء الحضور قبل ميعاد الاستشارة بخمسة عشر (15) دقيقة بحد أدنى لتنظيم الدور.
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 text-left">
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-8 py-3.5 rounded-xl transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  تأصيـل الحجـز وإصدار التذكـرة 🎫
                </button>
              </div>

            </form>
          ) : (
            /* Ticket View Success Layout */
            activeTicket && (
              <div className="space-y-8 animate-fadeIn text-slate-800">
                
                {/* Visual Circle check badge */}
                <div className="text-center space-y-3">
                  <div className="bg-emerald-100 border border-emerald-300 text-emerald-700 p-3 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-700">تم تأكيد حجز الموعد بنجاح!</h3>
                  <p className="text-slate-500 text-xs font-bold">احتفظ بصورة هذه التذكرة أو انسخ المحتويات لإبرازها لسكرتارية العيادة عند الوصول.</p>
                </div>

                {/* Aesthetically crafted analog "Ticket Card Style" */}
                <div className="max-w-md mx-auto relative border bg-slate-50 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between" id="ticket-capture">
                  
                  {/* Top Ticket Header */}
                  <div className="bg-sky-600 text-white p-5 text-center relative border-b-2 border-dashed border-sky-700/30">
                    <div className="text-xs font-black tracking-widest opacity-80 uppercase">معلومات زيارة العيادة</div>
                    <div className="text-2xl font-black mt-1 tracking-tight">عيادة د. أحمد سليمان</div>
                    <p className="text-[10px] mt-1 text-sky-100">استشاري جلدية وتناسلية وتجميل</p>
                    
                    {/* Punch hole circles on left and right for realism */}
                    <div className="absolute w-6 h-6 bg-white rounded-full -bottom-3 -right-3 border-r" />
                    <div className="absolute w-6 h-6 bg-white rounded-full -bottom-3 -left-3 border-l" />
                  </div>

                  {/* Ticket Body Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Code Badge */}
                    <div className="flex justify-between items-center border-b pb-3.5 border-slate-200">
                      <span className="text-xs font-black text-slate-400">كود الحجز الرقمي:</span>
                      <span className="text-lg font-black text-sky-700 bg-sky-100/60 font-mono px-3 py-1 rounded-lg border border-sky-200">{activeTicket.id}</span>
                    </div>

                    {/* Patient Name */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-400">الاسم الكريم:</span>
                      <span className="font-black text-slate-800">{activeTicket.patientName}</span>
                    </div>

                    {/* Service */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-400">الفحص / الخدمة:</span>
                      <span className="font-black text-sky-600 bg-sky-50 border border-sky-100/55 px-2.5 py-1 rounded-md">{activeTicket.service}</span>
                    </div>

                    {/* Appoint Date */}
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-400">تاريخ الكشف:</span>
                      <span className="font-black text-slate-800">{formatFriendlyArabicDate(activeTicket.date)}</span>
                    </div>

                    {/* Time slot */}
                    <div className="flex justify-between items-center text-xs sm:text-sm pb-4 border-b border-slate-200">
                      <span className="font-extrabold text-slate-400">الميعاد التقريبي:</span>
                      <span className="font-black text-slate-800">{activeTicket.timeSlot}</span>
                    </div>

                    {/* Location and address details */}
                    <div className="space-y-1.5 text-right bg-white p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 block">مكان وتواصل العيادة:</span>
                      <p className="text-[11px] font-bold text-slate-700 leading-normal">📍 أبو كبير، محافظة الشرقية (مجمع العيادات PMFF+F5)</p>
                      <p className="text-[11px] font-bold text-slate-700 leading-normal">📞 للتواصل أو التعديل: 01021282678</p>
                    </div>

                    {activeTicket.notes && (
                      <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600 text-xs">
                        <span className="font-extrabold block mb-0.5">ملاحظاتك:</span>
                        <p className="text-[11px] font-bold italic line-clamp-2">"{activeTicket.notes}"</p>
                      </div>
                    )}

                  </div>

                </div>

                {/* ticket action controls */}
                <div className="flex gap-4 justify-center flex-wrap">
                  <button
                    onClick={() => handleCopyTicket(activeTicket)}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-6 py-3 rounded-xl text-xs transition"
                  >
                    {copied ? (
                      <>
                        <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                        <span>تم نسخ التذكرة!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>نسخ معلومات التذكرة</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-sm"
                  >
                    حجز موعد إضافي لآخر جديد
                  </button>
                </div>

              </div>
            )
          )}

        </div>

        {/* Existing / Active Bookings Panel */}
        {appointments.length > 0 && (
          <div className="mt-16 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-md">
            <h3 className="text-lg font-black text-slate-900 border-r-4 border-sky-500 pr-3.5 mb-6">
              مواعيدك النشطة السابقة والمستقبلية بالعيادة:
            </h3>

            <div className="space-y-4">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-sky-100 gap-4">
                  <div className="flex gap-3 items-start text-right">
                    <div className="bg-sky-50 text-sky-600 p-2.5 rounded-xl border border-sky-100 shrink-0">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-950">
                        {appt.patientName} &bull; <span className="font-mono text-sku-700 text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-md text-xs">{appt.id}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-bold mt-1.5">
                        {appt.service} &bull; <span className="text-sky-700 font-semibold">{formatFriendlyArabicDate(appt.date)}</span> ({appt.timeSlot})
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 self-end sm:self-center">
                    <button
                      onClick={() => handleCopyTicket(appt)}
                      className="text-xs font-black text-slate-500 bg-white border px-3- py-2 px-3.5 rounded-xl hover:bg-slate-100 transition"
                      title="ملاحظة التذكرة"
                    >
                      مشاركة التذكرة
                    </button>
                    <button
                      onClick={() => cancelAppointment(appt.id)}
                      className="text-xs font-black text-rose-500 hover:text-rose-700 bg-white hover:bg-rose-50 border border-rose-100 px-3.5 py-2 rounded-xl transition flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" />
                      <span>إلغاء الموعد</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2 justify-start mt-4 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/40 text-[10px] text-amber-700 font-extrabold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>يمكنك الحجز أو الإلغاء أو التعديل بكل سهولة من نفس المتصفح الخاص بك دون أي رسوم!</span>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
