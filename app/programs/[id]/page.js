import { notFound } from 'next/navigation';
import { getProgramById } from '../../../lib/programData';

export async function generateMetadata({ params }) {
  const program = getProgramById(params.id);
  
  if (!program) {
    return {
      title: 'Program Not Found'
    };
  }
  
  return {
    title: program.title,
    description: program.shortDescription
  };
}

export function generateStaticParams() {
  // This will generate static pages for all programs at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default function ProgramDetailPage({ params }) {
  const program = getProgramById(params.id);

  if (!program) {
    notFound();
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        {/* Full-width image */}
        <div 
          className="w-full h-96 md:h-[500px] bg-cover bg-center mb-8 rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${program.image})` }}
          aria-label={program.title}
        />
        
        {/* Program title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          {program.title}
        </h1>
        
        {/* Detailed description */}
        <div className="prose max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: program.detailedDescription }} 
          />
        </div>
        
        {/* Back button */}
        <div className="mt-12">
          <a 
            href="/programs" 
            className="inline-flex items-center text-primary hover:text-blue-800 transition duration-300"
          >
            ← Back to All Programs
          </a>
        </div>
      </div>
    </div>
  );
}