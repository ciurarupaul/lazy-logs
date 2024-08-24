function FormCell({ type = "text", fieldname, label, required = false }) {
	return (
		<div className="form">
			<form
				action="#"
				className="form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					type={type}
					name={fieldname}
					id={fieldname}
					placeholder={label}
					required={required}
				/>
				{label && <label htmlFor={fieldname}>{label}</label>}
			</form>
		</div>
	);
}

export default FormCell;
