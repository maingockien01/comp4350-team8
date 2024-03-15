import React from 'react';
import Navbar from '../../src/Components/Navbar';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Render Calendar', () => {
	test('Should display all the feature buttons', () => {
		const mockHandleLogout = jest.fn();
		render(
			<BrowserRouter>
				<Navbar handleLogout={mockHandleLogout} />
			</BrowserRouter>,
		);
		const buttonList = [
			'Home',
			'Courses Look Up',
			'Add/Drop Courses',
			'Calendar',
			'Roadmap',
			'Personal roadmap',
		];
		for (const button of buttonList) {
			expect(screen.getByRole('button', { name: button })).toBeTruthy();
		}
	});
});
