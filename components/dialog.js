// import React from "react";

// // reactstrap components
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

// function Dialog() {
// 	const [modalOpen, setModalOpen] = React.useState(false);
// 	return (
// 		<div>
// 			<Button
// 				className="button absolute left-1/2 top-1/2"
// 				type="button"
// 				onClick={() => setModalOpen(!modalOpen)}
// 			>
// 				Postuler
// 			</Button>
// 				<Modal //modal
// 					className="absolute left-0 top-0 bg-dark w-[600px] h-[700px] p-5"
// 					toggle={() => setModalOpen(!modalOpen)}
// 					isOpen={modalOpen}
// 				>
// 			<div className="absolute left-0 top-0 flex h-screen w-screen justify-center items-center bg-[rgba(0,0,0,0.5)]">
// 					<div>  //className="modal-header"
// 						<h5 className="text-xl text-center mb-5" id="exampleModalLabel">
// 							Je souhaite candidater à cette offre
// 						</h5>
// 					</div>
// 					<ModalBody>//ModalBody
// 						//form
// 					</ModalBody>
// 					<ModalFooter> //ModalFooter
// 						<Button
// 						className='button'
// 							color="secondary"
// 							type="button"
// 							onClick={() => setModalOpen(!modalOpen)}
// 						>
// 							Close
// 						</Button>
// 						<Button color="primary" type="button">
// 							Save changes
// 						</Button>
// 					</ModalFooter>
// 			</div>
// 				</Modal>
// 		</div>
// 	);
// }

// export default Dialog;

import React from "react";

// reactstrap components
import { Button } from "reactstrap";
import { Modal } from '@nextui-org/react';


function Dialog() {
	const [modalOpen, setModalOpen] = React.useState(false);
	return (
		<>
			<Button
				className="button absolute left-1/2 top-1/2"
				color="primary"
				type="button"
				onClick={() => setModalOpen(!modalOpen)}
			>
				Launch demo modal
			</Button>
			<Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
				<div> // className=" modal-header"
					<h5 className=" modal-title" id="exampleModalLabel">
						Modal title
					</h5>
					<button
						aria-label="Close"
						className=" close"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<Modal.Body>...</Modal.Body>
				<Modal.Footer>
					<Button
						color="secondary"
						type="button"
						onClick={() => setModalOpen(!modalOpen)}
					>
						Close
					</Button>
					<Button color="primary" type="button">
						Save changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Dialog;
