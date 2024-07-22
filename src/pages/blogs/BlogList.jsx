import { get } from '@/utils/api';
import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await get('/blogs');
      setBlogs(data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section>
      {/* <Container> */}
        {/* <div className="flex gap-5">
          {blogs.map((blog, index) => (
            <Box key={index} className="relative w-1/2" component={Link} to={`blogs/${blog.id}`}>
              <div className="relative block rounded-lg bg-white text-white shadow-secondary-1 dark:bg-surface-dark">
                <img
                  className="rounded-lg h-72 w-full"
                  src={`http://127.0.0.1:8000/storage/blog_images/${blog.image}`}
                  alt="Blog image"
                />
                <div className="absolute top-0 p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight">
                    {blog.title}
                  </h5>
                  <p className="mb-4 text-base">{blog.description}</p>
                  <p className="text-base">
                    <small>Last updated {blog.updated_at}</small>
                  </p>
                </div>
              </div>
            </Box>
          ))}
        </div> */}
        <div className="bg-[url('https://krypton-blog-hugo.netlify.app/images/boxed-water-is-better-km8IZ4xX9vA-unsplash_hu7aaac217ef97daf7bdd1a6c91b41c30e_323178_1000x0_resize_q100_h2_box.webp')] bg-contain flex h-[40rem] bg-no-repeat">
            <div className="flex h-100 p-8 bg-[rgba(0, 0, 0, 0.4)] flex-col">

            </div>
        </div>
      {/* </Container> */}
    </section>
  );
};

export default BlogList;

