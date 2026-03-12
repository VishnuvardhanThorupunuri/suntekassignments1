import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let navigate = useNavigate();

  const onRegister = async (newUser) => {
    setLoading(true);
    setError(null);
    
    // Determine API route based on role
    let apiUrl = newUser.role === "USER"
      ? "http://localhost:3000/user-api/users"
      : "http://localhost:3000/author-api/users";
    
    try {
      let res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
        credentials: "include",
      });

      let data = await res.json();

      if (res.status === 201) {
        navigate("/login");
      } else {
        throw new Error(data.message || "Registration failed. Please try again.");
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
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h1>

        <form onSubmit={handleSubmit(onRegister)}>

          {/* Role Selection */}
          <div className="mb-1">
            <div className="flex items-center gap-6">
              <span className="text-gray-600 font-medium">Select Role:</span>
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

          {/* First & Last Name */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1">
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                  maxLength: { value: 50, message: "Max 50 characters" },
                })}
                placeholder="First name"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex-1">
              {/* lastName is optional in UserModel */}
              <input
                type="text"
                {...register("lastName", {
                  maxLength: { value: 50, message: "Max 50 characters" },
                })}
                placeholder="Last name (optional)"
                className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
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

          {/* Password */}
          <div className="mt-4">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                maxLength: { value: 100, message: "Password too long" },
              })}
              placeholder="Password"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Image URL (optional) */}
          <div className="mt-4">
            <input
              type="text"
              {...register("profileImageUrl")}
              placeholder="Profile image URL (optional)"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <p className="text-gray-400 text-xs mt-1">Enter an image URL (e.g., https://example.com/photo.jpg)</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200 mt-6"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;