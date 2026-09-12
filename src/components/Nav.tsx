import logo from "../assets/PLFC.png"

interface NavProps {
	onOpenCart: () => void
	search: string
	onSearchChange: (value: string) => void
	numberFilter: string
	onNumberFilterChange: (value: string) => void
}

function Nav({ onOpenCart, search, onSearchChange, numberFilter, onNumberFilterChange }: NavProps) {
	return (
		<nav
			style={{
				position: "sticky",
				top: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "1rem",
				backgroundColor: "#011F5B",
				zIndex: 1000
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
				<h1 style={{ margin: 0, fontSize: "32px", fontWeight: "normal" }}>Penn Course Cart</h1>
				<input
					type="text"
					placeholder="Search courses..."
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					style={{ padding: "0.5rem", width: "670px" }}
				/>
				<input
					type="text"
					placeholder="Filter by number..."
					value={numberFilter}
					onChange={(e) => onNumberFilterChange(e.target.value)}
					style={{ padding: "0.5rem", width: "150px" }}
				/>
			</div>

			<button type="button" onClick={onOpenCart} aria-label="Open cart" aria-haspopup="dialog" style={{ background: "transparent", border: "none", padding: "0.25rem" }}>
				<img src={logo} alt="" style={{ height: "40px", width: "40px", display: "block" }} />
			</button>
		</nav>
	)
}

export default Nav