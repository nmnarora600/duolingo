import React from 'react'
import dynamic from 'next/dynamic'
import { isAdmin } from '@/lib/admin'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
const App= dynamic(()=>import("./app"),{ssr:false})

type Props = {}
export const metadata: Metadata = {
  title: "Admin Panel- Duolingo Clone",

};
export default async function AdminPage({}: Props) {
  const adm= await isAdmin();
  if(!adm) redirect("/")
  return (
    <App/>
  )
}