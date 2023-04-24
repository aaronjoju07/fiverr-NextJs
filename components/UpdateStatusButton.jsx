import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Select, useDisclosure, useToast } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';
import { updateState, updateStatusTracker } from '../pages/api/project';

const UpdateStatusButton = ({ prjss }) => {
    const toast = useToast();
    const [status, setStat] = useState()
    const updateStatus = async (status) => {
        try {
            if (status != "") {
                await updateState({ prjss, status });
                await updateStatusTracker({ prjss, status })
                onClose();
                toast({
                    title: `${status} Status updated`,
                    status: 'success'
                });
            }
            else {
                toast({
                    title: `Status not selected`,
                    status: 'warning'
                });
            }
        } catch (error) {
            toast({
                title: `Status not selected`,
                status: 'warning'
            });
            console.log(error)
        }
    };
    const [prj, setTodos] = useState([])
    useEffect(() => {
        refreshData();
    }, []);
    async function refreshData() {
        const docRef = doc(db, "project", prjss);
        const docSnap = await getDoc(docRef);
        setTodos(docSnap.data())
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    return (<>


        {prj && prj.status != 'Completed' && <Button onClick={onOpen}>Update Status</Button>}

        <AlertDialog key={prj.id}
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent key={prj.id}>
                <AlertDialogHeader>Update the Status</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {prj.status == 'Initial' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase1'>Phase 1</option>
                    </Select>}
                    {prj.status == 'Phase1' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase 1 Processing'>Phase 1 Processing</option>
                    </Select>}
                    {prj.status == 'Phase 1 Processing' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase 1 Completed'>Phase 1 Completed</option>
                        <option value='Phase1'>Phase 1 Re-Work</option>
                    </Select>}
                    {prj.status == 'Phase 1 Completed' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase2'>Phase 2 </option>
                    </Select>}
                    {prj.status == 'Phase2' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase 2 Processing'>Phase 2 Processing</option>
                    </Select>}
                    {prj.status == 'Phase 2 Processing' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase 2 Completed'>Phase 2 Completed</option>
                        <option value='Phase2'>Phase 2 Re-Work</option>
                    </Select>}
                    {prj.status == 'Phase 2 Completed' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase3'>Phase 3 </option>
                    </Select>}
                    {prj.status == 'Phase3' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase 3 Processing'>Phase 3 Processing</option>
                    </Select>}
                    {prj.status == 'Phase 3 Processing' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Phase 3 Completed'>Phase 3 Completed</option>
                        <option value='Phase3'>Phase 3 Re-Work</option>
                    </Select>}
                    {prj.status == 'Phase 3 Completed' && <Select required onChange={(e) => setStat(e.target.value)} placeholder='Select option'>
                        <option value='Completed'>Completed</option>
                    </Select>}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        No
                    </Button>
                    <Button key={prj.id} colorScheme='green' ml={3} onClick={() => updateStatus(status)}>
                        Update
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    )
}

export default UpdateStatusButton
