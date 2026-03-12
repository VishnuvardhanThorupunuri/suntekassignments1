import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/GlobleStore";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = useAuth((state) => state.login);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let navigate = useNavigate();

  const onLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      let res = await fetch("http://localhost:3000/common-api/authenticate",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      let data = await res.json();

      if (res.status === 200) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(data.payload));
        // Navigate based on role
        if (data.payload.role === "USER") {
          navigate("/user-dashboard");
        } else if (data.payload.role === "AUTHOR") {
          navigate("/author-dashboard");
        } else {
          navigate("/");
        }
      } else {
        throw new Error(data.message || "Invalid email or password.");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-orange-400 text-3xl mt-20">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-400 text-3xl mb-4">{error.message}</p>
        <button 
          onClick={() => setError(null)}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h1>

        <form onSubmit={handleSubmit(onLogin)}>

          {/* Role Selection */}
          <div className="mb-4">
            <div className="flex items-center gap-6">
              <span className="text-gray-600 font-medium">Login as:</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="USER"
                  {...register("role", { required: "Please select a role" })}
                  className="accent-blue-400 w-4 h-4"
                  defaultChecked
                />
                <span>User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="AUTHOR"
                  {...register("role", { required: "Please select a role" })}
                  className="accent-blue-400 w-4 h-4"
                />
                <span>Author</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Email — must match a registered email in UserModel */}
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password - required in UserModel */}
          <div className="mt-4">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              placeholder="Password"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200 mt-6"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;