import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

const StudentDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('/api/users/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  // Calculate cumulative stats based on enrolled courses
  const totalHours = courses.length * 15; // Mock hour counts
  const coursesCompleted = courses.length > 0 ? Math.floor(courses.length / 2) : 0;
  const certificatesEarned = coursesCompleted;

  const handleContinueLesson = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="pt-[72px] min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col lg:flex-row relative">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-[72px] bottom-0 w-[280px] bg-surface-container border-r border-surface-variant z-40 p-md overflow-y-auto">
          <div className="flex items-center gap-md px-4 py-6 mb-md">
            <div className="h-12 w-12 rounded-full bg-primary-fixed-dim flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-label-md text-label-md text-on-surface truncate">{user?.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant uppercase">{user?.role}</p>
            </div>
          </div>
          <nav className="space-y-sm">
            <Link className="flex items-center gap-md bg-primary-container text-on-primary-container rounded-full px-4 py-3 font-label-md text-label-md transition-all" to="/dashboard">
              <span className="material-symbols-outlined fill-1" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              Dashboard
            </Link>
            <Link className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-full px-4 py-3 font-label-md text-label-md transition-all" to="/courses">
              <span className="material-symbols-outlined">school</span>
              Browse Courses
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-[280px] px-margin-mobile md:px-lg py-xl max-w-container-max mx-auto w-full">
          <header className="mb-3xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Welcome back, {user?.name}!</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Track your progress and continue learning where you left off.</p>
          </header>

          {/* Stats Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-3xl">
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-md">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Hours Learned</span>
                <span className="material-symbols-outlined text-primary">schedule</span>
              </div>
              <p className="font-display-lg text-display-lg text-on-surface">{totalHours}</p>
              <div className="flex items-center gap-xs mt-sm text-success text-[14px]">
                <span className="material-symbols-outlined text-[18px] text-primary">trending_up</span>
                <span className="text-primary font-semibold">+12% from last month</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-md">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Courses ongoing</span>
                <span className="material-symbols-outlined text-secondary">task_alt</span>
              </div>
              <p className="font-display-lg text-display-lg text-on-surface">{courses.length}</p>
              <div className="flex items-center gap-xs mt-sm text-[14px]">
                <span className="text-on-surface-variant font-body-sm">{coursesCompleted} completed courses</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-md">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Certificates Earned</span>
                <span className="material-symbols-outlined text-tertiary">workspace_premium</span>
              </div>
              <p className="font-display-lg text-display-lg text-on-surface">{certificatesEarned}</p>
              <div className="flex items-center gap-xs mt-sm text-[14px]">
                <span className="text-tertiary font-semibold cursor-pointer">View all certificates</span>
              </div>
            </div>
          </section>

          {/* Enrolled Courses Section */}
          <section className="mb-3xl">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface">My Courses</h2>
              <Link className="text-primary font-label-md text-label-md hover:underline" to="/courses">Browse More</Link>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-2xl">
                <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-3xl bg-surface-container-lowest border border-surface-variant rounded-2xl p-xl">
                <span className="material-symbols-outlined text-6xl text-outline mb-md">school</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">No courses enrolled</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">You haven't enrolled in any courses yet.</p>
                <Link to="/courses" className="bg-primary text-on-primary px-xl py-sm rounded-lg">Browse Courses</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {courses.map((course, index) => {
                  // progress mock values
                  const progressVals = [75, 32, 100, 0, 50];
                  const progress = progressVals[index % progressVals.length];
                  
                  const thumbnails = [
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuC7je2GWa5Fe0V-lUMiBD0J-tjAgd_K_6UzE_s7UjLqH5vKue7R_WEJBtr3O0nmrZLS-PbQCUi8TfFgDDU7tVQVvZuGoXTvQLLLPKQUqOcjzSJymNqxB5LRM8XnFyJs9TEzzxC7QMyRKfWfwhD6hrU4q2VJ6f_DyIZ1BxmqJgDjSA_yYoSbTJHLxKoYOFw4mqBYrlZk82kZxaLQV_i_D8S87S44RU2d0ho7_yuOCMYPYW4Vn6SXveHFK5ulCzvSjXBH9ByRae6Sqx21",
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuB_IfzdIXR_cgosLm0kJtp94cv3-DoZ-qYDHZCIScdfhiD4tggNdeL54CSw-l6bT1G3pIJjznWzZQEhzN3UUaCktqc9MfEJl6hHDe6i0y0hZ8QjZy_Yk_aKz6hNdcKz_6UHgePr0FE5NKASZB4fxZDe7PLkbdEVNNVgOMQ_TxTvrLitSqXUaXpa6U0fhu14o6H0cORLdd_wVx0Ikt8hW9ZhPN01YrMoqOYFJIu76ZK458BYrMAddnkv41DlyusUdZFaLiePTLNB04v6"
                  ];
                  const thumbnail = thumbnails[index % thumbnails.length];

                  return (
                    <div key={course._id} className="group bg-surface-container-lowest border border-surface-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                      <div className="h-48 overflow-hidden relative">
                        <img alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={thumbnail} />
                        <div className="absolute top-md left-md">
                          <span className="bg-primary-container text-on-primary-container px-sm py-xs rounded-lg font-label-sm text-label-sm shadow-md">
                            {course.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-lg">
                        <h3 className="font-headline-md text-[20px] text-on-surface mb-sm line-clamp-1">{course.title}</h3>
                        <div className="flex items-center gap-sm mb-lg">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">person</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">{course.instructor}</span>
                        </div>
                        <div className="space-y-xs">
                          <div className="flex justify-between font-label-sm text-label-sm">
                            <span className="text-on-surface-variant">Progress</span>
                            <span className="text-on-surface font-bold">{progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                            <div className="h-full bg-secondary-container rounded-full" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleContinueLesson(course._id)}
                          className="mt-lg w-full bg-primary text-on-primary py-md rounded-xl font-label-md text-label-md hover:bg-primary/90 transition-colors active:scale-[0.98]"
                        >
                          {progress === 100 ? 'Review Course' : 'Continue Lesson'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Adjust footer layout for sidebar margin */}
      <Footer className="lg:ml-[280px] lg:w-[calc(100%-280px)]" />
    </div>
  );
};

export default StudentDashboardPage;
