describe("Login end to end tests", () => {
  it("it should login with correct credentials", () => {
    cy.visit('/');

    cy.get('input[id="email-input"]').type('admin@email.com')
    cy.get('input[id="password-input"]').type('123456')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
  });
});
