// 

import React, { useContext, useEffect, useState } from 'react'
import Addprojects from './AddProjects'
import { userProjectAPI } from '.././Components/services/allAPI'
import { addProjectResponseContext } from '../context/ContextShare'
import Edited from './Edited'
// import Project from '../Pages/Project'

function Myprojects() {
    const [userProjects,setUserProjects]=useState([])
    const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const getUserProject =async()=>{
        if(sessionStorage.getItem("token")){
            const token=sessionStorage.getItem("token")
            const reqHeader ={
                "Content-Type": "application/json",
             "Authorization":`Bearer ${token}`
            }
            const result=await userProjectAPI(reqHeader)
            if(result.status===200){
                setUserProjects(result.data)
            }else{
                console.log(result);
                console.log(result.response.data);
            }
        }
    }

    useEffect(()=>{
        getUserProject()
    },[addProjectResponse])

  return (
    <div className='card shadow p-3 mt-3 text-dark'>
        <div className='d-flex'>
            <h2>My Projects</h2>
            <div className='ms-auto'>
                <Addprojects/>
            </div>
        </div>
        {/* {/* alert */ }
            {/* {
              addProjectResponse.title?<Alert className='bg-success' dismissible><span className='text-danger fw-bolder'> 
              {addProjectResponse.title} Project added successfully</span></Alert>:null
        } */}
        <div className="mt-4">
            {/* collection of projects */}
            {userProjects?.length>0?userProjects.map(project=>(
            <div className="border d-flex align-items-center rounded p-2">
                <h5>{project.title}</h5>
                <div className="icon ms-auto ">
                  
                    <a href={`${project.github}`} target='_blank' className="btn"><i class="fa-brands fa-github"></i></a>
                    <Edited project={project}/>
                    <button className='btn'><i class="fa-solid fa-trash" style={{color:'black'}}></i></button>
                </div>
            </div>
  )):
            <p className='text-danger fw-bolder fs-5'>No Projects Uploaded Yet!!!</p>

        }
        </div>
    </div>
  )
}

export default Myprojects