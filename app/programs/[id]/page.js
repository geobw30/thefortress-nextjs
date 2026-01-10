import { notFound } from "next/navigation";
import { getProgramById } from "../../../lib/programData";

export async function generateMetadata({ params }) {
  const program = getProgramById(params.id);

  if (!program) {
    return {
      title: "Program Not Found",
    };
  }

  return {
    title: program.title,
    description: program.shortDescription,
  };
}

export function generateStaticParams() {
  // This will generate static pages for all programs at build time
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default function ProgramDetailPage({ params }) {
  const program = getProgramById(params.id);

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section
        className="relative h-[60vh] md:h-[70vh] w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${program.image})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            {program.shortDescription}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Impact Stats Bar */}
            <div className="bg-gradient-to-r from-primary to-blue-700 px-6 py-6 md:px-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      Our Impact
                    </p>
                    <p className="text-white font-bold text-lg">
                      {program.impact}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">
                      Our Goal
                    </p>
                    <p className="text-white font-bold text-lg">
                      {program.goal}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout with Images */}
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Featured Image */}
              <div className="relative h-80 lg:h-auto lg:min-h-[500px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Image Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <p className="text-sm font-semibold text-primary">
                      Making a Difference
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Empowering lives through dedicated support and care
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Description */}
              <div className="p-8 md:p-12 lg:p-16">
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <span className="w-10 h-1 bg-primary rounded-full"></span>
                    About This Program
                  </h2>
                  <div
                    className="text-gray-600 leading-relaxed space-y-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&_li]:text-gray-600 [&_strong]:text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: program.detailedDescription,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Gallery Section with Third Image */}
            <div className="bg-gray-50 px-8 md:px-12 lg:px-16 py-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                <span className="w-10 h-1 bg-primary rounded-full"></span>
                Program Gallery
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Gallery Image 1 */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${program.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm">
                      Community Impact
                    </p>
                  </div>
                </div>

                {/* Gallery Image 2 */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${program.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm">
                      Empowerment in Action
                    </p>
                  </div>
                </div>

                {/* Gallery Image 3 */}
                <div className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${program.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-semibold text-sm">
                      Building Futures
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 md:px-12 lg:px-16 py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Want to Support This Program?
                  </h3>
                  <p className="text-gray-300">
                    Your contribution can make a lasting difference in someone's
                    life.
                  </p>
                </div>
                <div className="flex gap-4">
                  <a
                    href="/donate"
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Donate Now
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="mt-12 mb-16 text-center">
            <a
              href="/programs"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to All Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
