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
    Textarea
} from '@chakra-ui/react'
import React, { useState } from 'react'
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
            userEmail: user.email,
            userPhoto: user.photoURL,
            title,
            des,
            sub,
            notf,
            time,
            tags,
            price,
        }
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
    }
    const [title, setTitle] = React.useState("");
    const [sub, setSub] = React.useState("");
    const [des, setDes] = React.useState("");
    const [notf, setNotf] = React.useState("");
    const [time, setTime] = React.useState("");
    const [cat, setCat] = React.useState("");
    const [price, setPrice] = React.useState();
    const [tags, setTags] = useState([]);
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

    return (

        <>
            <Button onClick={onOpen}>Add</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Gig</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Input mb={4}
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Textarea mb={4}
                            placeholder="Aboout Gig"
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                        />
                        <Select  mb={4} value={cat} onChange={(e) => setCat(e.target.value)}>
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
                            </option> <option
                                value={"Tutorial"}
                                style={{ color: "green", fontWeight: "bold" }}
                            >
                                Tutorial
                            </option>
                        </Select>
                        <Input mb={4}
                            placeholder="Subject"
                            value={sub}
                            onChange={(e) => setSub(e.target.value)}
                        />
                        <Input mb={4}
                            placeholder="Notification"
                            value={notf}
                            onChange={(e) => setNotf(e.target.value)}
                        />
                        <Input mb={4}
                            // type='number'
                            placeholder="Completion Time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        {/* <Input mb={4}
                            // type='number'
                            placeholder="Benefits"
                            value={ben}
                            onChange={(e) => setBen(e.target.value)}
                        /> */}
                        <Input mb={4}
                            maxLength={10}
                            type='number'
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <VStack>
                            {tags.map((tag) => (
                                <Text key={tag}>
                                    {tag}{' '}
                                    <Button type="button" onClick={() => handleRemoveTag(tag)}>
                                        <XMarkIcon />
                                    </Button>
                                </Text>
                            ))}

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
                            (<Button onClick={() => handleClick()} colorScheme='blue' >Add</Button>) :
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