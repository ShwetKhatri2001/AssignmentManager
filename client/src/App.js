import React, {useState, useEffect} from 'react';
import './App.css';
import {getFormData, saveFormData, singleFileUpload, multipleFilesUpload, getSingleFiles, getMultipleFiles} from './data/api';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [filled, setFilled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    link: "",
    singleFile: "",
    multipleFiles: []
  })

  const SingleFileChange = (e) => {
    setFormData({...formData, singleFile: e.target.files[0]});
  }
  const MultipleFileChange = (e) => {
    setFormData({...formData, multipleFiles: e.target.files});
  }

  const handleFormChange = (e) => {

    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData,[name]:value})

  }

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (formData.email === "")
      {
        toast.error('Please enter your email ');
      }
      else if (!emailTest.test(formData.email))
      {
        toast.error('Please enter a valid email');
      }
      else{
         getData();
         setFormData(formData);
         setFilled(true);
      }
    } catch (err) {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  } 

  const getData = async () => {
    try {
      const res = await getFormData({ email: formData.email});
      if(res.data.formData) {
        toast.success('You can start editing your submission now');
        setFormData(res.data.formData);
      } 

    } catch (err) {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.name === ""){
        toast.error('Please enter your name');
      } else if (formData.phone === "") {
        toast.error('Please enter your phone no');
      } else if (formData.title === "") {
        toast.error('Please enter a title for submission');
      } else if (formData.link === "" && formData.singleFile === "") {
        toast.error('Please enter a link / file for submission');
      } else {
        saveData();
        uploadSingleFile();
        uploadMultipleFiles();
      }
    } catch (error) {
      toast.error(error);
    }

  }

  const saveData = async () => {
    try{
      const res = await saveFormData(formData);
      if(res.data.formData) {
         toast.success('You have submitted your assignment successfully !')
      }
      else {
        toast.error('Try Again to submit');
      }
    } catch (err) {
      if (err.response)
      {
        toast.error(`${ err.response.data.error }`);
      }
    }
  }

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
    }
  }
  const mulitpleFileOptions = {
      onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent;
      }
  }
  const uploadSingleFile = async () => {
      const formData = new FormData();
      formData.append('file', formData.singleFile);
      await singleFileUpload(formData, singleFileOptions);
  }
  const uploadMultipleFiles = async () => {
      const formData = new FormData();
      for (let i = 0; i < formData.multipleFiles.length; i++) {
          formData.append('files', formData.multipleFiles[i]);                      
      }
      await multipleFilesUpload(formData, mulitpleFileOptions);
  }

  return (
    <>
       <div className="container">
      	 <div className="header">
      	 	<h2>Assignment Manager</h2>
      	 </div>
         {
          !filled ?
          <>
          <form className="form" onSubmit={handlePreSubmit}>
          <div className="form-control">
      	 		<label>Email</label>
      	 		<input type="email" name="email" value={formData.email} onChange={handleFormChange} id="email" placeholder="Enter Your Email" autoComplete="off"/>
          </div>
          <input type="submit" className="btn" value="Go Next" name="submit" />
          </form>
          </>
          :
      	 <form className="form" id="form" onSubmit={handleSubmit}>
      	 	<div className="form-control">
      	 		<label>Name</label>
      	 		<input type="text" name="name" value={formData.name} onChange={handleFormChange} id="name" placeholder="Enter Your Name" autoComplete="off"/>
          </div>
          <div className="form-control">
      	 		<label>Phone Number</label>
      	 		<input type="number" name="phone" id="phone" value={formData.phone} onChange={handleFormChange}  placeholder="Enter Your Phone Number" autoComplete="off"/>
          </div>
          <div className="form-control">
      	 		<label>Assignment Title</label>
      	 		<input type="text" name="title" id="title" value={formData.title} onChange={handleFormChange} placeholder="Enter Title for assignment" autoComplete="off"/>
          </div>
          <div className="form-control">
      	 		<label>Link of Submission</label>
      	 		<input type="text" name="link" id="link" value={formData.link} onChange={handleFormChange} placeholder="Enter Link for submission" autoComplete="off"/>
          </div>
          <div className="form-control">
            <label>File of Submission</label>
            <input type="file" name="file"  onChange={(e) => SingleFileChange(e)} />
          </div>
          <div className="form-control">
              <label>Other references ( screenshots / files )</label>
              <input type="file" name="files" onChange={(e) => MultipleFileChange(e)} multiple /> 
          </div>
          <input type="submit" className="btn" value="Submit" name="submit"/>
        </form>
         }
        <ToastContainer />
        </div>
    </>
  );
}

export default App;
