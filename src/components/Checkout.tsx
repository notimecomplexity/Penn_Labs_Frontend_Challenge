import { useSearchParams, Link } from "react-router-dom"

import clogo from "../assets/CLogo.png"

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
                backgroundColor: "#ffffff",
				boxSizing: "border-box",
                color: "#000000",
				fontFamily: "Monaco, monospace",
                minHeight: "100vh",
                textAlign: "center"
            }}
        >
            <img
				alt="Checkout Logo"
				src={clogo}
				style={{
					display: "block",
					height: "200px",
					margin: "0 auto"
				}}
			/>

			<h3>= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =</h3>
			<h1>Receipt</h1>
			<h3>= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =</h3>

			{checkedOutCourses.length === 0 ? (<p>No courses were checked out.</p>) : (
				<ul
					style={{
						listStyle: "none",
						padding: 0
					}}
				>
					{checkedOutCourses.map((course) => (
						<li
                            key={courseId(course)}
                            style={{
                                marginBottom: "0.5rem",
                                padding: "0.75rem 1rem",
                            }}
                        >
							{course.dept} {course.number}: {course.title}
						</li>
					))}
				</ul>
			)}

			<Link
				style={{ color: "#990000"}}
				to="/"
			>
				Return to courses
			</Link>
		</div>
	)
}
