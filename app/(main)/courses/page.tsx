import { getCourses, getUserProgress } from "@/db/queries";
import React from "react";
import List from "./list";

export default async function CoursesPage() {
  // get all available courses
  const data = await getCourses();

  //get user progess
  const userProgress = await getUserProgress();
  if(!data) return;
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
      <List courses={data} activeCourseId={userProgress?.activeCourseId} />
    </div>
  );
}
