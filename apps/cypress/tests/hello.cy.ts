describe('Hello', () => {
  it('should say hello', () => {
	expect('hello').toBe('hello');
  });
  it('should open localhost:3000', () => {
	cy.visit('http://localhost:3000');
  });
});