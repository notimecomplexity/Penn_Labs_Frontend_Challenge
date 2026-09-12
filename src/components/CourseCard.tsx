import { Course, tierColors, tierLabels } from "../types"

interface CourseCardProps {
	course: Course
	onAddToCart: (course: Course) => void
	isInCart: boolean
	cartFull: boolean
	onSelect: (course: Course) => void
}

export default function CourseCard({ course, onAddToCart, isInCart, cartFull, onSelect }: CourseCardProps) {
	return (
		<div className="course-card" onClick={() => onSelect(course)}>
      <img
        className="course-card-image"
        src={course["card-image"] || "/course-placeholder.jpeg"}
        alt=""
      />

      <span
				style={{
					display: "inline-block",
					backgroundColor: "#000000",
					color: tierColors[course.tier],
					padding: "0.15rem 0.5rem",
					borderRadius: "20px",
					fontSize: "0.7rem",
					fontStyle: "italic",
	        fontWeight: "bold",
          marginTop: "0.5rem",
		      marginLeft: "0.5rem",
				}}
			>
				{tierLabels[course.tier]}
			</span>

      <div className="course-card-content">
        <h3> {course.dept} {course.number}: {course.title}</h3>
      </div>
    </div>
      )
}