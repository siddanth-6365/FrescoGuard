"use client";
import { MdAccountCircle } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";


const Navbar = () => {
  const [Profile,setProfile]=useState();

  const handleSubmit=()=>{
    localStorage.removeItem("userId");
    window.location.href = '/auth/login';


  }
  const hp=()=>{

  }


  return (
    <div className=" flex flex-row flex-wrap justify-between gap-4 items-center">
      <div className="">Dashboard</div>
      <button onClick={handleSubmit}>Logout</button>
      
      <div className=""><DropdownMenu>
  <DropdownMenuTrigger><MdAccountCircle  style={{fontSize:"3rem"}}/></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><div onClick={hp}>Profile</div></DropdownMenuItem>
    <DropdownMenuItem></DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu></div>
      




      
    </div>
  );
};

export default Navbar;
