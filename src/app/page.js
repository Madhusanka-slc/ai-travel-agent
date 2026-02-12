"use client"; // make for frontend only
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  
  const url = "http://127.0.0.1:8080/hello-world"
  const { data, error, isLoading } = useSWR(url, fetcher)

  const mainClassCSS = "flex min-h-screen flex-col items-center justify-between p-24"
  
  if (error) return <div className={mainClassCSS + " text-red-500"}>failed to load</div>
  if (isLoading) return <div className={mainClassCSS}>loading...</div>
  console.log("data: ", data)
  const myVar = "world"
  return (
   
      <main className={mainClassCSS}>
        <h1>Hello {myVar}</h1>
        <div>{data.Debug}</div>
        <div>{data.hello}</div>
        <div>{JSON.stringify(data)}</div>
      
      </main>
 
  );
}
