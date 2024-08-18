import Modal from "../ui/Modal";

function Listings() {
	return (
		<div className="page">
			<Modal>
				<Modal.Open>
					<button className="listings__modal-open">Open Modal</button>
				</Modal.Open>

				<Modal.Window>
					<h1>modal</h1>
					<p>here is some content</p>
				</Modal.Window>
			</Modal>
		</div>
	);
}
export default Listings;
