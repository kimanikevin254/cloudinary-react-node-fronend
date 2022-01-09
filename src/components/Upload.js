import { useState } from "react"

function Upload() {

    const[selectedImageState, setSelectedImageState] = useState('') //track the value of the file upload field
    const[previewSource, setPreviewSource] = useState('') //store the value of the image src
    const[selectedImage, setSelectedImage] = useState() //store the value of the selected image

    const handleImageInput = (e) => {
        const uploadedImg = e.target.files[0]
        setSelectedImageState(e.target.value)
        previewImage(uploadedImg)
        setSelectedImage(uploadedImg)
    }

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            console.log(reader.result)
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.readAsDataURL(selectedImage)
        reader.onloadend = () => {
            handleUpload(reader.result)
        }
        reader.onerror = () => {
            console.log('Something went wrong...')
        }
    }

    const handleUpload = async (encodedImage) => {
        try {
            await fetch('http://localhost:3001/api/uploadImg', {
                method: 'POST',
                body: JSON.stringify({ data: encodedImage }),
                headers: { 'Content-Type': 'application/json' },
            })
            setSelectedImageState('');
            setPreviewSource('');
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='file'
                    name='image'
                    value={selectedImageState}
                    onChange={handleImageInput}
                 />

                 <button type="submit">Upload</button>
            </form>

            {
                previewSource && (
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{ width: '200px', height: 'auto' }}
                    />
                )
            }  
        </div>
    )
}

export default Upload
