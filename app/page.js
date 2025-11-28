import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-16 md:py-24">
      <main className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-6xl lg:text-7xl">
              CyberAware
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-700 md:text-xl lg:text-2xl">
              Master cybersecurity through <span className="font-semibold text-indigo-600">real-world phishing simulations</span> and stay protected in an increasingly dangerous digital world.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="group rounded-full bg-indigo-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1"
            >
              Sign In
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/signup"
              className="rounded-full border-2 border-indigo-600 px-10 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white hover:shadow-xl hover:-translate-y-1"
            >
              Create Free Account
            </Link>
          </div>
        </section>

        {/* Why Section */}
        <section className="mt-20 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white/80 p-10 shadow-xl backdrop-blur-sm border border-white/50">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Why Cybersecurity Awareness Matters Now More Than Ever
            </h2>
            <div className="mt-8 grid gap-6 text-left text-gray-700 md:grid-cols-2">
              <p className="leading-relaxed">
                Phishing remains the #1 attack vector for data breaches, ransomware, and identity theft. 
                Over <strong>90% of successful cyberattacks</strong> start with a deceptive email or message.
              </p>
              <p className="leading-relaxed">
                CyberAware trains you with <strong>realistic, up-to-date simulations</strong> so you can spot threats before they strike — 
                turning awareness into instinct.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Everything You Need to Stay Safe</h2>
            <p className="mt-4 text-lg text-gray-600">Learn, practice, and track progress — all in one platform</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                emoji: "🎓",
                title: "Interactive Learning",
                desc: "Experience hundreds of realistic phishing scenarios tailored to your role and industry.",
              },
              {
                emoji: "🔍",
                title: "Instant Feedback",
                desc: "Get detailed explanations the moment you make a decision — learn why something is dangerous.",
              },
              {
                emoji: "📈",
                title: "Progress Tracking",
                desc: "Individuals and admins can monitor improvement with detailed analytics and reports.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl shadow-xl">
                    {feature.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
       
      </main>
    </div>
  );
}