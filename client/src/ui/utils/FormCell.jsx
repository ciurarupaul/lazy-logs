function FormCell({
	type = "text",
	fieldname,
	label,
	onChange,
	onSubmit,
	required = false,
}) {
	return (
		<div className="form">
			<form
				action="#"
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(e.target[fieldname].value);
				}}
			>
				<input
					type={type}
					name={fieldname}
					id={fieldname}
					placeholder={label}
					autoComplete="off"
					onChange={onChange}
					required={required}
				/>
				{label && <label htmlFor={fieldname}>{label}</label>}
			</form>
		</div>
	);
}

export default FormCell;
