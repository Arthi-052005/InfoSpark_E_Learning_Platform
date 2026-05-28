import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        // Let's display the first 3 courses as trending
        setCourses(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingCourses();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/courses?category=${encodeURIComponent(category)}`);
  };

  const handleEnrollClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-2xl pb-3xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg grid md:grid-cols-2 items-center gap-2xl">
          <div className="z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-sm bg-secondary-container/30 text-on-secondary-container px-md py-xs rounded-full mb-md animate-fade-in">
              <span className="material-symbols-outlined text-[18px] fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">New platform launch</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md leading-tight">
              Master New Skills with <span className="text-primary italic">Expert-Led</span> Courses
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-xl mx-auto md:mx-0">
              Join our community of over 10k+ learners and unlock your professional potential with interactive, high-quality education.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-md">
              <Link to="/courses" className="bg-primary text-on-primary px-[32px] py-md rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-center">
                Explore Courses
              </Link>
              <Link to="/login?tab=register" className="border-2 border-primary text-primary px-[32px] py-md rounded-full font-label-md text-label-md hover:bg-primary-container/10 transition-colors text-center">
                Start Learning
              </Link>
            </div>
            <div className="mt-2xl flex items-center justify-center md:justify-start gap-md">
              <div className="flex -space-x-3">
                <img alt="Student" className="w-10 h-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0hxjA-4HaBbjzIKRnhNTZ1nJ45r_usXj8fEEdq09WZu5UIZbK0oZh3IBWGLY_iu8bSlwXAWMglXHD06xk-h82n9xQYfLMjEq6hFexRy_0BDwfMO2LM3LYZxz3VUwWg-kgtmylVCbdWKCVRbwGSYpLgAGrO2KyCXns_F76HaS-3fjx9joJ0XGOdXAyvBMVB_n7Cs5oYY_3n6S0b1xF-zVZYeqhjuFq4r3fBpXe2FV63XKJkEJj9lIeWKXsBlqIzR9HMPfN1IV-JBT_" />
                <img alt="Student" className="w-10 h-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg_KS7CMBRBRdP3c0xIPHy_JUWnLxex6sE2bFhRLz8z8dV0NNDxOdxEpnNmKxhXuYG1EU_Olrt7brPq-PQgMfo4qETfuPikQNiaHHZvGKgrIvcIZGoGli4OFekPm9lGM9OfiIgRJqrqBJPWC4x6-AQOJRLYFm5MbrnwfiU3MuKk3_yTVagt2pvzNUcQzupOjg5d0bsYQfd9ZYsDJuJ4nhwdiaFszxPHqRIjN162GjFGJcpty_vu1mD6IHvEl4jaWbqtGzON4s1xJQP" />
                <img alt="Student" className="w-10 h-10 rounded-full border-2 border-surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbk7SmhVfPDai2thgXwRduWGQWTYTy4CcprTTn0kFNtHl-30FQBtJeM5Oau2nWwAlEfCxq_dGhgOzfDtJtbOHxr2mLp6V06FoBuE9r_PhLTUXC69HSko2G_PlmGatqxeoLfh--VWLok1xJgVqYe41MKntEgafyLqMGiGeICBs0gYYdowbWlXgwY9BVqf99G_UHeaIuforvTMkoZXwvgs2mhwVzUaUYYib0fRFTuhf3fss4xkn9soilWSnhqpmgpaIdRIyX_fX1NWhS" />
              </div>
              <p className="font-label-md text-label-md text-on-surface-variant">Join <span class="text-on-surface font-bold">10k+ students</span> already learning</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative group">
              <img alt="Students learning" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_6NKGBu6-pjQb0d6GnVTM3BIKDpEuV_wKAuP66bxzYXnLQzjAuEYaDJYnM9pLewXNDiF5T47ZTJQl6woiSarN6wxZozmmbHnVZDy03TNdUnJK86O90JvQ1wg43lyVrs-ISwDrOmn7jggHxqxrN7lLNt-FjkNrApmZVkbHuPyTX8GOB4s5FdnmsvG6nTfAIIxSDSlUsTCSNEu79-hjmyei-HaN1DZF8Z2xBG-ZxOb6gjxY7xUer3ep36o8JtQsgCh_28mQATIWcawH" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            {/* Bento floating card */}
            <div className="absolute -bottom-6 -left-6 bg-surface p-lg rounded-2xl shadow-xl border border-outline-variant max-w-[240px] hidden lg:block animate-bounce-slow">
              <div className="flex items-center gap-md mb-sm">
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                </div>
                <span className="font-label-md text-label-md">Skill Progress</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-secondary w-3/4 h-full"></div>
              </div>
              <p className="mt-sm font-body-sm text-body-sm text-on-surface-variant">75% of Python Masterclass completed!</p>
            </div>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Categories Section */}
      <section className="py-3xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2xl">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Featured Categories</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Find the right topic to boost your career.</p>
            </div>
            <Link to="/courses" className="text-primary font-label-md text-label-md hover:underline flex items-center gap-xs">
              View All Categories <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Category Card 1 */}
            <div 
              onClick={() => handleCategoryClick('Development')}
              className="bg-surface p-xl rounded-2xl shadow-sm border border-outline-variant hover:border-primary transition-all group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-primary-container/20 text-primary rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">code</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-xs">Development</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">450+ Courses</p>
            </div>
            {/* Category Card 2 */}
            <div 
              onClick={() => handleCategoryClick('Business')}
              className="bg-surface p-xl rounded-2xl shadow-sm border border-outline-variant hover:border-primary transition-all group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-secondary-container/20 text-secondary rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">business_center</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-xs">Business</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">320+ Courses</p>
            </div>
            {/* Category Card 3 */}
            <div 
              onClick={() => handleCategoryClick('Design')}
              className="bg-surface p-xl rounded-2xl shadow-sm border border-outline-variant hover:border-primary transition-all group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-tertiary-container/20 text-tertiary rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">palette</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-xs">Design</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">210+ Courses</p>
            </div>
            {/* Category Card 4 */}
            <div 
              onClick={() => handleCategoryClick('Marketing')}
              className="bg-surface p-xl rounded-2xl shadow-sm border border-outline-variant hover:border-primary transition-all group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-error-container/20 text-error rounded-xl flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">ads_click</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] mb-xs">Marketing</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">180+ Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-3xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg">
          <div className="flex items-center justify-between mb-2xl">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Trending Courses</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-2xl">
              <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-gutter">
              {courses.map((course, idx) => {
                // Get corresponding static mockup images for visuals
                const images = [
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFn_fC-jJ40uj_dtuQ2u5huVH0f7ajfFGi5B7wISbf8-BA7-F_jm1FkLF9ikOyNEOfrJnKGpIa7t8Nu9CQw37bU5t4CmgJZH35zIYISwzgV4vngLAeiLfRLJkkR7OsoCQoHm7gGH_mrJ-cygY1ocKmi1438ks7hnMAGdODWHV7awZHHb6gOzWdPZubOcwRGjm0FBzFcibMJt8pdk3LI0gVb8qFbf-6zYwVWzNaKdMFrTNiM8kSROVXAN2IEmuUM-DVuCfosCEpLOt",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAxxkbOdpeu_BMZMV0FgiMCN6autv6Z3O-ZY9NaUAgu4_j9yfxQuUoeNIjTzKgN9Zq3-519Jt5RYTsmIXchkYAXSzfKKZ-ICl7H7nuVoYHBo0kriuyeMbxjUEg9BEAPwuqOvecgbIwQXFjxDyBVlwZdLKxLpmEKFmvS1nL_5OwiXcX91Lm6WFVIfifSBp9sGSXLtZmE_ezbAI87qx8BmhsRz9Oa1ZFpBaHnL0MZ_2RRcQn38uch2lS4JgLK8G0yWo6-Fz8HNiYbAVPJ",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJjB4SvHDZbsl9F7iDuzAl8_lNP5JdIa-wAN_vGLUqjTwqiqQ5qVc_sXpfEywPY0CXxlJ-lmXF8Ac5eFyU9uXSmS0kIEFAqskW-LMaKwE-IPPHLs0I3LHRjs0iAQjs35TWn739ES9O-18YwyQJK9Jm-INSDJDKZmY5ZZ58nU2A1UhjiA-9qE_MVclwo0Ff7zdmFC4kf_IMSiSi2xz2ghHOg06DbKLAuluq4yyG2DMqOiWPBzjMrSod5AaWnejOMq9YUPTB7MZvEqNI"
                ];
                const bgImage = images[idx % images.length];
                return (
                  <div 
                    key={course._id} 
                    onClick={() => handleEnrollClick(course._id)}
                    className="bg-surface rounded-2xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={bgImage} />
                      <div className="absolute top-md right-md bg-surface/90 px-sm py-xs rounded-lg flex items-center gap-xs shadow-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-[18px]">star</span>
                        <span className="font-label-md text-label-md text-on-surface">4.8</span>
                      </div>
                    </div>
                    <div className="p-lg">
                      <div className="flex items-center gap-sm mb-sm">
                        <span className="bg-primary-container/20 text-on-primary-fixed-variant px-sm py-xs rounded-full font-label-sm text-label-sm">
                          {course.category}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-[18px] mb-sm line-clamp-2">{course.title}</h3>
                      <div className="flex items-center gap-md mb-lg">
                        <div className="flex items-center gap-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px]">schedule</span>
                          <span className="font-body-sm text-body-sm">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-xs text-on-surface-variant">
                          <span className="material-symbols-outlined text-[18px]">person</span>
                          <span className="font-body-sm text-body-sm">{course.instructor}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-headline-md text-headline-md text-primary">${course.price}</span>
                        <button className="p-md bg-surface-container hover:bg-primary-container/20 text-primary rounded-xl transition-colors">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-3xl px-margin-mobile md:px-lg">
        <div className="max-w-container-max mx-auto bg-primary rounded-[32px] p-2xl md:p-3xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-md">Ready to start your journey?</h2>
            <p className="font-body-lg text-body-lg text-on-primary/80 mb-2xl">Get unlimited access to over 2,000+ top-rated courses taught by industry experts from around the world.</p>
            <div className="flex flex-wrap justify-center gap-md">
              <Link to="/courses" className="bg-surface text-primary px-[32px] py-md rounded-full font-label-md text-label-md hover:scale-105 transition-transform text-center">Get Started Now</Link>
              <a className="bg-primary-container text-on-primary-container px-[32px] py-md rounded-full font-label-md text-label-md hover:bg-primary-container/80 transition-colors text-center" href="#pricing">View Pricing</a>
            </div>
          </div>
          {/* Abstract blobs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/40 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container/30 rounded-full blur-[80px]"></div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
