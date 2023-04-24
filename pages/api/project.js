import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const addProject = async ({ reqUser, gigUser, projectaReqStatus, gigPrice, promisedTime, timeFact, category, sug }) => {
  const docRef = await addDoc(collection(db, "project"), {
    reqUser,
    gigUser,
    projectaReqStatus,
    gigPrice,
    promisedTime,
    timeFlex: timeFact,
    category,
    sug,
    status: "Initial",
    progress: 0,
    payment: false,
    reqTime: serverTimestamp(),
  });
};
const addProjectBid = async ({ BidUser, User, Price, category, sug, title }) => {
  const docRef = await addDoc(collection(db, "project"), {
    BidUser,
    User,
    projectaReqStatus: true,
    Price,
    category,
    sug,
    status: "Initial",
    progress: 0,
    payment: false,
    ApprovedTime: serverTimestamp(), title,
  });
};
const createStatus = async ({ id }) => {
  const docRef = await addDoc(collection(db, `project/${id}/status`), {
    status: "Initial",
    reqTime: serverTimestamp(),
  });
};
const updateStatusTracker = async ({ prjss, status }) => {
  const docRef = await addDoc(collection(db, `project/${prjss}/status`), {
    status,
    reqTime: serverTimestamp(),
  });
};
const updateState = async ({ prjss, status }) => {
  let progress = 0
  if (status == 'Initial') {
    progress = 0
  } else if (status == 'Phase1') {
    progress = 10
  } else if (status == 'Phase 1 Processing') {
    progress = 20
  }
  else if (status == 'Phase 1 Completed') {
    progress = 30
  }
  else if (status == 'Phase2') {
    progress = 40
  }
  else if (status == 'Phase 2 Processing') {
    progress = 50
  }
  else if (status == 'Phase 2 Completed') {
    progress = 60
  }
  else if (status == 'Phase3') {
    progress = 70
  }
  else if (status == 'Phase 3 Processing') {
    progress = 80
  }
  else if (status == 'Phase 3 Completed') {
    progress = 90
  }
  else if (status == 'Completed') {
    progress = 100
  }
  else {
    progress = 0
  }
  try {
    const todoRef = doc(db, "project", prjss)
    await updateDoc(todoRef, {
      status,
      progress: progress,
      update: serverTimestamp()
    })
  } catch (error) {
    console.log(error)
  }
}


const BidApprove = async ({ biderEmail, biderId, biderPic, bidId, BidAmt }) => {
  try {
    const todoRef = doc(db, "PostProject", bidId)
    await updateDoc(todoRef, {
      biderEmail, biderId, biderPic, bidId, BidAmt, approved: true, approvedTime: serverTimestamp()
    })
  } catch (error) {
    console.log(error)
  }
}
const deleteBid = async ({ pid, id }) => {
  try {
    const todoRef = doc(db, `PostProject/${pid}/Bid`, id);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
const paymentUpdate = async ({ proId }) => {
  try {
    const todoRef = doc(db, "project", proId)
    await updateDoc(todoRef, {
      payment: true,
      //  update:serverTimestamp()
    })
  } catch (error) {
    console.log(error)
  }
}
export { addProject, createStatus, updateState, updateStatusTracker, paymentUpdate, BidApprove, deleteBid, addProjectBid }