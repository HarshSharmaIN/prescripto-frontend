import { ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const DoctorBlogs = () => {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-primary mb-8 text-center">
        Blogs by Doctors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsData.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl"
              onClick={() => navigate(`/blog/${item._id}`)}
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <div className="text-sm text-gray-500 mt-1 text-end my-2">
                by <span className="font-medium">{item.author}</span> •{" "}
                {item.date}
              </div>
              <img src={item.coverImg} height={200} width={300} />
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
    </div>
  );
};

export default DoctorBlogs;
