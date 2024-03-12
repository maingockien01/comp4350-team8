import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailScreen = () => {
	const location = useLocation();
	const { cid } = location.state;

	return <div>CID: {cid}</div>;
};

export default DetailScreen;
