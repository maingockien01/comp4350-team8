import SignupForm from '../../src/Components/SignupForm';
import React from 'react';
import {render} from '@testing-library/react';
import {screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
describe('Signup', () => {
  it('Render component', () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
  });

  test('should contain Signup', () => {
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', {name: 'Signup'})).toBeTruthy();
  });
});
