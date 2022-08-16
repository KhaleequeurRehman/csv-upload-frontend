import React, { useState } from 'react'
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner';
import "./UploadCsvFile.css"

const UploadCsvFile = () => {
    const [fileLabelText, setFileLabelText] = useState("Choose Csv File")
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const uploadCsvFileHandler = async (e) => {
      if(image){
        setLoading(true)
        var data = new FormData()
        data.append('myfile',image)
        console.log("its working")
        let res_data = await fetch("https://dst-backend.herokuapp.com/api/v1/csv/upload",{
          method: "POST",
          body:data
        })
  
        res_data = await res_data.json()
  
        if(res_data){
          console.log("res_data => ", res_data)
          setFileLabelText("Choose Csv File")
          setLoading(false)
          setImage("")
          alert("csvfile uploaded successfully")
        }
      }else{
        alert("file not selected")
      }
      

    }

    
    
  return (
    <>
       <div className="centerdiv">
        <h1>Upload Csv file</h1>
        <div className="content_wrapper">
            <div className="inputBox">
            <label htmlFor="test">
            <div className="divinsidelabel"><FontAwesomeIcon icon={faUpload} style={{fontSize:"18px", marginRight:"10px",cursor:"pointer"}} /> {fileLabelText}</div>
            <input type="file" name="image" required onChange={e => {setImage(e.target.files[0]); setFileLabelText(e.target.files[0].name)}}/>
            </label>
            <p id="filename"></p>
            </div>
            <div className="buttonBox"> 
              {
                loading? 
                <>
                  <button type='submit' disabled onClick={uploadCsvFileHandler}><Spinner animation="border" variant="primary" size="sm" /> Upload</button>
                </> 
                : 
                <><button type='submit' onClick={uploadCsvFileHandler}>Upload</button></>
              }
                
            </div>
            </div>
       </div>
    </>
    
  )
}

export default UploadCsvFile