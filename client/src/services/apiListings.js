export async function getListings() {
	try {
		const response = await fetch("http://localhost:3000/api/listings");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
}
