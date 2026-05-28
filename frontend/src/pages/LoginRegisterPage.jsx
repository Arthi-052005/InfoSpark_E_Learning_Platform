import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/Footer';

const LoginRegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  
  const { user, login, register } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync tab with search parameters
  useEffect(() => {
    setActiveTab(initialTab);
    setErrorMsg('');
  }, [initialTab]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[72px] min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center py-2xl px-margin-mobile md:px-lg relative overflow-hidden bg-surface-container-low">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary-container/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>

        <div className="w-full max-w-md bg-white border border-surface-variant shadow-lg rounded-2xl overflow-hidden p-2xl z-10">
          <div className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-xs">EduFlow</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Your journey to mastery starts here.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-surface-variant mb-lg">
            <button
              className={`flex-1 py-sm font-label-md text-label-md border-b-2 text-center transition-all ${
                activeTab === 'login'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
              }}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-sm font-label-md text-label-md border-b-2 text-center transition-all ${
                activeTab === 'register'
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
              }}
            >
              Register
            </button>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-error text-error text-body-sm p-md mb-lg rounded-r" role="alert">
              <p>{errorMsg}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-lg">
            {activeTab === 'register' && (
              <div className="space-y-xs">
                <label className="block font-label-sm text-label-sm text-on-surface">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-xs">
              <label className="block font-label-sm text-label-sm text-on-surface">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-xs">
              <label className="block font-label-sm text-label-sm text-on-surface">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-body-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-md text-label-md py-lg rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-sm">
                  <svg className="animate-spin h-5 w-5 text-on-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : activeTab === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginRegisterPage;
