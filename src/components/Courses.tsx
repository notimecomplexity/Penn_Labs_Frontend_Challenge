import { useState } from "react"

import coursesData from "../data/courses.json"
import CourseCard from "./CourseCard"
import CourseModal from "./CourseModal"
import { Course, courseId } from "../types"

import Fuse from "fuse.js" // fuzzy match

interface CoursesProps {
	completedCourses: Course[]
	cart: Course[]
	search: string
	numberFilter: string
	onMarkCompleted: (course: Course) => void
	onUnmarkCompleted: (id: string) => void
	onAddToCart: (course: Course) => void
	onRemoveFromCart: (id: string) => void
}

export default function Courses({completedCourses, cart, search, numberFilter, onMarkCompleted, onUnmarkCompleted, onAddToCart, onRemoveFromCart}: CoursesProps) {
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

	// advanced searching (fuzzy match)
	const fuse = new Fuse(coursesData as Course[], {
		keys: ["title", "description", "dept"],
		threshold: 0.5, // 0.0 - 1.0, lower = stricter, higher = more
	})
	const filteredCourses = search.trim()
	? fuse.search(search).map((result) => result.item)
	: (coursesData as Course[])
	const finalFiltered = filteredCourses.filter((course) =>
		numberFilter ? course.number.toString().startsWith(numberFilter) : true
	)

	return (
		<div>
			{finalFiltered.length === 0 ? (
				<p
					style={{
						color: "#011F5B",
						marginTop: "5rem"
					}}
				>
					No courses found.
				</p>
			) : (
				<div className="course-grid">
					{finalFiltered.map((course) => (
						<CourseCard
							course={course}
							key={courseId(course)}
							onSelect={setSelectedCourse}
							isCompleted={completedCourses.some((c) => courseId(c) === courseId(course))}
							isInCart={cart.some((c) => courseId(c) === courseId(course))}
						/>
					))}
				</div>
			)}

			{selectedCourse && (
				<CourseModal
					course={selectedCourse}
					onClose={() => setSelectedCourse(null)}
					isCompleted={completedCourses.some((c) => courseId(c) === courseId(selectedCourse))}
					onMarkCompleted={onMarkCompleted}
					onUnmarkCompleted={onUnmarkCompleted}
					completedCourses={completedCourses}
					isInCart={cart.some((c) => courseId(c) === courseId(selectedCourse))}
					onAddToCart={onAddToCart}
					onRemoveFromCart={onRemoveFromCart}
					cartFull={cart.length >= 7}
				/>
			)}
		</div>
	)
}
