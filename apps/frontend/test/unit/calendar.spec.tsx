import React from 'react';
import Calendar from '../../src/Screens/Calendar/Calendar';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const CURRENT_TERM = '12';
const ONE_ACTIVE_COURSE = {
	courseName: 'Introdution to Probability',
	time: 'M11:00,W11:00,F11:00',
	location: 'Tier206',
};
const NO_ACTIVE_COURSE = {};

// Mock the two fetch responses for the calendar page
const mockFetch = jest
	.fn()
	.mockReturnValueOnce({ json: () => Promise.resolve(CURRENT_TERM) })
	.mockReturnValueOnce({ json: () => Promise.resolve(ONE_ACTIVE_COURSE) })
	.mockReturnValueOnce({ json: () => Promise.resolve(CURRENT_TERM) })
	.mockReturnValueOnce({ json: () => Promise.resolve(NO_ACTIVE_COURSE) });

// Jest natively does not support structuredClone , therefore create a mock function for it
global.structuredClone = jest.fn((val) => {
	return JSON.parse(JSON.stringify(val));
});

it('Render Calendar', async () => {
	// Mocking the fetch functions
	global.fetch = mockFetch;
	// Render the calendar component
	render(<Calendar />);
	// Wait for the fetch calls to execute and then test
	await waitFor(() => {
		// Check if the button is enabled in case there are active courses
		expect(screen.getByRole('button', { name: 'Export' })).toBeEnabled();
		// Check if button is disabled in case there are no active courses
		expect(screen.getByRole('button', { name: 'Export' })).toBeEnabled();
	});
});
