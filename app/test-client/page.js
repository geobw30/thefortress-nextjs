export default function TestComponentsPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Component Test</h1>
      
      {/* Card component test */}
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Card Title</div>
          <p className="text-gray-700 text-base">
            This is a test card to see if Tailwind classes are working with component-like structures.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #test
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #tailwind
          </span>
        </div>
      </div>
      
      {/* Button test */}
      <div className="mt-8 text-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Primary Button
        </button>
        <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Success Button
        </button>
      </div>
    </div>
  );
}