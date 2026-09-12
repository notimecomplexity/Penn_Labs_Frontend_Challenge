import { Routes, Route, useNavigate } from "react-router-dom"
import { useState } from "react"
import Nav from "./components/Nav"
import Courses from "./components/Courses"
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"
import { Course, courseId } from "./types"
import background from "./assets/Background.webp"

function App() {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cart, setCart] = useState<Course[]>([])
	const [search, setSearch] = useState("")
	const [numberFilter, setNumberFilter] = useState("")
	const navigate = useNavigate()

	const handleAddToCart = (course: Course) => {
		setCart((prev) => {
			if (prev.length >= 7) return prev
			if (prev.some((c) => courseId(c) === courseId(course))) return prev
			return [...prev, course]
		})
	}

	const handleRemoveFromCart = (id: string) => {
		setCart((prev) => prev.filter((c) => courseId(c) !== id))
	}

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
							onOpenCart={() => setIsCartOpen(true)}
							search={search}
							onSearchChange={setSearch}
							numberFilter={numberFilter}
							onNumberFilterChange={setNumberFilter}
						/>
						<div
							style={{
								width: "100%",
								boxSizing: "border-box",
								padding: "2rem calc(1rem + 10%) 0",
								backgroundImage: `url(${background})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundAttachment: "fixed",
								minHeight: "100vh",
							}}
						>
							<Courses cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} search={search} numberFilter={numberFilter} />
							{isCartOpen && (
								<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} onClose={() => setIsCartOpen(false)} />
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