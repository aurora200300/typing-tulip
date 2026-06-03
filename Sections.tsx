"use client";
import { useEffect, useState } from "react"; import { createClient } from "@/lib/supabase/client"; import { Button } from "@/components/ui";
export default function AuthButton(){ const [email,setEmail]=useState<string|null>(null); useEffect(()=>{const s=createClient(); s?.auth.getUser().then(({data})=>setEmail(data.user?.email??null));},[]);
async function login(){const s=createClient(); if(!s){alert("Add Supabase environment variables first.");return;} await s.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${window.location.origin}/auth/callback`}})}
async function logout(){const s=createClient(); await s?.auth.signOut(); setEmail(null)}
if(email)return <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2"><span className="grid h-10 w-10 place-items-center rounded-full bg-white font-black text-blue-600">G</span><span className="hidden text-sm font-bold md:block">{email}</span><Button onClick={logout} variant="ghost">Logout</Button></div>;
return <button onClick={login} className="glass flex items-center gap-3 rounded-2xl px-4 py-2.5 font-bold"><span className="grid h-9 w-9 place-items-center rounded-full bg-white font-black text-blue-600">G</span><span className="hidden sm:block">सागर अधिकारी<br/><small className="font-normal">Sagar Achikari</small></span><span>👨‍💻</span></button>}
