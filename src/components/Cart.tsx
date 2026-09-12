import { useEffect, useRef } from "react"
import { Course, courseId } from "../types"

interface CartProps {
	onClose: () => void
	cart: Course[]
	onRemoveFromCart: (id: string) => void
	onCheckout: () => void
}

const Cart = ({ cart, onRemoveFromCart, onCheckout, onClose }: CartProps) => {
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
		className="cart-dialog"
		aria-labelledby="cart-title"
		onCancel={onClose}
		onClick={(event) => {
			if (event.target === event.currentTarget) onClose()
		}}
	>
	<div
		style={{
			border: "1px solid rgba(0, 0, 0, 0.1)",
			padding: "1rem",
			marginBottom: "1.5rem",
			borderRadius: "4px",
		}}
	>
		<button type="button" onClick={onClose} aria-label="Close cart" style={{ float: "right" }}>×</button>
		<h2 id="cart-title">Course Cart ({cart.length}/7)</h2>

		{cart.length === 0 ? (
			<p>Your cart is currently empty!</p>
		) : (
			<>
				<ul>
					{cart.map((course) => (
						<li key={courseId(course)} style={{ marginBottom: "0.5rem" }}>
							{course.dept} {course.number}: {course.title}{" "}
							<button onClick={() => onRemoveFromCart(courseId(course))}>
								Remove
							</button>
						</li>
					))}
				</ul>

				<button onClick={onCheckout}>Checkout</button>
			</>
		)}
	</div>
	</dialog>
	)
}

export default Cart