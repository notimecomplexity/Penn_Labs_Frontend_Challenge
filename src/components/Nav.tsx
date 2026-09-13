import cart from "../assets/Cart.png"
import cc from "../assets/Completed.png"

interface NavProps {
	search: string
	numberFilter: string
	completedCount: number
	cartCount: number
	cartFull: boolean
	onSearchChange: (value: string) => void
	onNumberFilterChange: (value: string) => void
	onOpenCompleted: () => void
	onOpenCart: () => void
}

function Nav({search, numberFilter, completedCount, cartCount, cartFull, onSearchChange, onNumberFilterChange, onOpenCart,onOpenCompleted}: NavProps) {
	return (
		<nav className="navigation"
			style={{
				alignItems: "center",
				backgroundColor: "#011F5B",
				display: "flex",
				justifyContent: "space-between",
				minHeight: "50px",
                flexWrap: "wrap",
                gap: "0.75rem",
				padding: "1rem",
				position: "sticky",
				top: 0,
				zIndex: 1000
			}}
		>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					gap: "0.75rem",
                    flexWrap: "wrap"
				}}
			>
				<h1
					style={{
						fontSize: "32px",
						fontWeight: "normal",
						margin: 0
					}}
				>
					Penn Course Cart
				</h1>

				<input
					onChange={(e) => onSearchChange(e.target.value)}
					aria-label="Search courses"
                    placeholder="Search courses..."
					style={{ padding: "0.5rem", width: "min(670px, 80vw)", boxSizing: "border-box" }}
					type="text"
					value={search}
				/>

				<input
					onChange={(e) => onNumberFilterChange(e.target.value)}
					aria-label="Filter by course number"
                    placeholder="Filter by number..."
					style={{ padding: "0.5rem", width: "150px" }}
					type="text"
					value={numberFilter}
				/>
			</div>

			<div
				style={{
					alignItems: "center",
					display: "flex",
					gap: "0.75rem",
                    flexWrap: "wrap"
				}}
			>
				<button
					aria-haspopup="dialog"
					aria-label={`Open completed courses, ${completedCount} courses`}
					onClick={onOpenCompleted}
					style={{
						background: "transparent",
						border: "none",
						padding: "0rem",
						position: "relative"
					}}
					type="button"
				>
					<img alt=""
						src={cc}
						style={{
							display: "block",
							height: "60px",
							width: "60px"
						}}
					/>
					<span
						aria-hidden="true"
						style={{
							alignItems: "center",
							backgroundColor: "#FFC000",
							borderRadius: "50%",
							bottom: "5px",
							boxSizing: "border-box",
							color: "#011F5B",
							display: "flex",
							fontSize: "10px",
							fontWeight: "bold",
							height: "16px",
							justifyContent: "center",
							minWidth: "16px",
							padding: "0 3px",
							position: "absolute",
							right: 0
						}}
					>
						{completedCount}
					</span>
				</button>

				<button
					aria-haspopup="dialog"
					aria-label={`Open cart, ${cartCount} courses`}
					onClick={onOpenCart}
					style={{
						background: "transparent",
						border: "none",
						padding: "0.25rem",
						position: "relative"
					}}
					type="button"
				>
					<img alt=""
						src={cart}
						style={{
							display: "block",
							height: "40px",
							width: "40px"
						}}
					/>
					<span
						aria-hidden="true"
						style={{
							alignItems: "center",
							backgroundColor: cartFull? "#FF0E0E" : "#FFC000",
							borderRadius: "50%",
							bottom: 0,
							color: "#011F5B",
							display: "flex",
							fontSize: "10px",
							fontWeight: "bold",
							height: "16px",
							justifyContent: "center",
							position: "absolute",
							right: 0,
							width: "16px"
						}}
					>
						{cartCount}
					</span>
				</button>
			</div>
		</nav>
	)
}

export default Nav
