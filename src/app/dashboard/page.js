// app/dashboard/page.js
'use client'
import { useRouter } from "next/navigation";



export default async function DashboardPage() {
  const router = useRouter();

  const redirecttoAddForm = () => {
    router.push('/dashboard/addPostForm');
  }
  return (
    <div>
      <h1>Posts</h1>
      <br/>
      <button onClick={redirecttoAddForm} >Add POST</button>
      <br/>
      Hello from dashboard
    </div>
  );
}
