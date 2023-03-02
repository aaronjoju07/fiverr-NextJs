import { collection, getDocs, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

async function GigsList() {
    const querySnapshot = await getDocs(collection(db, "Gigs"),where('user','!=','6hBz61RQdITv8BcbqQ0UMQom0M92'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  return querySnapshot;
}

export default async function handler(req, res) {
  const data = await GigsList();
  res.status(200).json({ data });
}
