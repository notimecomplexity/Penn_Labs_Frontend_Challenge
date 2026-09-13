import { Routes, Route, useNavigate } from "react-router-dom"
import { useState } from "react"

import background from "./assets/Background.webp"

import Nav from "./components/Nav"
import Courses from "./components/Courses"
import { Course, courseId } from "./types"
import CompletedCourses from "./components/CompletedCourses"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"

const MAX_CART_SIZE = 7

function App() {

	// search bars
	const [numberFilter, setNumberFilter] = useState("")
	const [search, setSearch] = useState("")

	// completed courses
	const [completedCourses, setCompletedCourses] = useState<Course[]>([])
	const [isCompletedOpen, setIsCompletedOpen] = useState(false)
	const handleMarkCompleted = (course: Course) => {
		setCompletedCourses((prev) => {
			if (prev.some((c) => courseId(c) === courseId(course))) return prev
			return [...prev, course]
		})
	}
	const handleUnmarkCompleted = (id: string) => {
		setCompletedCourses((prev) => prev.filter((c) => courseId(c) !== id))
	}

	// course cart
	const [cart, setCart] = useState<Course[]>([])
	const [isCartOpen, setIsCartOpen] = useState(false)
	const handleAddToCart = (course: Course) => {
		setCart((prev) => {
			if (prev.length >= MAX_CART_SIZE) return prev
			if (prev.some((c) => courseId(c) === courseId(course))) return prev
			return [...prev, course]
		})
	}
	const handleRemoveFromCart = (id: string) => {
		setCart((prev) => prev.filter((c) => courseId(c) !== id))
	}

	// checkout
	const navigate = useNavigate()
	const handleCheckout = () => {
		setIsCartOpen(false)
		const courseIdsParam = cart.map(courseId).join(",")
		navigate(`/checkout?courses=${courseIdsParam}`)
	}

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Nav
							search={search}
							onSearchChange={setSearch}
							numberFilter={numberFilter}
							onNumberFilterChange={setNumberFilter}
							cartCount={cart.length}
							cartFull={cart.length >= MAX_CART_SIZE}
							onOpenCart={() => setIsCartOpen(true)}
							completedCount={completedCourses.length}
							onOpenCompleted={() => setIsCompletedOpen(true)}
						/>
						<div
							style={{
								backgroundImage: `url(${background})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundAttachment: "fixed",
								boxSizing: "border-box",
								minHeight: "100vh",
								padding: "2rem calc(1rem + 10%)",
								width: "100%"
							}}
						>
							<Courses
								search={search}
								numberFilter={numberFilter}
								onMarkCompleted={handleMarkCompleted}
								onUnmarkCompleted={handleUnmarkCompleted}
								completedCourses={completedCourses}
								onAddToCart={handleAddToCart}
								onRemoveFromCart={handleRemoveFromCart}
								cart={cart}
							/>
							{isCartOpen && (
								<Cart
									onRemoveFromCart={handleRemoveFromCart}
									cart={cart}
									onClose={() => setIsCartOpen(false)}
									onCheckout={handleCheckout}
								/>
							)}
							{isCompletedOpen && (
								<CompletedCourses
									onUnmarkCompleted={handleUnmarkCompleted}
									completedCourses={completedCourses}
									onClose={() => setIsCompletedOpen(false)}
								/>
							)}
						</div>
					</>
				}
			/>
			<Route path="/checkout" element={<Checkout />} />
		</Routes>
	)
}

export default App
