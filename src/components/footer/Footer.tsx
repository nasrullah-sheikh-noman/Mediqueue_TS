import Link from "next/link"
import { FaFacebookF, FaGithub } from "react-icons/fa"
import { LiaLinkedin } from "react-icons/lia"

export default function Footer() {
  return (
    <div>
    <footer className="border-t bg-zinc-950 text-white">
      <div className="container mx-auto px-12 py-14">
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <h2 className="text-2xl font-bold">
              MediQueue
            </h2>

            <p className="mt-4 text-sm text-zinc-400">
              Learn from expert tutors anytime,
              anywhere.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Services
            </h3>

            <div className="space-y-2 text-sm text-zinc-400">
              <Link href="/tutors">Find Tutors</Link>
              <br />
              <Link href="/onlinecourses">Online Courses</Link>
              <br />
              <Link href="/liveclasses">Live Classes</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-zinc-400">
              <p>support@mediquiue.com</p>
              <p>+880 1234-567890</p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-4 text-sm text-zinc-400">
              <Link href="/facebook"><FaFacebookF/></Link>
              <Link href="/linkedin"><LiaLinkedin/></Link>
              <Link href="/github"><FaGithub/></Link>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
          © 2026 MediQueue. All rights reserved.
        </div>

      </div>
    </footer>
  </div>
  )
}