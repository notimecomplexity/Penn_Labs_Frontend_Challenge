import { useEffect, useRef, useState } from "react"

import { Course, courseId, getPrereqsList, hasMetPrereqs} from "../types"

interface CourseModalProps {
	course: Course
	isCompleted: boolean
	completedCourses: Course[]
	isInCart: boolean
	cartFull: boolean
	onAddToCart: (course: Course) => void
    onRemoveFromCart: (id: string) => void
	onMarkCompleted: (course: Course) => void
	onUnmarkCompleted: (id: string) => void
	onClose: () => void
}

export default function CourseModal({course, isCompleted, completedCourses, isInCart, cartFull, onAddToCart, onRemoveFromCart, onMarkCompleted, onUnmarkCompleted, onClose}: CourseModalProps) {
	const crossListed = course["cross-listed"] ?? []

	const prereqs = getPrereqsList(course)
    const prereqsMet = hasMetPrereqs(course, completedCourses)

	const handleButtonClick = () => {
		if (isInCart) {
			onRemoveFromCart(courseId(course))
			onClose()
		} else {
			onAddToCart(course)
			onClose()
		}
	}
    const addButtonDisabled = (cartFull && !isInCart) || (!prereqsMet && !isInCart) || isCompleted
    const completeButtonDisabled = (!prereqsMet && !isCompleted) || isInCart
	const [isHoveringButton, setIsHoveringButton] = useState(false)
    const buttonLabel = isInCart
		? isHoveringButton
			? "Remove"
			: "Added!"
		: !prereqsMet
		? "Missing Prerequisite/s"
        : cartFull
		? "Cart Full"
		: "Add to Cart"

    const dialogRef = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.showModal()
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            dialog?.close()
            document.body.style.overflow = previousOverflow
        }
    }, [])

	return (
        <dialog
            ref={dialogRef}
            className="popup-dialog"
            aria-labelledby="course-title"
            onCancel={onClose}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose()
            }}
        >
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					backgroundColor: "#990000",
					borderRadius: "12px",
					maxHeight: "80vh",
					maxWidth: "600px",
					overflowY: "auto",
					padding: "2rem",
					position: "relative",
                    boxSizing: "border-box",
					width: "100%"
				}}
			>
				<button
                    aria-label="Close course details"
					onClick={onClose}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						fontSize: "1.5rem",
						position: "absolute",
						right: "1rem",
						top: "1rem"
					}}
				>
					×
				</button>

				<h2 id="course-title" style={{ marginTop: 0 }}>
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
                    disabled={addButtonDisabled}
					onClick={handleButtonClick}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                    style={{
                        marginTop: "1rem",
                        opacity: addButtonDisabled ? 0.5 : 1,
						padding: "0.5rem 1rem"
                    }}
                >
                    {buttonLabel}
                </button>

                <button
                    disabled={completeButtonDisabled}
                    onClick={() => {
                        isCompleted ? onUnmarkCompleted(courseId(course)) : onMarkCompleted(course)
                        onClose()
                    }}
                    style={{
                        marginLeft: "1rem",
						opacity: completeButtonDisabled ? 0.5 : 1,
                        padding: "0.5rem 1rem"
                    }}
                >
                    {isCompleted ? "Completed!" : "Completed?"}
                </button>
			</div>
		</dialog>
	)
}
