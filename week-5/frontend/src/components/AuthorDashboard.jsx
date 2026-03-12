import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthorDashboard() {
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
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchArticles(parsedUser._id);
  }, [navigate]);

  const fetchArticles = async (authorId) => {
    try {
      let res = await fetch(`http://localhost:3000/author-api/articles/${authorId}`, {
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

  const handleDelete = async (articleId) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      let res = await fetch(`http://localhost:3000/author-api/articles/${articleId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false }),
        credentials: 'include',
      });

      if (res.ok) {
        setArticles(articles.filter((article) => article._id !== articleId));
      } else {
        let data = await res.json();
        alert(data.message || 'Failed to delete article');
      }
    } catch (err) {
      alert('Error deleting article');
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-700 mb-2">Welcome, {user?.firstName}!</h1>
          <p className="text-gray-500">Manage your articles</p>
        </div>
        <button
          onClick={() => navigate('/add-article')}
          className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition font-semibold"
        >
          + New Article
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-xl mb-4">You haven't published any articles yet</p>
          <button
            onClick={() => navigate('/add-article')}
            className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Create Your First Article
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-700 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{article.category}</p>
              <p className="text-gray-600 line-clamp-3 mb-4">{article.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(article._id)}
                  className="flex-1 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorDashboard;