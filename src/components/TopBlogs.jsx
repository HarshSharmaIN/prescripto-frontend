import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const TopBlogs = () => {
  const navigate = useNavigate();
  const [blogsData, setBlogsData] = useState([]);
  const { backendUrl } = useContext(AppContext);

  const fetchBlogs = async () => {
    const { data } = await axios.get(backendUrl + "/api/doctor/get-blogs");

    if (data.success) {
      setBlogsData(data.blogs);
    } else {
      console.log(data.message);
      toast.error(data.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h2 className="text-3xl font-medium text-gray-900 mb-8 text-center">
        Blogs by Doctors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsData
          .slice(0, 6)
          .map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <div className="text-sm text-gray-500 mt-1">
                by <span className="font-medium">{item.author}</span> •{" "}
                {item.date}
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {item.summary.substring(0, 30)}...
              </p>
              <button
                className="mt-6 inline-flex items-center space-x-1 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                onClick={() => navigate(`/blog/${item._id}`)}
              >
                <span>Read More</span> <ChevronRight size={20} />
              </button>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          navigate("/blogs");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default TopBlogs;
