'use server'    
import { headers } from "next/headers";

export async function tokenFromCode() {
   
    const headersList = headers(); 
    const domain = headersList.get("host").split("");

    console.log(domain);
}