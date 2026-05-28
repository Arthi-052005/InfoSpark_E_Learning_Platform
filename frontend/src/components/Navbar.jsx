import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-surface/80 shadow-sm border-b border-surface-variant">
        <div className="flex justify-between items-center h-[72px] px-margin-mobile md:px-lg max-w-container-max mx-auto">
          <div className="flex items-center gap-md">
            <button 
              className="lg:hidden text-on-surface-variant p-2 hover:bg-surface-container rounded-full" 
              onClick={toggleDrawer}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link to="/" className="text-headline-md font-headline-md font-bold text-primary">EduFlow</Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-xl">
            <Link 
              className={`font-label-md text-label-md py-2 transition-colors duration-200 ${
                isActive('/') ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`} 
              to="/"
            >
              Home
            </Link>
            <Link 
              className={`font-label-md text-label-md py-2 transition-colors duration-200 ${
                isActive('/courses') ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
              }`} 
              to="/courses"
            >
              Browse Courses
            </Link>
            {user && (
              <Link 
                className={`font-label-md text-label-md py-2 transition-colors duration-200 ${
                  isActive('/dashboard') ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
                }`} 
                to="/dashboard"
              >
                My Learning
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-md">
            {/* Search Bar (Hidden on Mobile) */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center bg-surface-container rounded-full px-md py-xs border border-outline-variant">
              <button type="submit" className="material-symbols-outlined text-outline text-[20px]">search</button>
              <input 
                className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm w-40 px-2 outline-none" 
                placeholder="Search courses..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {user ? (
              <div className="flex items-center gap-md">
                <button className="material-symbols-outlined text-on-surface-variant">notifications</button>
                <div className="flex items-center gap-sm">
                  <Link to="/dashboard" className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border-2 border-surface-variant">
                    <span className="material-symbols-outlined text-primary">person</span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="hidden md:block font-label-md text-label-md text-error hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-md">
                <Link to="/login" className="font-label-md text-label-md text-primary hover:underline decoration-2">
                  Login
                </Link>
                <Link to="/login?tab=register" className="bg-primary text-on-primary px-xl py-base rounded-full font-label-md text-label-md hover:opacity-90 transition-transform active:scale-95">
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* NavigationDrawer (Mobile Sidebar) */}
      <div 
        className={`fixed inset-0 bg-on-surface/40 z-[60] transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 block' : 'opacity-0 hidden'
        }`} 
        onClick={toggleDrawer}
      ></div>
      <aside 
        className={`fixed inset-y-0 left-0 z-[70] flex flex-col h-full w-[280px] bg-surface-container rounded-r-xl shadow-lg transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-lg flex flex-col gap-sm">
          <span className="font-headline-md text-headline-md text-primary mb-md">EduFlow</span>
          
          {user ? (
            <div className="flex items-center gap-md p-md bg-surface-container-high rounded-xl mb-lg">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                <span className="material-symbols-outlined">person</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-label-md text-label-md text-on-surface truncate">{user.name}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant uppercase">{user.role}</p>
              </div>
            </div>
          ) : (
            <div className="p-md bg-surface-container-high rounded-xl mb-lg">
              <p className="font-label-md text-label-md text-on-surface mb-xs">Welcome to EduFlow</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">Login to track your learning progress.</p>
              <Link 
                to="/login" 
                onClick={toggleDrawer}
                className="w-full bg-primary text-on-primary py-2 rounded-xl text-center font-label-md text-label-md block"
              >
                Login / Register
              </Link>
            </div>
          )}

          <nav className="flex flex-col gap-xs">
            <Link 
              className={`rounded-full px-4 py-3 flex items-center gap-md ${
                isActive('/') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-highest'
              }`} 
              to="/" 
              onClick={toggleDrawer}
            >
              <span className="material-symbols-outlined">home</span>
              <span className="font-label-md text-label-md">Home</span>
            </Link>
            <Link 
              className={`rounded-full px-4 py-3 flex items-center gap-md ${
                isActive('/courses') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-highest'
              }`} 
              to="/courses" 
              onClick={toggleDrawer}
            >
              <span className="material-symbols-outlined">explore</span>
              <span className="font-label-md text-label-md">Browse Courses</span>
            </Link>
            {user && (
              <Link 
                className={`rounded-full px-4 py-3 flex items-center gap-md ${
                  isActive('/dashboard') ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`} 
                to="/dashboard" 
                onClick={toggleDrawer}
              >
                <span className="material-symbols-outlined">school</span>
                <span className="font-label-md text-label-md">My Learning</span>
              </Link>
            )}
            <hr className="my-sm border-outline-variant" />
            {user && (
              <button 
                onClick={() => {
                  logout();
                  toggleDrawer();
                }} 
                className="text-error px-4 py-3 hover:bg-surface-container-highest rounded-full flex items-center gap-md w-full text-left"
              >
                <span className="material-symbols-outlined">logout</span>
                <span className="font-label-md text-label-md">Logout</span>
              </button>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
