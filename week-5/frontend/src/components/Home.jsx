import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="text-center px-6">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-4xl shadow-lg">
          B
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to BlogApp</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Share your thoughts, read inspiring stories, and connect with a community of writers and readers.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-400 text-white px-8 py-3 rounded-lg hover:bg-blue-500 transition font-semibold text-lg shadow-md"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-400 border-2 border-blue-400 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold text-lg shadow-md"
          >
            Login
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Write Articles</h3>
            <p className="text-gray-600">Share your knowledge and experiences with the world</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Connect</h3>
            <p className="text-gray-600">Engage with writers and readers from around the globe</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Grow</h3>
            <p className="text-gray-600">Build your audience and make an impact</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
