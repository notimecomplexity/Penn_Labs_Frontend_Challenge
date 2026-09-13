export type Tier = 0 | 1 | 2 | 3
export const tierLabels: Record<Tier, string> = {
  0: "Beginner",
  1: "Intermediate",
  2: "Advanced",
  3: "Expert"
}
export const tierColors: Record<Tier, string> = {
  0: "#4CAF50",
  1: "#2196F3",
  2: "#FF9800",
  3: "#B71C1C"
}

export interface Course {
    "card-image"?: string;
    dept: string;
    number: number;
    title: string;
    tier: Tier;
    prereqs?: string[] | string;
    prereqIds: string[]
    "cross-listed"?: string[];
    description: string;
}

// Helper to generate a stable unique key since courses.json has no id field
export function courseId(course: Course): string {
  return `${course.dept}-${course.number}`;
}

// Normalize prereqs into a string[] regardless of how it's stored in the JSON
export function getPrereqsList(course: Course): string[] {
  if (!course.prereqs) return [];
  return Array.isArray(course.prereqs) ? course.prereqs : [course.prereqs];
}

export function hasMetPrereqs(course: Course, completedCourses: Course[]): boolean {
  if (course.prereqIds.length === 0) return true
  const completedIds = completedCourses.map(courseId)
  return course.prereqIds.every((id) => completedIds.includes(id))
}
