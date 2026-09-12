import { useSearchParams, Link } from "react-router-dom"
import coursesData from "../data/courses.json"
import { Course, courseId } from "../types"

export default function Checkout() {
	const [searchParams] = useSearchParams()
	const courseIdsParam = searchParams.get("courses") ?? ""
	const selectedIds = courseIdsParam.split(",").filter(Boolean)

	const allCourses = coursesData as Course[]
	const checkedOutCourses = allCourses.filter((course) =>
		selectedIds.includes(courseId(course))
	)

	return (
		<div
            style={{
                padding: "2rem calc(1rem + 10%)",
                backgroundColor: "#990000",
                color: "#ffffff",
                minHeight: "100vh",
                boxSizing: "border-box",
            }}
        >
			<h1>Receipt</h1>

			{checkedOutCourses.length === 0 ? (
				<p>No courses were checked out.</p>
			) : (
				<ul>
					{checkedOutCourses.map((course) => (
						<li key={courseId(course)}>
							{course.dept} {course.number}: {course.title}
						</li>
					))}
				</ul>
			)}

			<Link to="/">Back to courses</Link>
		</div>
	)
}