import { useState } from "react";

import ReactDOM from "react-dom";

const modalRoot = document.getElementById("root");

const MyModal = () => {

	const [visibility, setVisibility] = useState(false);

	const open = () => {
		document.body.style.overflow = "hidden";
		setVisibility(true);
	};

	const close = () => {
		document.body.style.overflow = "auto";
		setVisibility(false);
	};

	const ModalWrapper = (props) => {
		const { children, className = "" } = props;
		if (className) {
			modalRoot.classList.add(`${ className }`);
		}
		return visibility ? ReactDOM.createPortal(children, modalRoot) : null;
	};

	return {
		ModalWrapper, open, close
	};
};

export default MyModal;
