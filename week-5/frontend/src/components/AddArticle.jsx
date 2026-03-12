import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddArticle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  let navigate = useNavigate();

  const onAddArticle = async (article) => {
    setLoading(true);
    setError(null);
    
    try {
      let res = await fetch("http://localhost:3000/author-api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(article),
        credentials: "include",
      });

      let data = await res.json();

      if (res.status === 201) {
        navigate("/author-dashboard");
      } else {
        throw new Error(data.message || "Failed to publish article. Please try again.");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-orange-400 text-3xl mt-20">Publishing...</p>;
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
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Add Article</h1>

        <form onSubmit={handleSubmit(onAddArticle)}>

          {/* Title — required in ArticleModel */}
          <div>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
                maxLength: { value: 150, message: "Title cannot exceed 150 characters" },
              })}
              placeholder="Article Title"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category — required in ArticleModel */}
          <div className="mt-4">
            <input
              type="text"
              {...register("category", {
                required: "Category is required",
                minLength: { value: 2, message: "Category must be at least 2 characters" },
                maxLength: { value: 50, message: "Category cannot exceed 50 characters" },
              })}
              placeholder="Category (e.g. Technology, Travel)"
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Content — required in ArticleModel */}
          <div className="mt-4">
            <textarea
              {...register("content", {
                required: "Content is required",
                minLength: { value: 20, message: "Content must be at least 20 characters" },
              })}
              placeholder="Write your article content here..."
              rows={6}
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
            {errors.content && (
              <p className="text-red-400 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition duration-200 mt-4"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;