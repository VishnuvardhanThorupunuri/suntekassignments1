import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    fetchArticles();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      let res = await fetch('http://localhost:3000/user-api/articles', {
        credentials: 'include',
      });

      let data = await res.json();

      if (res.ok) {
        setArticles(data.payload || []);
      } else {
        throw new Error(data.message || 'Failed to fetch articles');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-orange-400 text-3xl mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 text-3xl mt-20">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-700 mb-2">Welcome, {user?.firstName}!</h1>
      <p className="text-gray-500 mb-8">Browse all articles</p>

      {articles.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-20">No articles available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-700 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                By {article.author?.firstName} | {article.category}
              </p>
              <p className="text-gray-600 line-clamp-3">{article.content}</p>
              <div className='flex gap-2'>
                <a href='' ></a>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;