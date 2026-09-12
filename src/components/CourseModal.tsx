import { useState } from "react"
import { Course, courseId, getPrereqsList } from "../types"

interface CourseModalProps {
	course: Course
	onClose: () => void
	onAddToCart: (course: Course) => void
    onRemoveFromCart: (id: string) => void
	isInCart: boolean
	cartFull: boolean
}

export default function CourseModal({ course, onClose, onAddToCart, onRemoveFromCart, isInCart, cartFull }: CourseModalProps) {
    const [isHoveringButton, setIsHoveringButton] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const prereqs = getPrereqsList(course)
	const crossListed = course["cross-listed"] ?? []

    const handleButtonClick = () => {
		if (isInCart) {
			onRemoveFromCart(courseId(course))
			onClose()
		} else {
			onAddToCart(course)
			onClose()
		}
	}

    const buttonLabel = isInCart
		? isHoveringButton
			? "Remove"
			: "Added!"
		: cartFull
		? "Cart Full"
		: "Add to Cart"

	return (
		<div
			onClick={onClose}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 2000,
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					backgroundColor: "#990000",
					borderRadius: "12px",
					padding: "2rem",
					maxWidth: "600px",
					width: "90%",
					maxHeight: "80vh",
					overflowY: "auto",
					position: "relative",
				}}
			>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: "1rem",
						right: "1rem",
						border: "none",
						background: "none",
						fontSize: "1.5rem",
						cursor: "pointer",
					}}
				>
					×
				</button>

				<h2 style={{ marginTop: 0 }}>
					{course.dept} {course.number}: {course.title}
				</h2>

				<p>{course.description}</p>

				{prereqs.length > 0 && (
					<p><strong>Prerequisites:</strong> {prereqs.join(", ")}</p>
				)}

				{crossListed.length > 0 && (
					<p><strong>Cross-listed as:</strong> {crossListed.join(", ")}</p>
				)}

				<button
					disabled={cartFull && !isInCart}
					onMouseEnter={() => setIsHoveringButton(true)}
					onMouseLeave={() => setIsHoveringButton(false)}
					onClick={handleButtonClick}
					style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
				>
					{buttonLabel}
				</button>

                <button
						onClick={() => setIsCompleted(!isCompleted)}
						style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}
					>
						{isCompleted ? "Completed!" : "Completed?"}
				</button>
			</div>
		</div>
	)
}