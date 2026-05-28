import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ className = '' }) => {
  return (
    <footer className={`w-full border-t border-surface-variant bg-surface-container-lowest mt-3xl ${className}`}>
      <div className="w-full py-2xl px-margin-mobile md:px-lg max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-gutter">
        <div className="col-span-2 md:col-span-1">
          <span className="font-headline-md text-headline-md text-primary mb-md block font-bold">EduFlow</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
            Empowering learners worldwide through accessible, high-quality online education and expert mentorship.
          </p>
          <div className="flex gap-md">
            <a className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </a>
            <a className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-sm">
          <span className="font-label-md text-label-md text-on-surface mb-sm">EduFlow</span>
          <Link className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" to="/courses">Browse Courses</Link>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Careers</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Contact Us</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Teaching</a>
        </div>
        <div className="flex flex-col gap-sm">
          <span className="font-label-md text-label-md text-on-surface mb-sm">Resources</span>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Business</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Mobile App</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Blog</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Help Center</a>
        </div>
        <div className="flex flex-col gap-sm">
          <span className="font-label-md text-label-md text-on-surface mb-sm">Legal</span>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Terms of Service</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Privacy Policy</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all" href="#">Cookie Settings</a>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-lg py-xl border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant">© 2026 EduFlow E-Learning. All rights reserved.</p>
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-on-surface-variant">language</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">English (US)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
