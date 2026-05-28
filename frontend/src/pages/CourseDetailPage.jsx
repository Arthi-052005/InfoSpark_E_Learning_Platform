import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch course details
  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      setCourse(response.data);

      // If user is logged in, check if they are already enrolled in this course
      if (user && response.data.studentsEnrolled.includes(user._id)) {
        setEnrolled(true);
      }
    } catch (error) {
      console.error('Error fetching course detail:', error);
      setErrorMsg('Course not found or database error.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id, user]);

  const handleEnrollClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await axios.post(`/api/users/enroll/${id}`);
      setEnrolled(true);
      setSuccessMsg('Successfully enrolled! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Failed to enroll in this course');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[72px]">
        <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[72px] text-center px-md">
        <h2 className="font-headline-lg text-headline-lg text-error mb-sm">Course Not Found</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-md">The course you are looking for does not exist or has been removed.</p>
        <Link to="/courses" className="bg-primary text-on-primary px-xl py-sm rounded-lg">Browse Courses</Link>
      </div>
    );
  }

  return (
    <div className="pt-[72px]">
      {/* Hero Header Section */}
      <section className="bg-inverse-surface text-white py-3xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2xl">
            <div className="lg:col-span-2 space-y-md">
              <div className="flex flex-wrap gap-sm">
                <span className="bg-primary-container text-on-primary-container px-md py-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider">Bestseller</span>
                <span className="bg-surface-container-highest text-on-surface-variant px-md py-xs rounded-full font-label-sm text-label-sm">{course.category}</span>
              </div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white leading-tight">
                {course.title}
              </h1>
              <p className="font-body-lg text-body-lg text-surface-variant max-w-2xl">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center gap-xl mt-lg">
                <div className="flex items-center gap-sm">
                  <span className="text-secondary-container font-bold text-headline-md">4.9</span>
                  <div className="flex text-secondary-container">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined">star</span>
                    ))}
                  </div>
                  <span className="text-surface-variant font-label-md text-label-md">(12,430 ratings)</span>
                </div>
                <div className="flex items-center gap-sm">
                  <div className="h-8 w-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary font-bold">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                  <span className="text-white font-label-md text-label-md">Instructor: <span className="underline cursor-pointer">{course.instructor}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg py-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-3xl">
            {/* Success/Error Alerts */}
            {successMsg && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative" role="alert">
                <span className="block sm:inline">{successMsg}</span>
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
                <span className="block sm:inline">{errorMsg}</span>
              </div>
            )}

            {/* What You'll Learn */}
            <div className="p-2xl border border-surface-variant rounded-2xl bg-surface-container-lowest">
              <h2 className="font-headline-md text-headline-md mb-lg">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Build scalable production applications from scratch</p>
                </div>
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Master best practices and professional developer patterns</p>
                </div>
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Deploy project solutions live to hosting environments</p>
                </div>
                <div className="flex gap-sm">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Bridging the gap between theory and code execution</p>
                </div>
              </div>
            </div>

            {/* Course Content Accordion */}
            <div className="space-y-lg">
              <h2 className="font-headline-md text-headline-md">Course Content</h2>
              <div className="flex justify-between items-center mb-md">
                <span className="font-body-sm text-body-sm text-on-surface-variant">4 sections • 24 lectures • {course.duration} total length</span>
              </div>
              <div className="divide-y divide-surface-variant border border-surface-variant rounded-xl overflow-hidden bg-surface-container-lowest">
                {/* Module 1 */}
                <details className="group" open>
                  <summary className="flex justify-between items-center p-lg bg-surface-container-low cursor-pointer list-none select-none">
                    <div className="flex items-center gap-md">
                      <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                      <span className="font-headline-md text-headline-md text-on-surface">1. Introduction & Overview</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">4 lectures • 45m</span>
                  </summary>
                  <div className="p-lg bg-white space-y-md border-t border-surface-variant">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-md items-center">
                        <span className="material-symbols-outlined text-on-surface-variant">play_circle</span>
                        <span className="font-body-md text-body-md">Defining Core Course Goals</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">12:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-md items-center">
                        <span className="material-symbols-outlined text-on-surface-variant">play_circle</span>
                        <span className="font-body-md text-body-md">Setting up the Local Environment</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">18:30</span>
                    </div>
                  </div>
                </details>
                {/* Module 2 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-lg bg-surface-container-low cursor-pointer list-none select-none">
                    <div className="flex items-center gap-md">
                      <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
                      <span className="font-headline-md text-headline-md text-on-surface">2. Deep Dive Into Core Topics</span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">8 lectures • 2h 10m</span>
                  </summary>
                  <div className="p-lg bg-white space-y-md border-t border-surface-variant">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-md items-center">
                        <span className="material-symbols-outlined text-on-surface-variant">play_circle</span>
                        <span className="font-body-md text-body-md">Advanced architectural patterns</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">25:15</span>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Instructor Bio */}
            <div className="space-y-lg">
              <h2 className="font-headline-md text-headline-md">Instructor</h2>
              <div className="space-y-md">
                <h3 className="font-headline-md text-headline-md text-primary underline">{course.instructor}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Senior Industry Practitioner</p>
                <div className="flex gap-xl text-on-surface-variant py-sm">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-secondary">star</span>
                    <span className="font-label-md text-label-md">4.8 Instructor Rating</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-secondary">reviews</span>
                    <span className="font-label-md text-label-md">45,302 Reviews</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {course.instructor} has been leading engineering teams and educational bootcamps for over a decade.
                  They focus on teaching clean code, practical workflows, and real industry-standard paradigms.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4">
            <div className="sticky top-[96px] bg-white border border-surface-variant rounded-2xl overflow-hidden shadow-lg transform transition-all">
              <div className="aspect-video relative overflow-hidden group">
                <img 
                  alt="Course Thumbnail" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDArYLW0BVn6hvMoUGIT7Lv0lr5u6hW3XN0kkWQe7BWq5iG--3yBojw8z-DMytgic8jJWiaTftKvrj22RcCmZPFbpJ2Ceyccv8PUxB4RYWCCV7FOFHWZ7-9L8WcbEJxapitQ7VbDL06HuevNh7CE7uXP27zygYR0JnBb2pjBaiViH6rkzvqLeeX2cXqLDLchPwgaruG9-9JwOuFldGf6T6Xj8Ej5d0fZYbZiIg1fHX87k2q2WDykeXpf_zImM6K2QBeP_iMfPL_nVHM" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                  <span className="material-symbols-outlined text-white text-6xl">play_circle</span>
                </div>
              </div>
              <div className="p-2xl space-y-xl">
                <div className="flex items-center gap-md">
                  <span className="font-display-lg text-display-lg text-on-surface">${course.price}</span>
                  <span className="font-body-md text-body-md text-on-surface-variant line-through">${(course.price * 1.5).toFixed(2)}</span>
                  <span className="text-tertiary font-label-md text-label-md">40% OFF</span>
                </div>
                
                <div className="space-y-sm">
                  {enrolled ? (
                    <Link 
                      to="/dashboard" 
                      className="w-full bg-secondary text-white text-center block font-label-md text-label-md py-lg rounded-lg shadow-md hover:opacity-90 active:scale-95 transition-all"
                    >
                      Enrolled! Go to Dashboard
                    </Link>
                  ) : (
                    <button 
                      onClick={handleEnrollClick}
                      disabled={enrolling}
                      className="w-full bg-primary text-on-primary font-label-md text-label-md py-lg rounded-lg shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                  )}
                  <button className="w-full border border-primary text-primary font-label-md text-label-md py-lg rounded-lg hover:bg-surface-container transition-all">
                    Add to Wishlist
                  </button>
                </div>
                
                <p className="text-center font-body-sm text-body-sm text-on-surface-variant">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-md">
                  <h4 class="font-label-md text-label-md text-on-surface">This course includes:</h4>
                  <ul className="space-y-sm">
                    <li className="flex items-center gap-md text-on-surface-variant font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[20px]">movie</span>
                      {course.duration} on-demand video
                    </li>
                    <li className="flex items-center gap-md text-on-surface-variant font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[20px]">description</span>
                      Full code repository access
                    </li>
                    <li className="flex items-center gap-md text-on-surface-variant font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[20px]">all_inclusive</span>
                      Full lifetime access
                    </li>
                    <li className="flex items-center gap-md text-on-surface-variant font-body-sm text-body-sm">
                      <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                      Certificate of completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
