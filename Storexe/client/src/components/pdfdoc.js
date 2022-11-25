import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Worker } from '@react-pdf-viewer/core'
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


export default function pdFDoc() {
    const allowedFiles=['application.pdf'];
    const [pdfFile,setPdfFile]=useState(null);
    const [pdfError,setPdfError]=useState('');
    const handleFile=(e)=>{
        let selectedFile=e.target.files[0];
        console.log(selectedFile.type);
        if(selectedFile){
            if(selectedFile&&allowedFiles.includes(selectedFile.type)){
                let reader= new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend=(e)=>{
                    setPdfError('');
                    setPdfFile(e.target.result);
                    console.log(e.target.result);
                }
            }else{
                setPdfError('not a valid pdf file');
            }
        }else{

            console.log('Please select a PDF file');
        }
    }
  return (
   
    <>
    
        <div className='viewer'>
            {pdfFile&&( <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfFile}></Viewer>
            </Worker>)}


            {pdfFile&&( <>No Doc Available </>)}
        </div>
    
    </>
  )
}
