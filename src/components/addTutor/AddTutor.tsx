"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  UserRound,
  Camera,
  BookOpen,
  Clock,
  CalendarDays,
  GraduationCap,
  MapPin,
  Wallet,
  Users,
  Sparkles,
  ArrowLeft,
  UploadCloud,
} from "lucide-react";

const AddTutor = () => {
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("photo") as File;

    if (!imageFile || imageFile.size === 0) {
      toast.error("Please upload a tutor photo");
      return;
    }

    const imageData = new FormData();
    imageData.append("image", imageFile);

    try {
      setLoading(true);

      const imgresult = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        imageData
      );

      const imageUrl = imgresult.data.data.display_url;

      const tutorInfo = Object.fromEntries(formData.entries());
      tutorInfo.photo = imageUrl;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/tutors`,
        tutorInfo
      );

      toast.success("Tutor added successfully!");
      console.log(res.data);

      e.currentTarget.reset();
      setSubject("");
      setMode("");
    } catch (err: unknown) {
      console.log(err);
      toast.error(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const labelStyle =
    "text-sm font-semibold text-slate-700 flex items-center gap-2";

  const iconStyle = "h-4 w-4 text-cyan-600 transition-transform duration-300 group-hover:scale-110";

  return (
    <div className="mx-auto max-w-3xl p-4 md:p-6 animate-fadeIn">
      {/* Form Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-101">

        {/* Card Header */}
        <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 md:px-8">
          <h3 className="text-lg font-bold text-slate-800">Tutor Information</h3>
          <p className="mt-0.5 text-sm text-slate-500">
            Please provide accurate information below.
          </p>
        </div>

        <form onSubmit={onClick} className="space-y-6 p-6 md:p-8">

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-600">
              <UserRound className={iconStyle} />
              Personal Information
            </h4>

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className={labelStyle}>
                Tutor Name <span className="text-red-500">*</span>
              </label>

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
              />
            </div>

            {/* Photo */}
            <div className="space-y-1.5">
              <label htmlFor="photo" className={labelStyle}>
                <Camera className={iconStyle} />
                Profile Photo <span className="text-red-500">*</span>
              </label>

              <label
                htmlFor="photo"
                className="group/upload flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-6 transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-50/30 hover:scale-[1.01]"
              >
                <UploadCloud className="mb-2 h-8 w-8 text-cyan-500 transition-transform duration-300 group-hover/upload:-translate-y-1" />

                <span className="text-sm font-medium text-slate-700">
                  Click to upload your photo
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  Choose a clear and professional profile picture
                </span>

                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  required
                  className="mt-3 max-w-xs cursor-pointer text-xs"
                />
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Teaching Information */}
          <div className="space-y-4">
            <h4 className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-600">
              <BookOpen className={iconStyle} />
              Teaching Information
            </h4>

            <div className="grid gap-4 md:grid-cols-2">

              {/* Subject */}
              <div className="space-y-1.5">
                <label className={labelStyle}>
                  Subject / Category *
                </label>

                <input
                  type="hidden"
                  name="subject"
                  value={subject}
                />

                <Select
                  required
                  value={subject}
                  onValueChange={(value) => setSubject(value ?? "")}
                >
                  <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus:ring-2 focus:ring-cyan-500">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-slate-200 rounded-xl p-2 shadow-lg">
                    <SelectItem value="math" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Mathematics</SelectItem>
                    <SelectItem value="physics" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Physics</SelectItem>
                    <SelectItem value="chemistry" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Chemistry</SelectItem>
                    <SelectItem value="english" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">English</SelectItem>
                    <SelectItem value="biology" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Biology</SelectItem>
                    <SelectItem value="higher-math" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Higher Math</SelectItem>
                    <SelectItem value="ict" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">ICT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mode */}
              <div className="space-y-1.5">
                <label className={labelStyle}>
                  Teaching Mode *
                </label>

                <input
                  type="hidden"
                  name="mode"
                  value={mode}
                />

                <Select
                  required
                  value={mode}
                  onValueChange={(value) => setMode(value ?? "")}
                >
                  <SelectTrigger className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus:ring-2 focus:ring-cyan-500">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border border-slate-200 rounded-xl p-2 shadow-lg">
                    <SelectItem value="online" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Online</SelectItem>
                    <SelectItem value="offline" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Offline</SelectItem>
                    <SelectItem value="both" className="rounded-lg focus:bg-cyan-50 focus:text-cyan-900 cursor-pointer py-2">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-1.5">
              <label htmlFor="schedule" className={labelStyle}>
                <Clock className={iconStyle} />
                Available Days & Time *
              </label>

              <Input
                id="schedule"
                name="schedule"
                placeholder="Sun - Thu | 5:00 PM - 8:00 PM"
                required
                className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
              />
            </div>

            {/* Fee & Slot */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="fee" className={labelStyle}>
                  <Wallet className={iconStyle} />
                  Hourly Fee (৳) *
                </label>

                <Input
                  id="fee"
                  name="fee"
                  type="number"
                  min="1"
                  placeholder="500"
                  required
                  className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="slot" className={labelStyle}>
                  <Users className={iconStyle} />
                  Total Slots *
                </label>

                <Input
                  id="slot"
                  name="slot"
                  type="number"
                  min="1"
                  placeholder="10"
                  required
                  className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <label htmlFor="date" className={labelStyle}>
                <CalendarDays className={iconStyle} />
                Session Start Date *
              </label>

              <Input
                id="date"
                name="date"
                type="date"
                required
                className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Experience & Location */}
          <div className="space-y-4">
            <h4 className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-600">
              <GraduationCap className={iconStyle} />
              Experience & Location
            </h4>

            <div className="space-y-1.5">
              <label htmlFor="institution" className={labelStyle}>
                Institution & Experience *
              </label>

              <Textarea
                id="institution"
                name="institution"
                placeholder="Example: Dhaka University | 3 years teaching experience"
                required
                rows={3}
                className="resize-none rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="location" className={labelStyle}>
                <MapPin className={iconStyle} />
                Location (Area / City) *
              </label>

              <Input
                id="location"
                name="location"
                placeholder="Mirpur, Dhaka"
                required
                className="h-11 rounded-lg border-slate-200 bg-slate-50/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <Button
              type="reset"
              variant="outline"
              disabled={loading}
              onClick={() => {
                setSubject("");
                setMode("");
              }}
              className="h-11 flex-1 rounded-lg font-medium border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-100 active:scale-95"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Reset Form
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 flex-1 rounded-lg font-medium bg-cyan-600 text-white transition-all duration-200 hover:bg-cyan-700 hover:shadow-md hover:-translate-y-0.5 active:scale-95 shadow-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding Tutor...
                </span>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  Add Tutor
                </>
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-slate-400">
            Please double-check your information before submitting.
          </p>

        </form>
      </div>
    </div>
  );
};

export default AddTutor;