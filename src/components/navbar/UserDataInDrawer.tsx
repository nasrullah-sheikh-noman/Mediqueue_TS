"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const UserDataInDrawer = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut(); 
      router.push("/login");   
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <Drawer direction="right">
      
      {/* Trigger */}
      <DrawerTrigger asChild>
        <Avatar className="cursor-pointer ring-2 ring-cyan-500 hover:scale-105 transition">
          <AvatarImage src={user?.image} alt={user?.name} />
          <AvatarFallback>
            {user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>

      <DrawerContent className=" w-[380px] overflow-y-scroll overflow-x-hidden">
        
        {/* Header */}
        <DrawerHeader className="text-center border-b pb-4">
          <DrawerTitle className="text-xl font-bold">
            My Profile
          </DrawerTitle>
        </DrawerHeader>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-3">
            <Image
              src={user?.image || "/avatar.png"}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full border-2 border-cyan-500 object-cover"
            />

            <h2 className="text-lg font-semibold">
              {user?.name}
            </h2>
          </div>

          {/* Info */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border">
            
            <div className="flex items-center gap-3">
              <FaUser className="text-cyan-600" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-cyan-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <DrawerFooter className="border-t p-4 space-y-2">

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center gap-2 cursor-pointer"
          >
            <FaSignOutAlt />
            Logout
          </Button>

          {/* Close */}
          <DrawerClose asChild>
            <Button variant="outline" className="w-full cursor-pointer">
              Close
            </Button>
          </DrawerClose>

        </DrawerFooter>

      </DrawerContent>
    </Drawer>
  );
};

export default UserDataInDrawer;