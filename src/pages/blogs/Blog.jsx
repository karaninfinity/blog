import { get } from '@/utils/api';
import { Box, Container, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const { data } = await get(`/blog/${id}`);
      setBlog({ ...data.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (!blog) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" gutterBottom>
          {blog.title}
        </Typography>
        <img
          src={`http://127.0.0.1:8000/storage/blog_images/${blog.image}`}
          alt={blog.title}
          style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
        />
        <Divider />
        {/* <Typography variant="body1" gutterBottom>
          {blog.content}
        </Typography> */}
        <div dangerouslySetInnerHTML={{ __html: blog.content}}/>
        <Typography variant="body2" color="text.secondary">
          By {blog?.user?.name} | {new Date(blog.created_at).toLocaleString()}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          Categories:{' '}
            {/* <Link key={category.id} to={`/subcategories/${category.id}`}> */}
              {blog.category.category}
            {/* </Link> */}
        </Typography>
      </Box>
    </Container>
  );
};

export default Blog

