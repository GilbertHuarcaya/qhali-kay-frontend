/* eslint-disable quotes */
/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe('e2e test login-logout', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('successfuly executes login and logout', () => {
    cy.get(`[data-cy='login-input_email']`).type(Cypress.env('username'));
    cy.get(`[data-cy='login-input_password']`).type(Cypress.env('password'));
    cy.get(`[type='submit']`).click();
    cy.get(`[data-cy='profile-btn']`).click();
    cy.get(`[data-cy='logout-btn']`).click();
  });
});
