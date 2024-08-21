import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<ModalContext.Provider value={{ isOpen, toggle }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children }) {
	const { toggle } = useContext(ModalContext);

	return cloneElement(children, { onClick: toggle });
}

function Window({ children }) {
	const { isOpen } = useContext(ModalContext);

	if (!isOpen) return null;

	return createPortal(
		<div className="modal__container">{children}</div>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// should also close with outside click and 'esc' but i cant make it work
