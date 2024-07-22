import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
import { Form, Formik, useFormik } from 'formik';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { get, post } from "../../utils/api";
import { useRouter } from "../../routes/hooks/use-router"
import { useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const BlogForm = () => {
    
    const [image, setImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [content, setContent] = useState("");
    const [blog, setBlog] = useState({});
    const { id } = useParams();
    const router = useRouter();

    const formik = useFormik({
        initialValues : {
            category_id: id ? blog?.category_id : "",
            subcategory_id: id ? blog?.subcategory_id : "",
            title: id ? blog?.title : "",
            description: id ? blog?.description : "",
            content: id ? blog?.content : "",
            image: image,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (id) {
                post(`/update/blog/${id}`, values).then((resp) => {
                    if(resp.data.success){
                        router.back();
                    }
                });
                console.log(values);
            } else {
                console.log(values);
                post("/add/blog", values).then((resp) => {
                    if(resp.data.success){
                        router.back();
                    }
                });
            }
        }
    });

    const getCategories = async() => {
        const { data } = await get("/categories");
        setCategories(data.data);
    }
    
    const getSubcategories = async (id) => {
        const { data } = await get(`/subcategories/${id}`);
        setSubcategories(data.data);
    }

    const getBlog =  async (id) => {
        const { data } = await get(`/blog/${id}`);
        if(data?.success){
            setBlog({...data.data});
            getSubcategories(data?.data.category_id);
            setContent(data?.data?.content);
            setPreviewURL(`http://127.0.0.1:8000/storage/blog_images/${data.data.image}`);
        }
    }

    const handleEditorChange = (content, editor) => {
        formik.setValues({
            ...formik.values,
            content: content
        });
    };

    useEffect(() => {
        if(image){
            const reader = new FileReader();
            const URL = reader.readAsDataURL(image);
            reader.onload = () => {
                setPreviewURL(reader.result);
            };
            setPreviewURL(URL);
        }
    }, [image]);

    useEffect(() => {
        getCategories();
        if(id){
            getBlog(id);
        }
    },[]);

    useEffect(() => {
        formik.setValues({ ...formik.values, image: image });
    }, [image]);

  return (
    <div className='mt-12'>
        <Formik initialValues={formik.initialValues}>
            <Form onSubmit={formik.handleSubmit}>
                <Card className="xl:col-span-2 border border-blue-gray-100 shadow-sm mt-20"> 
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            { id ? "Update" : "Add"} Blog
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-10">
                                <div className="w-full flex items-center gap-5">
                                    <div className="w-1/2">
                                        <FormControl fullWidth>
                                            <InputLabel>Category</InputLabel>                     
                                        <Select
                                                label="Category"
                                                name="category_id"
                                                value={formik.values?.category_id ?? ""}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    getSubcategories(e.target.value);
                                                }}
                                        >
                                                {
                                                    categories.map((category) => {
                                                        return <MenuItem key={category?.id} value={category?.id}>{category?.category}</MenuItem>
                                                    })
                                                }
                                        </Select>
                                        </FormControl>
                                    </div>
                                    <div className="w-1/2">                         
                                        <FormControl fullWidth>
                                            <InputLabel>Subcategory</InputLabel>                     
                                            <Select
                                                    label="Subcategory"
                                                    name="subcategory_id"
                                                    value={formik.values?.subcategory_id ?? ""}
                                                    onChange={formik.handleChange}
                                            >
                                                    {
                                                        subcategories.map((subcategory) => {
                                                            return <MenuItem key={subcategory?.id} value={subcategory?.id}>{subcategory?.subcategory}</MenuItem>
                                                        })
                                                    }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between gap-5">
                                    <div className="w-1/2">
                                        <TextField
                                            fullWidth
                                            name="title"
                                            label="Title"
                                            onChange={formik.handleChange}
                                            value={formik.values.title ?? ""}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            onChange={formik.handleChange}
                                            value={formik.values.description ?? ""}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between gap-5">
                                    <div className="w-full">                         
                                        <Editor
                                            apiKey="ktww8yo1oh38hj7gg70irt44fya7i0u966v8np1gx5ssxlzv"
                                            value={formik.values?.content}
                                            init={{
                                              height: 400,
                                              menubar: true,
                                              plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount',
                                                'table',
                                                'image',
                                                'bbcode',
                                                'link',
                                                'image paste'
                                              ],
                                              toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help | \
                                                table | image media | link'
                                            }}
                                            onEditorChange={handleEditorChange}
                                        />
                                    </div>
                                </div>
                            <div className="w-full">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        {
                                            previewURL ?
                                            <img src={previewURL} alt="" className='w-full h-64 rounded-lg' /> : 
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        }
                                        <input id="image" onChange={(e) => {setImage(e.target.files[0])}} type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>    
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end">
                        <Button variant="gradient" type="submit">
                            { id ? "Update" :  "Save"} Blog
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        </Formik>
    </div>
  )
}

export default BlogForm
