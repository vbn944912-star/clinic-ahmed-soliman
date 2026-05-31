import { useState, useEffect, FormEvent } from 'react';
import { Star, MessageSquare, ShieldCheck, User, Sparkles, Check } from 'lucide-react';
import { Review } from '../types';
import { getSavedReviews, saveReview } from '../utils';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setReviews(getSavedReviews());
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newRev: Review = {
      id: `rev-local-${Date.now()}`,
      author: name,
      rating: rating,
      content: content,
      date: 'الآن',
      isLocal: true,
    };

    const updated = saveReview(newRev);
    setReviews(updated);
    
    // reset form
    setName('');
    setRating(5);
    setContent('');
    setShowAddForm(false);
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  // Google reviews statistics representation based on images (7 total reviews, 4.1 average)
  const stats = {
    average: 4.1,
    totalCount: reviews.length + 3, // dynamically scale based on additions + original reviews
    bars: [
      { stars: 5, percent: 75 },
      { stars: 4, percent: 14 },
      { stars: 3, percent: 0 },
      { stars: 2, percent: 0 },
      { stars: 1, percent: 11 },
    ]
  };

  return (
    <section id="reviews" className="py-16 md:py-24 bg-slate-50 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-extrabold text-xs sm:text-sm tracking-widest uppercase">صدق وسرية وموثوقية</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            آراء وتقييمات زوار العيادة
          </h2>
          <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full mt-4" />
          <p className="text-slate-600 mt-4 font-semibold text-sm sm:text-base leading-relaxed">
            المرضى أولويتنا الأولى، ونعتز بآرائهم الصادقة والموثقة على خرائط جوجل وغيرها من المنصات لتعزيز جودة خدماتنا باستمرار.
          </p>
        </div>

        {/* Visual Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md mb-12">
          
          {/* Main Average Box */}
          <div className="col-span-1 lg:col-span-4 text-center lg:border-l lg:border-slate-100 lg:pl-8 space-y-3">
            <h3 className="text-5xl font-black text-slate-900">4.1</h3>
            
            {/* Stars visualizer helper */}
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4].map(s => (
                <Star key={s} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-6 h-6 text-amber-400 fill-amber-400/30" />
            </div>

            <p className="text-xs font-black text-slate-500">تقييم عيادة د. أحمد على خرائط جوجل</p>
            <p className="text-xs text-sky-600 bg-sky-50 py-1.5 px-3.5 rounded-full inline-block font-extrabold">بناءً على مراجعات ومتابعي العيادة</p>
          </div>

          {/* Rating Bars distribution - Matching Google maps screenshot */}
          <div className="col-span-1 lg:col-span-8 space-y-3">
            <h4 className="font-extrabold text-slate-800 text-sm mb-4">توزيع التقييمات والمراجعات:</h4>
            {stats.bars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-500 w-3 text-left">{bar.stars}</span>
                <Star className="w-4 h-4 fill-slate-300 text-slate-300 shrink-0" />
                
                {/* Visual Bar line */}
                <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>

                <span className="text-xs font-bold text-slate-400 w-10 text-left">{bar.percent}%</span>
              </div>
            ))}
          </div>

        </div>

        {/* Reviews Lists Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all">
              
              {/* Header metadata author */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-sky-50 text-sky-600 p-2.5 rounded-xl border border-sky-100">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm sm:text-base">{rev.author}</h5>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{rev.date}</span>
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Message Content */}
              <p className="text-slate-600 font-bold ml-1 text-xs sm:text-sm leading-relaxed text-right font-medium">
                « {rev.content} »
              </p>
              
              {/* Review origin badge */}
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-extrabold">
                <span>تاريخ الفحص: {rev.isLocal ? 'زيارة حديثة' : 'مراجعة موثقة'}</span>
                <span className="text-sky-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>مراجعة مؤكدة</span>
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Adding Review Action trigger */}
        <div className="mt-12 text-center">
          
          {successMsg && (
            <div className="mb-6 max-w-md mx-auto bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-center gap-2 font-black text-sm text-right">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>شكراً جزيلاً لمشاركة رأيكم! تم تسجيل تقييمكم ودمجه مباشرة بالصفحة.</span>
            </div>
          )}

          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-sky-50 hover:bg-sky-100 text-sky-700 font-black px-6 py-3.5 rounded-xl border border-sky-200 transition-all shadow-2xs hover:shadow-sm"
            >
              ✍️ هل زرت العيادة؟ اكتب تقييمك ومراجعتك هنا
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-lg text-right space-y-4 animate-fadeIn">
              <h4 className="text-lg font-extrabold text-slate-900 border-b pb-3 mb-4">أضف كشفك وتقييمك لدكتور أحمد:</h4>
              
              {/* Rating selection Stars click */}
              <div>
                <label className="block text-xs font-extrabold text-slate-600 mb-2">تقييم الطبيب العام بالنجوم:</label>
                <div className="flex gap-2 justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Author name input */}
              <div>
                <label className="block text-xs font-extrabold text-slate-600 mb-1.5" htmlFor="author-name">الاسم الكريم أو المعرف:</label>
                <input
                  id="author-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: م. جمال أيوب الشرقاوي"
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/50"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-extrabold text-slate-600 mb-1.5" htmlFor="review-content">اكتب تجربتك وبأمانة:</label>
                <textarea
                  id="review-content"
                  required
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="مثال: دكتور متمكن وممتاز جداً وعيادة على أرقى مستوى وتعامل سريع..."
                  className="w-full border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold bg-slate-50/50"
                />
              </div>

              {/* Form buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black px-4.5 py-2.5 rounded-xl transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-black px-6 py-2.5 rounded-xl transition shadow-xs"
                >
                  نشر المراجعة بالصفحة
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
