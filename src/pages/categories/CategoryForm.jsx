import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'
import { Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { get, post } from "../../utils/api";
import { useRouter } from "../../routes/hooks/use-router"
import { useParams } from 'react-router-dom';
import { TextField } from '@mui/material';

const CategoryForm = () => {
    
    const router = useRouter();
    const [categoryImage, setCatgoryImage] = useState(null);
    const [category, setCategory] = useState({});
    const [previewURL, setPreviewURL] = useState(null);
    const { id } = useParams();

    const formik = useFormik({
        initialValues : {
            category: id ? category.category : "",
            category_image: categoryImage,
            status: "Active"
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (id) {
                post(`/update/category/${id}`, values).then((resp) => {
                    if(resp.data.success){
                        router.back();
                    }
                })   
            } else {
                post("/add/category", values).then((resp) => {
                    if(resp.data.success){
                        router.back();
                    }
                });
            }
        }
    });

    const getCategory = async (id) => {
        const response = await get(`/category/${id}`);
        setCategory({...response.data.data});
        setPreviewURL(`http://127.0.0.1:8000/storage/category_images/${response.data.data.category_image}`);
    }
    
    useEffect(() => {
        if(categoryImage){
            const reader = new FileReader();
            const URL = reader.readAsDataURL(categoryImage);
            reader.onload = () => {
                setPreviewURL(reader.result);
            };
            setPreviewURL(URL);
        }
    }, [categoryImage]);

    useEffect(() => {
        if(id){
            getCategory(id);
        }
    },[]);

    useEffect(() => {
        formik.setValues({ ...formik.values, category_image: categoryImage });
    }, [categoryImage]);

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
                            { id ? "Update" : "Add"} Category
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-10">
                            <div className="w-full">                         
                                <TextField
                                    fullWidth
                                    label="Category Name" 
                                    size="lg" 
                                    name="category"
                                    value={formik.values.category ?? ""}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        {
                                            previewURL ?
                                            <img src={previewURL} alt="" className='w-full h-64 rounded-lg' /> : 
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        }
                                        <input id="dropzone-file" onChange={(e) => {setCatgoryImage(e.target.files[0])}} type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>    
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end">
                        <Button variant="gradient" type="submit">
                            { id ? "Update" :  "Save"} Cateogory
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        </Formik>
    </div>
    )
}

export default CategoryForm