export type Tier = 0 | 1 | 2 | 3

export interface Course {
    dept: string;
    number: number;
    title: string;
    description: string;
    "card-image"?: string;
    prereqs?: string[] | string;
    "cross-listed"?: string[];
    tier: Tier;
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

  export const tierColors: Record<Tier, string> = {
    0: "#4CAF50", // Beginner
    1: "#2196F3", // Tier 1
    2: "#FF9800", // Intermediate
    3: "#B71C1C", // Advanced
  }

  export const tierLabels: Record<Tier, string> = {
    0: "Beginner",
    1: "Intermediate",
    2: "Advanced",
    3: "Expert",
  }