"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

const Navbar = () => {
  const pathName = usePathname();

  const {
    data: session,
    isPending, 
  } = authClient.useSession();

  const user = session?.user;
  console.log("user data", user);
  console.log("Session", session);
  console.log("isPending", isPending);

  return (
    <div className="fixed top-0 w-full z-50 bg-gray-50 shadow-xl ">
      <div className="container mx-auto flex justify-between items-center text-center py-2 px-3    ">
        <Link
          href="/"
          className="text-4xl font-extrabold text-cyan-600 transition-all duration-400 hover:scale-105 hover:text-cyan-700"
        >
          MediQueue
        </Link>
        <div className="flex gap-3 text-gray-700 ">
          <Link
            href="/tutors"
            className={`hover:scale-105 transition-all duration-200 hover:text-cyan-600 hover:border-b-2
            ${
              pathName === "/tutors"
                ? "scale-105 transition-all duration-200 text-cyan-600 border-b-2"
                : ""
            }
          `}
          >
            Tutors
          </Link>
          <Link
            href="/addtutor"
            className={`hover:scale-105 transition-all duration-200 hover:text-cyan-600 hover:border-b-2
            ${
              pathName === "/addtutor"
                ? "scale-105 transition-all duration-200 text-cyan-600 border-b-2"
                : ""
            }
          `}
          >
            Add Tutor
          </Link>
          <Link
            href="/mytutor"
            className={`hover:scale-105 transition-all duration-200 hover:text-cyan-600 hover:border-b-2
            ${
              pathName === "/mytutor"
                ? "scale-105 transition-all duration-200 text-cyan-600 border-b-2"
                : ""
            }
          `}
          >
            My Tutor
          </Link>
          <Link
            href="/mybookedsessions"
            className={`hover:scale-105 transition-all duration-200 hover:text-cyan-600 hover:border-b-2
            ${
              pathName === "/mybookedsessions"
                ? "scale-105 transition-all duration-200 text-cyan-600 border-b-2"
                : ""
            }
          `}
          >
            My Booked Sessions
          </Link>
        </div>
        <div>
          {
            isPending ?
              <div className="flex items-center gap-4">
                <Spinner/>
                {/* Loading..... */}
              </div>
            :
            user ?
            <div className="flex gap-2">
              <h2 className="text-lg font-semibold">{user?.name}</h2>
              <div>
                {/* <UserDataInDrawer user={user}/> */}
                user    
              </div>
              <div>Logout</div>
            </div>

            :
            <Link href={"/login"}>
              <Button
                className={
                  "cursor-pointer bg-cyan-600 text-white transform transition-all ease-in-out duration-300 hover:scale-110 hover:bg-cyan-700"
                }
              >
                Login
              </Button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
