import { useEffect, useRef } from "react"

import { Course, courseId } from "../types"

interface CompletedCoursesProps {
	completedCourses: Course[]
	onUnmarkCompleted: (id: string) => void
	onClose: () => void
}

const CompletedCourses = ({completedCourses, onClose, onUnmarkCompleted}: CompletedCoursesProps) => {
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
			aria-labelledby="completed-title"
			className="popup-dialog"
			ref={dialogRef}
			onCancel={onClose}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose()
			}}
		>
			<div
				style={{
					border: "1px solid rgba(0, 0, 0, 0.1)",
					borderRadius: "4px",
					marginBottom: "1.5rem",
					padding: "1rem"
				}}
			>
				<button
					aria-label="Close completed courses"
					onClick={onClose}
					type="button"
					style={{
						background: "none",
						border: "none",
						float: "right",
						fontSize: "1.5rem",
					}}
				>
					×
				</button>

				<h2 id="completed-title">
					Completed Courses
				</h2>

				{completedCourses.length === 0 ? (<p>You haven't completed any courses yet!</p>) : (
					<ul>
						{completedCourses.map((course) => (
							<li
								key={courseId(course)}
								style={{ marginBottom: "0.5rem" }}
							>
								{course.dept} {course.number}: {course.title}

								<button
									aria-label={`Unmark completed ${course.dept} ${course.number}`}
                                    onClick={() => onUnmarkCompleted(courseId(course))}
									style={{
										background: "none",
										border: "none",
										marginLeft: "1rem",
									}}
								>
									×
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</dialog>
	)
}

export default CompletedCourses
