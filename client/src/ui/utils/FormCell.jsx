import React, { useEffect, useRef, useState } from "react";

const FormCell = React.forwardRef(
	(
		{
			type = "text",
			fieldname,
			label,
			value,
			onChange,
			onSubmit,
			required = false,
			validation = () => true,
			onKeyDown = () => {},
			autofocus = false,
		},
		ref
	) => {
		const [isValid, setIsValid] = useState(true);
		const inputRef = ref || useRef(null);

		useEffect(() => {
			if (autofocus && inputRef.current) {
				inputRef.current.focus();
			}
		}, [autofocus]);

		const handleChange = (e) => {
			const newValue = e.target.value;
			onChange(e);

			if (validation(newValue)) {
				setIsValid(true);
			} else {
				setIsValid(false);
			}
		};

		const handleKeyDown = (e) => {
			if (e.key === "Enter") {
				if (!isValid) {
					e.preventDefault();
				} else {
					onKeyDown(e);
				}
			} else {
				onKeyDown(e);
			}
		};

		return (
			<div className="form">
				<form
					action="#"
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
						if (isValid && onSubmit) {
							onSubmit(e.target[fieldname].value);
						}
					}}
				>
					<input
						type={type}
						name={fieldname}
						id={fieldname}
						placeholder={label}
						autoComplete="off"
						value={value}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						ref={ref}
						required={required}
						style={{
							borderBottom: `2px solid ${
								isValid ? "var(--green)" : "var(--red)"
							}`,
						}}
					/>
					{label && <label htmlFor={fieldname}>{label}</label>}
				</form>
			</div>
		);
	}
);

export default FormCell;
