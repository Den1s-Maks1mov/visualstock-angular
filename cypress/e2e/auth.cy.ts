describe('Full Integration Flow: Navigation, AuthGuard, and Login', () => {

  const TEST_EMAIL = 'nikita2504@gmail.com';
  const TEST_PASSWORD = 'password1';

  beforeEach(() => {

    cy.clearLocalStorage();
    cy.visit('/photos');
  });

  it('should navigate details, be redirected by guard, and successfully log in', () => {

    cy.log('Перевірка захисту маршруту');

    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);

    cy.get('.add-photo-btn').click();

    cy.wait(500).then(() => {
      expect(alertStub).to.be.calledWith('Для додавання фотографій необхідно авторизуватися.');
    });
    cy.url().should('include', '/login');

    cy.log('Виконання авторизації');

    cy.get('#email').type(TEST_EMAIL);
    cy.get('#password').type(TEST_PASSWORD);

    cy.get('.btn-submit-action').contains('Увійти').click();

    cy.url().should('include', '/photos');

    cy.log('--- E2E Flow Completed Successfully ---');
  });
});
