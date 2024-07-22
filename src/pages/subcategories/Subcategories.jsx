import React, { useEffect, useState } from 'react'
import { useRouter } from '@/routes/hooks/use-router';
import { PencilIcon,TrashIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Input,
} from "@material-tailwind/react";
import apiClient from '@/utils/apiClient';
import { del } from '@/utils/api';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Button, Tooltip } from '@mui/material';

const Subcategories = () => {

  const router = useRouter();
  const [subcategories, setSubcategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const TABLE_HEAD = ["Category", "Status", ""];

  const getSubcategories = async () => {
    let response = await apiClient.get("/subcategories");
    if(response?.data?.success){
      setSubcategories(response.data.data);
    }
  }

  const deleteSubcategory = async (id) => {
    const response = await del(`/delete/subcategory/${id}`);
    getSubcategories();
  }

  useEffect(() => {
    getSubcategories();
  },[]);
 

  return (
    <div className="mt-12">
      <div className="flex justify-end items-center mb-5">
        <Button className="flex items-center gap-3" onClick={() => router.push("add")}>
          <PlusIcon strokeWidth={2} className="h-4 w-4" />
          Add Category
        </Button>
      </div>
      <Card className="overflow-hidden h-full w-full xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Subcategories
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory, index) => {
                  const isLast = index === subcategory.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`http://127.0.0.1:8000/storage/subcategory_image/${subcategory.subcategory_image}`}
                            size="md"
                            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {subcategory.subcategory}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={subcategory.status}
                            color={
                              subcategory.status === "Active"? "green": "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip title="Edit Category">
                          <IconButton variant="text" onClick={() => router.push(`${subcategory.id}`)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Category">
                          <IconButton variant="text" onClick={() => {setSubcategoryId(subcategory.id); setOpen(true)}}>
                            <TrashIcon className="h-4 w-4" color="red" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <IconButton variant="outlined" size="sm">
              1
            </IconButton>
            <IconButton variant="text" size="sm">
              2
            </IconButton>
            <IconButton variant="text" size="sm">
              3
            </IconButton>
            <IconButton variant="text" size="sm">
              ...
            </IconButton>
            <IconButton variant="text" size="sm">
              8
            </IconButton>
            <IconButton variant="text" size="sm">
              9
            </IconButton>
            <IconButton variant="text" size="sm">
              10
            </IconButton>
          </div>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
      <Dialog
        open={open}
        onClose={() => setSubcategoryId(null)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Are You Sure Want To Delete This Category?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By delete this subcategory, blog related this subcategory also will be delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Disagree
          </Button>
          <Button autoFocus variant='contained' onClick={() => {deleteSubcategory(subcategoryId); setSubcategoryId(null); setOpen(false)}}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Subcategories
