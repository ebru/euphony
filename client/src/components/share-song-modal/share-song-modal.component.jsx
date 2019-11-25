import React, { useState } from 'react';
import { Modal } from 'antd';

import CustomButton from './../custom-button/custom-button.component';

const ShareSongModal = () => {
	const [modalVisibility, setModalVisibility] = useState(false);

	const showModal = () => {
		setModalVisibility(true);
	};

	const handleCancel = e => {
		setModalVisibility(false);
	};

	const handleOk = e => {
		setModalVisibility(false);
	};

	return (
		<>
			<CustomButton
				className='add-post-btn'
				onClick={showModal}
			>
				Test
    	</CustomButton>
			<Modal
				width='800px'
				style={{ top: 50 }}
				visible={modalVisibility}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<h1>Test</h1>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<p>Test</p>
				<CustomButton
					onClick={handleOk}
				>
					OK
    	</CustomButton>
			</Modal>
		</>
	)
};

export default ShareSongModal;