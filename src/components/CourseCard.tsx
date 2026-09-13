import { Course, tierColors, tierLabels } from "../types"

interface CourseCardProps {
	course: Course
	isCompleted: boolean
	isInCart: boolean
	onSelect: (course: Course) => void
}

const courseImages = import.meta.glob<string>("../assets/course_images/*", {
 eager: true,
 query: "?url",
 import: "default",
})

export default function CourseCard({course, isCompleted, isInCart, onSelect}: CourseCardProps) {
	return (
		<div
			role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`View ${course.dept} ${course.number}: ${course.title}`}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onSelect(course)
                }
            }}
            className="course-card"
			onClick={() => onSelect(course)}
			onMouseEnter={(e) => {
				e.currentTarget.style.borderColor = isInCart? "#FFE28A" : "#777777";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.borderColor = isInCart? "#FFC000" : "#333333";
			}}
			style={{
				backgroundColor: isCompleted? "#00693E" : "#011F5B",
				border: isInCart? "4px solid #FFC000" : "3px solid #333333",
			}}
		>
			<img
				className="course-card-image"
				alt=""
                src={courseImages[(course["card-image"] ?? "").replace(/^src\//, "../")] || `${import.meta.env.BASE_URL}course-placeholder.jpeg`}
			/>

			<span
				style={{
					backgroundColor: "#1D0200",
					borderRadius: "20px",
					color: tierColors[course.tier],
					display: "inline-block",
					fontSize: "0.7rem",
					fontStyle: "italic",
					fontWeight: "bold",
					marginLeft: "0.5rem",
					marginTop: "0.5rem",
					padding: "0.15rem 0.5rem",
				}}
			>
				{tierLabels[course.tier]}
			</span>

			<div className="course-card-content">
				<h3>{course.dept} {course.number}: {course.title}</h3>
			</div>
		</div>
    )
}
