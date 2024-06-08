import React ,{useState}from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import RTE from '../RTE'
import Select from '../Select'
import Button from '../Button'
import appwriteService from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./post.css"
import Loader from '../loader/Loader'
// import ImageInput from './ImageInput'

function PostForm({post}) {
    const {register, handleSubmit, control, getValues} = useForm({
        defaultValues:{
            title : post?.title || "",
            content: post?.content || "",
            status : post?.status || "active",

        }
    })

    const navigate = useNavigate();
   const userData = useSelector((state)=> state.auth.userData)
   
   const [loader, setLoading] = useState(true)


    const submit = async(data)=>{

        if(post){
            console.log("post is there to edit");
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]): null;
          

            if(file){
               
             appwriteService.deleteFile(post.featuredImage);
               
            }

            const dbPost = await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file? file.$id : undefined
            });
            if(dbPost){
               
                navigate(`/post/${dbPost.$id}`);
            }

        }else{
        const file = await appwriteService.uploadFile(data.image[0]);

        if(file){
            const fileId = file.$id
            data.featuredImage = fileId;
            const dbPost = await appwriteService.createPost({...data, userId: userData.$id})

            if(dbPost){
                navigate(`/`);
            }
        }
    }
    }

    const [preview, setPreview] = useState('');

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log(file);
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          setPreview(reader.result);
        };
  
        reader.readAsDataURL(file);
      } else {
        setPreview('');
      }
    };

    // const change = ()=>{
    //     console.log("function worked")
    // }

  return (
    <form onSubmit={handleSubmit(submit)}>

      

        <div className="main grid grid-cols-5 gap-1" style={{height:"91vh"}}>
            <div className="material bgc col-span-3 m-5 rounded-md">
                <h1 className="head bg-gray">Anything New?</h1>
                <div className="title head ">
                    <Input
                    titlClass="check"
                    label = 'Title'
                    placeholder='Title'
                    
                    className ='input'
                    {...register("title", {required: true})}
                    />
                </div>

                <div className="content head ">
                <RTE

                titlClass="check"
                label="Content"
                value= {post ? post.content: ""}
                className ='input mce-content-body'
                name="content"
                control={control}
                defaultValue={getValues("content")}
            />
                </div>

                <div className="selects head" style={{display: "flex"}}>
                    
                    <div className="department both">
                   
                    <Select
                    options = {["IT", "Engineering", "Management", "BioTechnology", "Law", "Medical"]}
                    label= 'Department'
                    titlClass="select selectLabel"
                    className="mb-4 drop"
                    {...register("department", {required: true})}
                    />

                     </div>

                    <div className="status both">
                    <Select
                    options = {["active", "inactive"]}
                    label= 'Status'
                    titlClass="select selectLabel"
                    className="mb-4 drop"
                    {...register("status", {required: true})}
                    />
                    </div>

                </div>

                <div className = "buttonBox">
                <Button
                type="submit"
                className="button"
                
                >
                { post?"Update":"Submit"}
                </Button>
                </div>

            </div>


            <div className="image bgc border-green col-span-2 m-5 rounded-md text-white">
            
            <Input 
            label="Featured Image"
            type="file"
            className="mb-4 mt-3"
            // onChange={handleFileChange}
            accept= "image/* "
            {...register("image", {required:false})}   
            /> 
     
            <div className="image text-white">
            {post && (
                    
                    <div className="w-full mb-4">
                        <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title}  className="rounded-lg"/>
                    </div>
                )}
                
            </div>

          

            </div>
        </div>
    </form>
  )
}

export default PostForm