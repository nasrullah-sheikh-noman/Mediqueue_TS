
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
import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  ShieldCheck,
  Settings,
  ChevronRight,
  UserRound,
  Mail,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type UserData = typeof authClient.$Infer.Session.user;

type UserDataInDrawerProps = {
  user: UserData;
};

const UserDataInDrawer = ({ user }: UserDataInDrawerProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message ?? "Logout failed!");
        return;
      }

      toast.success("Logged out successfully!");
      router.push("/login");
      router.refresh();

    } catch (err: unknown) {
      // console.log("Logout error:", err);

      toast.error(
        err instanceof Error ? err.message : "Logout failed!"
      );
    }
  };

  return (
    <Drawer swipeDirection="right">

      {/* Profile Trigger */}
      <DrawerTrigger
        render={
          <button
            type="button"
            aria-label="Open profile"
            className="cursor-pointer rounded-full transition-transform hover:scale-105"
          >
            <Avatar className="h-10 w-10 ">
              <AvatarImage
                src={user?.image ?? undefined}
                alt={user?.name ?? "User"}
              />
              <AvatarFallback className="bg-cyan-100 text-cyan-700 font-bold">
                {user?.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />

      {/* Drawer Content */}
      <DrawerContent
        className="fixed inset-y-0 right-0 left-auto h-full w-[380px] max-w-[90vw] rounded-l-2xl rounded-r-none overflow-hidden bg-white shadow-2xl"
      >

        {/* Header */}
        <DrawerHeader className="relative overflow-hidden border-b border-cyan-100 bg-gradient-to-br from-cyan-700 via-cyan-600 to-teal-500 px-6 pb-7 pt-8 text-white">

          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col items-center gap-3">

            <DrawerTitle className="text-lg font-bold tracking-wide text-white">
              My Profile
            </DrawerTitle>

            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white/80 shadow-xl">
                <AvatarImage
                  src={user?.image ?? undefined}
                  alt={user?.name ?? "User"}
                />

                <AvatarFallback className="bg-cyan-100 text-3xl font-bold text-cyan-700">
                  {user?.name?.charAt(0) ?? "U"}
                </AvatarFallback>
              </Avatar>

              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white bg-green-400" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-white">
                {user?.name}
              </h2>

              <p className="mt-1 text-sm text-cyan-50">
                {user?.email}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white">
                <ShieldCheck size={14} />
                MediQueue Member
              </div>
            </div>
          </div>
        </DrawerHeader>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto bg-slate-50 p-5">

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Personal Information
            </h3>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <UserRound size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Full Name
                  </p>

                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user?.name}
                  </p>
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200" />

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Mail size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Email Address
                  </p>

                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user?.email}
                  </p>
                </div>
              </div>

            </div>
          </div>

        

        </div>

        {/* Footer */}
        <DrawerFooter className="border-t border-slate-200 bg-white p-5">

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="h-12 w-full cursor-pointer rounded-xl bg-rose-500 font-semibold shadow-lg shadow-rose-500/15 transition-all hover:bg-rose-600 hover:shadow-rose-500/25"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>

          <DrawerClose
            render={
              <Button
                variant="outline"
                className="h-11 w-full cursor-pointer rounded-xl border-slate-200 font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </Button>
            }
          />

          <p className="pt-1 text-center text-xs text-slate-400">
            MediQueue © 2026
          </p>

        </DrawerFooter>

      </DrawerContent>
    </Drawer>
  );
};

export default UserDataInDrawer;