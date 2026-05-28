import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-[72px] min-h-screen flex flex-col justify-between">
      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile">
        <div className="max-w-4xl w-full text-center space-y-xl py-3xl">
          {/* Asymmetric Glassmorphism Container for the 404 Visual */}
          <div className="relative inline-block group">
            {/* Background decorative element */}
            <div className="absolute -inset-4 bg-primary-container/20 rounded-3xl blur-2xl group-hover:bg-primary-container/30 transition-all duration-500"></div>
            <div className="relative bg-surface-container-lowest/40 backdrop-blur-xl border border-surface-variant rounded-3xl p-2xl md:p-3xl shadow-xl flex flex-col md:flex-row items-center gap-xl">
              {/* Illustrative Graphic */}
              <div className="w-full md:w-1/2 aspect-square max-w-[320px] rounded-2xl overflow-hidden shadow-sm">
                <img 
                  alt="404 Illustration" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIcUCCXFZxsfMKv0TjPm6qsayHBXLytt_aJO7I4s4arHh1HLl-hE0ptjJJ6WrU4l62Mqk1uzcVf5LPhI62jtYun2ziPT_rApllZKEEbOxNR9wzdie06tvjRzyNTVbLh98B_OAOsN-X7lx3pNi6U38Rmy5-sIMGGucPK5HFnTtRrQVFhgKeOSSVaU2my7woFNYu-SXclVxANwP4hng6R6QZAeyUh7LoqYsztzngzP0-ek2tEhOhWNICQerKcYXx7cKwQXKsPRVyGSM0" 
                />
              </div>
              {/* Message Content */}
              <div className="w-full md:w-1/2 text-left space-y-md">
                <h1 className="text-primary font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg leading-tight">
                  404
                </h1>
                <p className="text-on-surface font-headline-md text-headline-md">
                  Oops! The page you're looking for doesn't exist.
                </p>
                <p className="text-on-surface-variant font-body-md text-body-md max-w-sm">
                  The link might be broken, or the lesson you're searching for has been moved to a new curriculum.
                </p>
                {/* CTA Section */}
                <div className="pt-md flex flex-wrap gap-md">
                  <Link 
                    className="inline-flex items-center justify-center bg-primary text-on-primary px-xl py-md rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shadow-md active:scale-95" 
                    to="/"
                  >
                    <span className="material-symbols-outlined mr-sm text-[20px]">home</span>
                    Back to Home
                  </Link>
                  <button 
                    className="inline-flex items-center justify-center border border-outline text-on-surface px-xl py-md rounded-lg font-label-md text-label-md hover:bg-surface-container transition-all active:scale-95" 
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Links (Bento-style chips) */}
          <div className="pt-2xl max-w-2xl mx-auto">
            <p className="text-label-sm font-label-sm text-outline uppercase tracking-widest mb-md text-center">Maybe you were looking for?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <Link className="p-lg bg-surface-container-low rounded-xl border border-surface-variant hover:border-primary hover:shadow-md transition-all text-left block" to="/courses">
                <span className="material-symbols-outlined text-primary mb-sm">explore</span>
                <h4 className="font-label-md text-label-md text-on-surface">Explore Courses</h4>
              </Link>
              <Link className="p-lg bg-surface-container-low rounded-xl border border-surface-variant hover:border-primary hover:shadow-md transition-all text-left block" to="/dashboard">
                <span className="material-symbols-outlined text-primary mb-sm">school</span>
                <h4 className="font-label-md text-label-md text-on-surface">My Dashboard</h4>
              </Link>
              <a className="p-lg bg-surface-container-low rounded-xl border border-surface-variant hover:border-primary hover:shadow-md transition-all text-left block" href="#">
                <span className="material-symbols-outlined text-primary mb-sm">help</span>
                <h4 className="font-label-md text-label-md text-on-surface">Support Center</h4>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
