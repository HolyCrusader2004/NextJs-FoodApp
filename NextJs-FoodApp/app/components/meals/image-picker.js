'use client'
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image'

export default function ImagePicker({label, name}){
    const imageInput = useRef()
    const [pickedImage, setPickedImage] = useState()

    function handlePickClick(){
        imageInput.current.click();
    }
    
    function handleImageChange(event){
        const file = event.target.files[0];
        if(!file){
            setPickedImage(null)
            return;
        }
        const filereader = new FileReader()
        filereader.onload = () => {
            setPickedImage(filereader.result)
        }
        filereader.readAsDataURL(file)
    }

    return <>
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked</p>}
                    {pickedImage && <Image src={pickedImage} alt='image-selected' fill />}
                </div>
                <input onChange={handleImageChange} className={classes.input} type='file' id={name} accept='image.png, image.jpeg' name={name} ref={imageInput} required/>
                <button onClick={ handlePickClick} className={classes.button} type='button'>Pick an image</button>
            </div>
        </div>
    </>
}