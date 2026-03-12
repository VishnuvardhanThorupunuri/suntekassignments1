import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
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
    if (parsedUser.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    setUser(parsedUser);
    setLoading(false);
  }, [navigate]);

  const handleBlockUser = async (userId) => {
    try {
      let res = await fetch(`http://localhost:3000/admin-api/users/${userId}/block`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        alert('User blocked successfully');
      } else {
        let data = await res.json();
        alert(data.message || 'Failed to block user');
      }
    } catch (err) {
      alert('Error blocking user');
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      let res = await fetch(`http://localhost:3000/admin-api/users/${userId}/unblock`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (res.ok) {
        alert('User unblocked successfully');
      } else {
        let data = await res.json();
        alert(data.message || 'Failed to unblock user');
      }
    } catch (err) {
      alert('Error unblocking user');
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
      <h1 className="text-4xl font-bold text-gray-700 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Manage users and content</p>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">User Management</h2>
        <p className="text-gray-600">Admin features are available via API endpoints.</p>
        <p className="text-gray-500 text-sm mt-2">
          Use the admin API routes to block/unblock users and manage content.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;