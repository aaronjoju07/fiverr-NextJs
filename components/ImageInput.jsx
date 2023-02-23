import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Image,
  Box,
} from "@chakra-ui/react";

function ImageInput() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  return (
    <FormControl>
      <FormLabel htmlFor="image">Image</FormLabel>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {image && (
        <Box mt="4">
          <Image src={image} alt="Selected Image" />
        </Box>
      )}
    </FormControl>
  );
}

export default ImageInput;
