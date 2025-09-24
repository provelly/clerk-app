import { auth, currentUser } from '@clerk/nextjs/server'
import react from 'react' 

export default async function DashboardPage () {
  const { isAuthenticated }= await auth()

  if( !isAuthenticated ) {
    return <div>sign in to view this page</div>
  }
  const user=await currentUser()
  console.log(user )
  return (
    <div> <h1 className="txt-2x1 font-bold mb-5"> Dashboard (Server-side)</h1> 
    <p>welcome to page</p>
    <p>Welcome, {user?.firstName}</p>
    <p>Email:{user?.primaryEmailAddress?.emailAddress}</p>
    <p>usertime:{user?.createdAt} </p>
    </div>
  )
}