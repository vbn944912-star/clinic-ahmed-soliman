import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import DiagnosticTool from './components/DiagnosticTool';
import Reviews from './components/Reviews';
import ClinicInfo from './components/ClinicInfo';
import BookingWizard from './components/BookingWizard';
import { ShieldCheck, Heart, Award, ArrowUp, Phone, Clock } from 'lucide-react';

// Import Assets
// @ts-ignore
import clinicHeroImg from './assets/images/clinic_hero_1780176518085.png';
// @ts-ignore
import doctorPortraitImg from './assets/images/doctor_portrait_1780176538925.png';
// @ts-ignore
import skincareTreatmentImg from './assets/images/skincare_treatment_1780176560196.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preselectedService, setPreselectedService] = useState('عام');
  const [preselectedNotes, setPreselectedNotes] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to show/hide "scroll to top" CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Simple active section detection based on division points
      const sections = ['hero', 'services', 'about', 'skin-advisor', 'reviews', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowTrigger = (serviceName: string) => {
    setPreselectedService(serviceName);
    setPreselectedNotes(`حجز مسبق مخصص لخدمة: ${serviceName}`);
    scrollToSection('booking-wizard');
  };

  const handleBookRecommendedTrigger = (serviceName: string, notesText: string) => {
    setPreselectedService(serviceName);
    setPreselectedNotes(notesText);
    scrollToSection('booking-wizard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased text-right selection:bg-sky-600/10 selection:text-sky-600">
      
      {/* Top sticky Navigation */}
      <Header onScrollTo={scrollToSection} activeSection={activeSection} />

      <main className="flex-1">
        
        {/* HERO BANNER SECTION */}
        <Hero
          clinicHeroPath={clinicHeroImg as any}
          onBookNow={() => scrollToSection('booking-wizard')}
          onExploreServices={() => scrollToSection('services')}
        />

        {/* SERVICES OFFERED MODULE */}
        <Services
          skincareTreatmentPath={skincareTreatmentImg as any}
          onBookNow={handleBookNowTrigger}
        />

        {/* CLINICAL BIO / ABOUT DOCTOR */}
        <About
          doctorPortraitPath={doctorPortraitImg as any}
          onBookAppointment={() => scrollToSection('booking-wizard')}
        />

        {/* SMART DIAGNOSTIC INTERACTIVE GUIDE */}
        <DiagnosticTool
          onBookRecommended={handleBookRecommendedTrigger}
        />

        {/* REVIEWS GRID MODIFIER */}
        <Reviews />

        {/* BOOKING ASSIGNMENT WIZARD */}
        <div id="booking-wizard">
          <BookingWizard
            preselectedService={preselectedService}
            preselectedNotes={preselectedNotes}
            onClearPreselection={() => {
              setPreselectedService('عام');
              setPreselectedNotes('');
            }}
          />
        </div>

        {/* LOCATION & SCHEDULING DETAILS info */}
        <ClinicInfo />

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-800 pb-8.">
            
            {/* Title & Brand */}
            <div className="space-y-2 text-right">
              <h4 className="text-white font-extrabold text-xl">عيادة د. أحمد سليمان</h4>
              <p className="text-slate-400 text-xs font-semibold">
                استشاري الأمراض الجلدية والتناسلية والتجميل بأبو كبير - محافظة الشرقية.
              </p>
              <p className="text-[11px] text-slate-500 font-bold mt-1 max-w-sm">
                بشرة صحية... وجمال طبيعي يعكس ثقتك. نعتمد أحدث الأساليب العلاجية مع الالتزام الصارم بالتعقيم الوقائي والخصوصية التامة.
              </p>
            </div>

            {/* Quick sections anchors */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center text-xs font-bold text-slate-400">
              <button onClick={() => scrollToSection('hero')} className="hover:text-white transition">الرئيسية</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-white transition">خدماتنا</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition">عن الطبيب</button>
              <button onClick={() => scrollToSection('skin-advisor')} className="hover:text-white transition">مستشار البشرة</button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-white transition">المراجعات والآراء</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition">موقعنا واتصل بنا</button>
            </div>

            {/* Verification / Quality stamps */}
            <div className="space-y-3 md:text-left text-right">
              <div className="inline-flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl border border-slate-700/50">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div className="text-right">
                  <span className="text-xs font-black text-white block">صحة جلدية آمنة</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">عيادة مرخصة ومعقمة بالكامل</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-extrabold block">للحجز الهاتفي السريع والمباشر: 01021282678</p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-extrabold gap-4">
            <p className="text-right">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة لعيادة الدكتور أحمد سليمان.</p>
            <p className="text-slate-600">تطوير مبعث بالثقة والأداء الممتاز لعام 2026.</p>
          </div>

        </div>
      </footer>

      {/* Floating Call to Action and Scroll top control */}
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          
          {/* Quick Call icon floating */}
          <a
            href="tel:01021282678"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 border border-emerald-500"
            title="اتصل بالعيادة للحجز الفوري"
          >
            <Phone className="w-5 h-5" />
          </a>

          {/* Scroll to Top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-sky-600 hover:bg-sky-700 text-white p-3.5 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 border border-sky-500 flex items-center justify-center"
            title="الرجوع للأعلى"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
}
