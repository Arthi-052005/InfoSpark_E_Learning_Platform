import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const CourseListingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(searchParam);
  const [sortBy, setSortBy] = useState('newest');

  // Filter checkboxes
  const [selectedCategories, setSelectedCategories] = useState({
    Development: categoryParam === 'Development',
    Design: categoryParam === 'Design',
    Business: categoryParam === 'Business',
    Marketing: categoryParam === 'Marketing',
  });

  // Sync state with URL query search parameters
  useEffect(() => {
    setSearchText(searchParam);
    setSelectedCategories({
      Development: categoryParam === 'Development',
      Design: categoryParam === 'Design',
      Business: categoryParam === 'Business',
      Marketing: categoryParam === 'Marketing',
    });
  }, [categoryParam, searchParam]);

  // Fetch courses from API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      let url = '/api/courses';
      const params = new URLSearchParams();
      if (searchParam) params.append('search', searchParam);
      
      const response = await axios.get(url, { params });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchParam]);

  // Handle Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (searchText.trim()) params.search = searchText;
    if (categoryParam) params.category = categoryParam;
    setSearchParams(params);
  };

  // Handle Category check toggle
  const handleCategoryToggle = (category) => {
    const updated = {
      ...selectedCategories,
      [category]: !selectedCategories[category],
    };
    setSelectedCategories(updated);

    // If only one category is selected, update URL query parameter, else clear it
    const active = Object.keys(updated).filter((key) => updated[key]);
    const params = {};
    if (searchParam) params.search = searchParam;
    if (active.length === 1) {
      params.category = active[0];
    }
    setSearchParams(params);
  };

  // Filter & sort courses in memory
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Filter by categories (if any are active)
    const activeCategories = Object.keys(selectedCategories).filter(
      (cat) => selectedCategories[cat]
    );
    if (activeCategories.length > 0) {
      result = result.filter((course) =>
        activeCategories.some(
          (cat) => course.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      // Dummy popularity using length of enrolled students
      result.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length);
    } else {
      // Newest (sort by createdAt)
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [courses, selectedCategories, sortBy]);

  const handleCardClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="pt-[72px] min-h-screen flex flex-col">
      {/* Header & Search Section */}
      <section className="bg-surface-container-low py-2xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-xl">
            <div className="max-w-2xl">
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-md">Expand your professional horizons</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Choose from over 2,000 online video courses with new additions published every month.</p>
            </div>
          </div>
          
          {/* Search & Filters Container */}
          <form onSubmit={handleSearchSubmit} className="mt-3xl grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-8 relative">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-[52px] pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-md text-body-md outline-none" 
                placeholder="What do you want to learn today?" 
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="lg:col-span-4 flex gap-md">
              <select 
                className="flex-1 px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary font-label-md text-label-md outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <button type="submit" className="px-lg bg-primary text-on-primary rounded-xl flex items-center justify-center hover:opacity-90">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Course Listings Section */}
      <section className="py-3xl max-w-container-max mx-auto px-margin-mobile md:px-lg flex-grow w-full">
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0 mb-xl lg:mb-0">
            <div className="space-y-2xl p-lg border border-surface-variant rounded-2xl bg-surface-container-lowest">
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-md uppercase tracking-wider font-bold">Categories</h3>
                <div className="space-y-sm">
                  {Object.keys(selectedCategories).map((category) => (
                    <label key={category} className="flex items-center gap-md group cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                        checked={selectedCategories[category]}
                        onChange={() => handleCategoryToggle(category)}
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-md uppercase tracking-wider font-bold">Ratings</h3>
                <div className="space-y-sm">
                  <label className="flex items-center gap-md group cursor-pointer">
                    <input className="w-5 h-5 border-outline-variant text-primary focus:ring-primary" name="rating" type="radio" defaultChecked />
                    <div className="flex items-center gap-xs text-secondary">
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="material-symbols-outlined text-[18px]">star</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">&amp; up</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center py-3xl">
                <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-3xl bg-surface-container-lowest border border-surface-variant rounded-2xl p-xl">
                <span className="material-symbols-outlined text-6xl text-outline mb-md">search_off</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">No courses found</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Try adjusting your filters or search keywords.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {filteredCourses.map((course, idx) => {
                  const thumbnails = [
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBkzAjwDOE4M3NfaTe5_NeF5NAdUw3Wk125zJ1W5s6HWDLuUxAEMP0yIgIvoWtBB6Bzlv5NQl116iQcds3FlyRGJ49ZFoE041CqTzbm9ZlC7HKgF4KCsGd6oShLS022NxAN0wuoQMlafmpUNh_AQGK66GBn3MOhFKN2gd9AEzktYGuGCh-0pOXD8_RL9Z3Uk87yP5nHG_a7vRWf8VSFmm7Bg9Dgf8ObCU8E3TWbzly3GaWD5oFolMyZ5dzbGc0wqxDZfn9rMRjDnRrL",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDbGfGvp28DoXSTKrBP3eagLPhNX0GCdfUCiSjE6UkYNDgbsVTPOHD1GxxwHlv234H9sO11HhtvvUDuRLXHFmZ5WdCHSrRbbnWo-wE4q9NKUZ2ZolC27CrIi3EI9ws6Yx2m8zYR2In1bHJYB_Q6HV5pK_yiptnMZ6n4nZuouFV6xKy7YyidRZYRvQHCLPG-aFHp_bql0GMW4AKUXA17sFuzfj-4aTQo_sKNLQhI3gl3CAFnmV0_G5MhusSO7wga7z7pgS_kMdUutLe3",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAJrBFJQ15f1MYZyRfsLVeRaLoH0gLXOz8fQ5mG2gTiJtae6CefB2cTMcbhG9sxbWrViKJopvNTnQyplLjijayxjG3wSydy8-SRVAM90kwaXPY7f9y8yK_KnOq7h8JOE42ocg31Bl94zf7Tb1G_0K7k7ulLrUwHPl959SjFdhKP-G5Sxr0LkhckJoJBAw4rTjc62Rli7qgBvAyTaNv5wxCJH8K9-NdkqLRIYfdinbNhNhjE-9m_cx_zxQ3K99uVxf7J0_QrEy2H0wF5",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDUeSX2kIyxRaIY-FYvKQ1iTzfR7_m-IXq0nNc7WfBcdVNQq_s1-8C6Izk6GAZUPKuKTrEtxqiv0imrakfQix9uYD-i9-bSOIcPIAbtC7zU-n8g6N1BpvVcd_eljWNX-uYsM5kHRNOaDy2ZmhHC1RYLOAP56RpipJKnbiaApXiEu8FSjSC_6tabr9JKQFGJft-EdSJa4aBVLdEh0safbZgbGKKiUlok17a_AXoR3xWcMKgxYlbSPIC9L8n_aePH24yh0e-NRVnMg-qw",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCXIdqVtx_PrNgsqbeeQjlsPzox0Otr1QDEFQW1kigqm_M9L2pdQGajGy4f1LuRKQ4Pkm7m_0IUmrtK1xkIw1ARSLRt248BO3Sg_GsXhatTiwDa9EnvlrmOO3ZB4Vj82chphw_bc-rZ0xZWY8oDW8NqB3gErxLT2niACFb74lqB9F7S68BFuOLsPSaalFYuXmJxR37aJA0mRcqClVV-PzhjrmvhoRw-CZEoFE4Tg-4h47S_CKF9viCWWWexkpydaMe7U0GmENpvS1P6",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTt4avSrBr1USmpIDKo6uQXy8waobPp7z1-2xy20in7C58MK5YZpcV_aly2aIUETu6s4aloe-84lZB0al_GmEmoVfyy1rtcTbt5JJoIQw2LntkGI20kLO6VulShEJQVKKwtJ1IAfZreckg730LnHFPl5RmGlatSPVoLX7-P4pjqvLHS4Kdb0Eoobi0ObsL25j0jTxZC7P3HjZ_NBEJpqz6JUCta44joh03uoo04TQU7mfWMRJjOpz0rLtoZHkU1Nwd5sjWYYnSoqXF"
                  ];
                  const bgImage = thumbnails[idx % thumbnails.length];
                  return (
                    <div 
                      key={course._id} 
                      onClick={() => handleCardClick(course._id)}
                      className="group bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={bgImage} alt={course.title} />
                        {course.studentsEnrolled.length > 5 && (
                          <div className="absolute top-md left-md">
                            <span className="px-sm py-xs bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded-md shadow-sm">Popular</span>
                          </div>
                        )}
                      </div>
                      <div className="p-lg">
                        <h3 className="font-headline-md text-[18px] leading-tight text-on-surface mb-xs group-hover:text-primary transition-colors line-clamp-2 min-h-[50px]">{course.title}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">{course.instructor}</p>
                        <div className="flex items-center gap-xs mb-md">
                          <span className="font-label-md text-label-md text-secondary">4.8</span>
                          <div className="flex text-secondary">
                            <span className="material-symbols-outlined text-[16px]">star</span>
                            <span className="material-symbols-outlined text-[16px]">star</span>
                            <span className="material-symbols-outlined text-[16px]">star</span>
                            <span className="material-symbols-outlined text-[16px]">star</span>
                            <span className="material-symbols-outlined text-[16px]">star</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-outline">({1000 + (idx * 235)})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-md">
                            <span className="font-headline-md text-headline-md text-on-surface">${course.price}</span>
                            <span className="font-body-md text-body-md text-outline line-through">${(course.price * 1.5).toFixed(2)}</span>
                          </div>
                          <span className="text-body-sm font-label-sm text-on-surface-variant">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CourseListingPage;
