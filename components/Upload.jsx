import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from '@chakra-ui/react';




export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const storage = getStorage();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    const filename = file.name + Math.random(1000000000000,900000000000)
    const storageRef = ref(storage, `images/${filename}`);
  
    const uploadTask = uploadBytesResumable(storageRef, file);
    e.preventDefault();
    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //   console.log('File available at', downloadURL);
      setUrl(downloadURL)
    });
  }
);
    console.log(file.name)    
    console.log(url)
    // Store the downloadUrl in Firestore here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button>
      <input type="file" onChange={handleChange} />
      </Button>
      <button type="submit">Upload</button>
      {url && <img src={url}  alt="Uploaded image" />}
    </form>
  );
}
