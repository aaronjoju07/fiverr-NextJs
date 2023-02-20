import {
    Stack, Modal,
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
    InputLeftAddon
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { BeatLoader } from 'react-spinners'
import useAuth from '../hooks/useAuth'
import { addUser } from '../pages/api/user'

export default function AddGig() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoggedIn, user } = useAuth();
    const toast = useToast();
    const [loading, setLoading] = useState()
    const handleClick = async () => {
        const addCurrentUser = {
            userId: user.uid,
            userEmail: user.email,
            fname,
            nickname,
            des,
            skill,
            pnom,
            country
        }
        setLoading(true)
        await addUser(addCurrentUser);
        console.log(addCurrentUser);
        toast({ title: "User created successfully", status: "success" });
        onClose(true)
        setLoading(false)
    }
    const [country, setCountry] = React.useState("");
    const [fname, setFname] = React.useState("");
    const [nickname, setNname] = React.useState("");
    const [des, setDes] = React.useState("");
    const [skill, setSkill] = React.useState("");
    const [pnom, setPnom] = React.useState("");
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
                            placeholder="Full Name"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                        <Input mb={4}
                            placeholder="Nick Name"
                            value={nickname}
                            onChange={(e) => setNname(e.target.value)}
                        />
                        <Input mb={4}
                            placeholder="Description"
                            value={des}
                            onChange={(e) => setDes(e.target.value)}
                        />
                        <Input mb={4}
                            placeholder="Skills"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                        />
                        <InputGroup>
                            <InputLeftAddon children='+91' />
                            <Input mb={4} type='tel' placeholder='phone number'
                                value={pnom}
                                onChange={(e) => setPnom(e.target.value)} />
                        </InputGroup>
                        <Select mb={4} value={country} onChange={(e) => setCountry(e.target.value)}>
                            <option
                                value={"India"}
                                style={{ fontWeight: "bold" }}
                            >
                                India
                            </option>
                            <option
                                value={"USA"}
                                style={{ fontWeight: "bold" }}
                            >
                                USA
                            </option>
                            <option
                                value={"France"}
                                style={{ fontWeight: "bold" }}
                            >
                                France
                            </option>
                            <option
                                value={"UK"}
                                style={{ fontWeight: "bold" }}
                            >
                                UK
                            </option>
                            <option
                                value={"Germany"}
                                style={{ fontWeight: "bold" }}
                            >
                                Germany
                            </option>
                            <option
                                value={"Sri Lanka"}
                                style={{ fontWeight: "bold" }}
                            >
                                Sri Lankha
                            </option>
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3}

                            spinner={<BeatLoader size={8} color='white' />}
                            colorScheme='blue'
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        {!loading ?
                            (<Button onClick={() => handleClick()} colorScheme='blue' >Add</Button>) :
                            (<Button
                                isLoading
                                colorScheme='blue'
                                spinner={<BeatLoader size={8} color='white' />}
                            >
                                Click me
                            </Button>)}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}