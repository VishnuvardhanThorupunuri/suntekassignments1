import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/common-api/logout', {
        credentials: 'include',
      });
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo on the left */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
          <span className="text-xl font-bold text-gray-700 tracking-tight">BlogApp</span>
        </div>

        {/* Nav links on the right */}
        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold border-b-2 border-blue-400 pb-0.5"
                : "text-gray-600 hover:text-blue-400 font-medium transition duration-150"
            }
          >
            Home
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold border-b-2 border-blue-400 pb-0.5"
                    : "text-gray-600 hover:text-blue-400 font-medium transition duration-150"
                }
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold border-b-2 border-blue-400 pb-0.5"
                    : "text-gray-600 hover:text-blue-400 font-medium transition duration-150"
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              {user.role === 'USER' && (
                <NavLink
                  to="/user-dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-semibold border-b-2 border-blue-400 pb-0.5"
                      : "text-gray-600 hover:text-blue-400 font-medium transition duration-150"
                  }
                >
                  My Dashboard
                </NavLink>
              )}

              {user.role === 'AUTHOR' && (
                <>
                  <NavLink
                    to="/author-dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 font-semibold border-b-2 border-blue-400 pb-0.5"
                        : "text-gray-600 hover:text-blue-400 font-medium transition duration-150"
                    }
                  >
                    My Articles
                  </NavLink>

                  <NavLink
                    to="/add-article"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-blue-500 text-white px-4 py-1.5 rounded-lg font-semibold"
                        : "bg-blue-400 text-white px-4 py-1.5 rounded-lg hover:bg-blue-500 font-medium transition duration-150"
                    }
                  >
                    Add Article
                  </NavLink>
                </>
              )}

              <span className="text-gray-600">Hi, {user.firstName}</span>

              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-400 font-medium transition duration-150"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;