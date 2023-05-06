import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    InputGroup,
    Select,
    useToast,
    InputLeftAddon,
    Text,
    VStack,
    Stack,
    Textarea,
    Box,
    Divider,
    Flex,
    Image
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BeatLoader } from 'react-spinners'
import useAuth from '../hooks/useAuth'
import { addUser } from '../pages/api/user'

export default function AddGig() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useAuth();
    const toast = useToast();
    const [loading, setLoading] = useState()
    const handleClick = async () => {
        const addCurrentUser = {
            userId: user.uid,
            name: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL,
            title,
            des,
            sub,
            notf,
            time,
            tags,
            price,
            url,
            cat
        }
        if (des === '' || cat === '' || title.length < 1 || sub.length < 1 || time === null || price === null) {
            toast({
                title: "You fill all the fields",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } else if( price == null || price == 0){ toast({
            title: "You fill all the fields",
            status: "error",
            duration: 9000,
            isClosable: true,
        });} else if (price.length>5) {
            toast({
                title: "You fill all the field",
                // status: "warning",
                duration: 9000,
                isClosable: true,
            });
        } else if (time > 365) {
            toast({
                title: "only one year duration can be provided maximum",
                // status: "warning",
                duration: 9000,
                isClosable: true,
            });
        } else {
            if (url.length < 1) {
                toast({
                    title: "IMAGE NOT UPLOADED",
                    // status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                setLoading(true)
                await addUser(addCurrentUser);
                console.log(addCurrentUser);
                toast({ title: "User created successfully", status: "success" });
                onClose(true)
                setTitle("")
                setCat("")
                setDes("")
                setSub("")
                setNotf("")
                setTime("")
                setPrice()
                setTags([])
                setLoading(false)
                onClose()
            }
        }


    }
    const [title, setTitle] = React.useState("");
    const [sub, setSub] = React.useState("");
    const [des, setDes] = React.useState("");
    const [notf, setNotf] = React.useState("");
    const [time, setTime] = React.useState("");
    const [cat, setCat] = React.useState("");
    const [price, setPrice] = React.useState();
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const storage = getStorage();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const newTag = event.target.value.trim();
            if (newTag) {
                setTags([...tags, newTag]);
                event.target.value = '';
            }
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };
    const handleSubmit = async (e) => {
        setFile(e.target.files[0]);
        if (file) {

            const filename = file.name + Math.random(1000000000000, 900000000000)
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
                    console.log(error)
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
        }
        console.log(url)
        // Store the downloadUrl in Firestore here
    };

    return (

        <>
            <Box display='flex' justifyContent='center' >
                <Button onClick={onOpen}>Add GiG</Button>
            </Box>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Gig</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Input mb={4} isRequired
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea mb={4} isRequired
                            placeholder="Aboout Gig"
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                        />
                        <Select mb={4} value={cat} onChange={(e) => setCat(e.target.value)} isRequired >
                            <option
                                value={""}
                                style={{ color: "yellow", fontWeight: "bold" }}
                            >
                                Select
                            </option>
                            <option
                                value={"Graphics & Design"}
                                style={{ color: "yellow", fontWeight: "bold" }}
                            >
                                Graphics & Design
                            </option>
                            <option
                                value={"Programming & Tech"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Programming & Tech
                            </option>
                            <option
                                value={"Music & Audio"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Music & Audio
                            </option>
                            <option
                                value={"Video & Animation"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Video & Animation
                            </option> <option
                                value={"Writhing & Translation"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Writhing & Translation
                            </option>
                            {/* <option
                                value={"Tutorial"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Tutorial
                            </option> */}
                        </Select>
                        <Input mb={4} isRequired
                            placeholder="Subject"
                            value={sub}
                            onChange={(e) => setSub(e.target.value)}
                        />
                        <Input mb={4} required
                            placeholder="Notification"
                            value={notf}
                            onChange={(e) => setNotf(e.target.value)}
                        />
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} w={'80%'} >
                            <Input mb={4} isRequired
                                type='number'
                                placeholder="Completion Time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            <Text p={3}>Days</Text>
                        </Box>
                        <Flex>
                            <Button mb={4}
                                width='60%' isRequired>
                                <input type="file" onChange={handleSubmit} accept="image/png,image/jpeg" />
                            </Button>
                            {!url.length<1 && <Image p={2}
                                boxSize='100px' rounded={'lg'}
                                objectFit='cover'
                                src={url}
                                alt='upload image'
                            />}
                        </Flex>
                        <Input mb={4} isRequired
                            maxLength={10}
                            type='number'
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <VStack>
                            <Box >
                                {tags.map((tag) => (
                                    <Box
                                    >
                                        <Text key={tag + Math.random()}>
                                            {tag}{' '}
                                            <Button type="button" backgroundColor="gray.100" onClick={() => handleRemoveTag(tag)}>
                                                <XMarkIcon />
                                            </Button>
                                        </Text>
                                    </Box>
                                ))}
                            </Box>

                            <Input
                                placeholder="Benefits"
                                type="text" onKeyDown={handleKeyDown}
                            />
                        </VStack>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3}
                            spinner={<BeatLoader size={8} color='white' />}
                            colorScheme='blue'
                            onClick={onClose}
                        >
                            Close
                        </Button>

                        {!loading && user ?
                            (<Button onClick={() => handleClick()} colorScheme='blue'
                            >Add</Button>) :
                            (<Button
                                isLoading
                                colorScheme='blue'
                                spinner={<BeatLoader size={8} color='white' />}
                            >
                                Add
                            </Button>)}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}