import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Blog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState(false);
  const { backendUrl, Loader, isLoading, setIsLoading } =
    useContext(AppContext);
    const navigate = useNavigate();

  const getBlogData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(backendUrl + "/api/doctor/get-blog", {
        blogId,
      });

      if (data.success) {
        setBlogData(data.blog);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-gray-100 my-10">
      <div className="mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {blogData.coverImg && (
          <img
            src={blogData.coverImg}
            alt="Blog Cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="p-10">
          <h1 className="text-5xl max-sm:text-3xl font-bold text-gray-800 mb-4">
            {blogData.title}
          </h1>
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span>
              By <span className="font-semibold">{blogData.author}</span>
            </span>
            <span className="mx-2">•</span>
            <span>{blogData.date}</span>
          </div>

          <article className="prose prose-lg max-w-none">
            <h2 className="mb-4">Summary</h2>
            <div dangerouslySetInnerHTML={{ __html: blogData.summary }}></div>
          </article>

          <article className="prose prose-lg max-w-none mt-8">
            <h2 className="mb-4">Content</h2>
            <div dangerouslySetInnerHTML={{ __html: blogData.content }}></div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;
