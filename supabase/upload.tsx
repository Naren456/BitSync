

import supabase from '../supabase/config'
import courses from '../data/courses.json'

export async function uploadCourses() {
  const { data, error } = await supabase.from("courses").insert(courses);

  if (error) {
    console.error("❌ Error inserting courses:", error);
  } else {
    console.log("✅ Courses uploaded:", data);
  }
}
