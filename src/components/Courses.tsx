import { useState } from "react"
import coursesData from "../data/courses.json"
import CourseCard from "./CourseCard"
import CourseModal from "./CourseModal"
import { Course, courseId } from "../types"

interface CoursesProps {
	cart: Course[]
	onAddToCart: (course: Course) => void
	onRemoveFromCart: (id: string) => void
	search: string
	numberFilter: string
}

export default function Courses({ cart, onAddToCart, onRemoveFromCart, search, numberFilter }: CoursesProps) {
	const courses = coursesData as Course[]
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

	const filteredCourses = courses.filter((course) => {
		const query = search.trim().toLowerCase()
		const matchesSearch =
			`${course.dept} ${course.number}`.toLowerCase().includes(query) ||
			course.title.toLowerCase().includes(query) ||
			course.description.toLowerCase().includes(query)

		const matchesNumber = numberFilter ? course.number.toString().startsWith(numberFilter) : true

		return matchesSearch && matchesNumber
	})

	return (
		<div>
			{filteredCourses.length === 0 ? (
				<p>No courses match your search.</p>
			) : (
				<div className="course-grid">
					{filteredCourses.map((course) => (
						<CourseCard
							key={courseId(course)}
							course={course}
							onAddToCart={onAddToCart}
							isInCart={cart.some((c) => courseId(c) === courseId(course))}
							cartFull={cart.length >= 7}
							onSelect={setSelectedCourse}
						/>
					))}

					{selectedCourse && (
						<CourseModal
							course={selectedCourse}
							onClose={() => setSelectedCourse(null)}
							onAddToCart={onAddToCart}
							onRemoveFromCart={onRemoveFromCart}
							isInCart={cart.some((c) => courseId(c) === courseId(selectedCourse))}
							cartFull={cart.length >= 7}
						/>
					)}
				</div>
			)}
		</div>
	)
}