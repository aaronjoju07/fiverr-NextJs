import { useRouter } from 'next/router'

export default function CommentPage() {
  const router = useRouter()
  console.log(router)
  const id = router.query.id 
  const comment = router.query.comment 

  return (
    <>
    
      <h1>Post: {id}</h1>
      <h1>Comment: {comment}</h1>
    </>
  )
}

