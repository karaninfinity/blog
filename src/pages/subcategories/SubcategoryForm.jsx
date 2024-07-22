import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import { Form, Formik, useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react'
import { get, post } from "../../utils/api";
import { useRouter } from "../../routes/hooks/use-router"
import { useParams } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const SubcategoryForm = () => {

    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [subcategoryImage, setSubcatgoryImage] = useState(null);
    const [subcategory, setSubcategory] = useState({});
    const [previewURL, setPreviewURL] = useState(null);
    const { id } = useParams();

    const formik = useFormik({
        initialValues : {
            subcategory: id ? subcategory.subcategory : "",
            category_id: id ? subcategory.category_id : "",
            subcategory_image: subcategoryImage,
            status: "Active"
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            if (id) {
                post(`/update/subcategory/${id}`, values).then((resp) => {
                    if(resp.data.success){
                        router.back();
                    }
                });
            } else {
                console.log(values);
                post("/add/subcategory", values).then((resp) => {
                    if(resp.data.success){
                        router.back();
                    }
                });
            }
        }
    });

    const getCategories = async () => {
        let response = await get("/categories");
        if(response?.data?.success){
          setCategories(response.data.data);
        }
    }

    const getSubcategory = async (id) => {
        let { data } = await get(`/subcategory/${id}`);
        setSubcategory(data.data);
        console.log(data.data);
        setPreviewURL(`http://127.0.0.1:8000/storage/subcategory_image/${data.data.subcategory_image}`)
    }
    
    useEffect(() => {
        if(subcategoryImage){
            console.log(subcategoryImage);
            const reader = new FileReader();
            const URL = reader.readAsDataURL(subcategoryImage);
            reader.onload = () => {
                setPreviewURL(reader.result);
            };
            setPreviewURL(URL);
        }
    }, [subcategoryImage]);

    useEffect(() => {
        getCategories();
        if(id){
            getSubcategory(id);
        }
    },[]);
    
    useEffect(() => {
        formik.setValues({ ...formik.values, subcategory_image: subcategoryImage });
    }, [subcategoryImage]);
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
                            { id ? "Update" : "Add"} Subcategory
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-10">
                            <div className="w-full flex items-center gap-5">
                                <div className="w-1/2">                         
                                    <TextField
                                        fullWidth
                                        label="Subcategory"
                                        size="lg"
                                        name="subcategory"
                                        value={formik.values.subcategory ?? ""}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="w-1/2">                         
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select label="Category" value={formik.values.category_id ?? ""} name='category_id' onChange={formik.handleChange}>
                                            {
                                                categories.map((category, index) => {
                                                    return (
                                                        <MenuItem key={index} value={category?.id}>{category?.category}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="subcategory_image" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                                        <input id="subcategory_image" onChange={(e) => {setSubcatgoryImage(e.target.files[0])}} type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>    
                    </CardBody>
                    <CardFooter className="pt-0 flex justify-end">
                        <Button variant="gradient" type="submit">
                            { id ? "Update" :  "Save"} Subcateogory
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        </Formik>
    </div>
  )
}

export default SubcategoryForm
