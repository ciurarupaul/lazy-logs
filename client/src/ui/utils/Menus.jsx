import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const MenusContext = createContext();

function Menus({ children }) {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState(null);

	const close = () => setOpenId("");
	const open = setOpenId;

	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition }}
		>
			{children}
		</MenusContext.Provider>
	);
}

function getScrollbarWidth() {
	// Create a temporary div to measure scrollbar width
	const outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.overflow = "scroll"; // Force scrollbar to appear
	outer.style.width = "50px";
	outer.style.height = "50px";
	document.body.appendChild(outer);

	// Create an inner div to calculate the width difference
	const inner = document.createElement("div");
	outer.appendChild(inner);

	const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

	// Remove the temporary elements
	document.body.removeChild(outer);

	return scrollbarWidth;
}

function Toggle({ id, children }) {
	const { openId, close, open, setPosition } = useContext(MenusContext);

	function handleClick(e) {
		e.stopPropagation();

		const rect = e.target.closest("button").getBoundingClientRect();
		const scrollbarWidth = getScrollbarWidth();

		let x = window.innerWidth - rect.width - rect.x;
		let y = rect.y + rect.height + 8;

		if (window.innerWidth > document.documentElement.clientWidth) {
			x -= scrollbarWidth;
		}

		setPosition({ x, y });

		openId === "" || openId !== id ? open(id) : close();
	}

	return <div onClick={handleClick}>{children}</div>;
}

function List({ id, children }) {
	const { openId, position, close } = useContext(MenusContext);
	const ref = useOutsideClick(close, false);

	if (openId !== id) return null;

	return createPortal(
		<ul
			className="menu__list"
			style={{ right: `${position.x}px`, top: `${position.y}px` }}
			ref={ref}
		>
			{children}
		</ul>,
		document.body
	);
}

function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext);

	function handleClick() {
		onClick?.();
		close();
	}

	return (
		<li>
			<button className="menu__item" onClick={handleClick}>
				{icon}
				<span>{children}</span>
			</button>
		</li>
	);
}

Menus.Menu = ({ children }) => <div className="menu">{children}</div>;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
