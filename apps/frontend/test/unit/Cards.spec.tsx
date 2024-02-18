import { render } from '@testing-library/react';
import Cards from '../../src/Components/Cards';
import React from 'react';

describe('Cards', () => {
    test('should render Cards component', () => {
        render(<Cards />)
    });

    test('should contain the text Lizard', () => {
        const { getByText } = render(<Cards />);
        expect(getByText('Lizard')).toBeTruthy();
    });
});
