import { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, Clock } from 'lucide-react';
import { getClinicStatus } from '../utils';

interface HeaderProps {
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollTo, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(getClinicStatus());

  // Periodically update clinic open/close status widget
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getClinicStatus());
    }, 15000); // update every 15s
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'about', label: 'عن العيادة' },
    { id: 'skin-advisor', label: 'مستشار البشرة' },
    { id: 'reviews', label: 'آراء المرضى' },
    { id: 'contact', label: 'معلومات الحجز' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Doctor Title */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-sky-600 to-sky-400 text-white p-2.5 rounded-xl shadow-md shadow-sky-500/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
                د. أحمد سليمان
              </h1>
              <p className="text-xs font-semibold text-sky-600 tracking-wide mt-0.5">
                استشاري الجلدية والتناسلية والتجميل
              </p>
            </div>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-sky-50 text-sky-600 font-extrabold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Live indicator & Quick CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Live Indicator Badges */}
            <div className={`hidden md:flex items-center gap-2 border px-3 py-1.5 rounded-full text-xs font-bold text-right max-w-[280px] ${status.colorClass}`}>
              <Clock className="w-4 h-4 shrink-0" />
              <div>
                <span className="font-extrabold block">{status.statusText}</span>
                <span className="text-[10px] opacity-90 block leading-tight">{status.detailText}</span>
              </div>
            </div>

            {/* Quick Phone Call button */}
            <a
              href="tel:01021282678"
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black px-4.5 py-2.5 rounded-xl text-sm transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 leading-none"
            >
              <Phone className="w-4 h-4" />
              <span>01021282678</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className={`flex sm:hidden items-center gap-1.5 border px-2 py-1 rounded-full text-[10px] font-bold ${status.colorClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span>{status.statusText}</span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 mr-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/98 shadow-lg transition-transform duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            
            {/* Status explanation widget inside mobile menu */}
            <div className={`flex items-center gap-3 border p-3 rounded-xl text-sm mb-4 ${status.colorClass}`}>
              <Clock className="w-5 h-5 shrink-0" />
              <div>
                <span className="font-black block">{status.statusText}</span>
                <span className="text-xs opacity-90 block leading-normal mt-0.5">{status.detailText}</span>
              </div>
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScrollTo(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-right px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  activeSection === item.id
                    ? 'bg-sky-50 text-sky-600 font-extrabold shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <a
                href="tel:01021282678"
                className="flex items-center justify-center gap-2 w-full bg-sky-600 text-white font-extrabold py-3.5 rounded-xl shadow-md shadow-sky-600/15"
              >
                <Phone className="w-5 h-5" />
                <span>اتصل بنا لحجز موعد: 01021282678</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
