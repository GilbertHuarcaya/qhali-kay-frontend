/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe('render e2e test near hospitals', () => {
  beforeEach(() => {
    cy.visit('/near-med-center');
  });
  it('successfuly renders the page header', () => {
    cy.contains('Near Hospitals');
  });
});

describe('render e2e test feedback', () => {
  beforeEach(() => {
    cy.visit('/feedback');
  });
  it('successfuly renders the page header', () => {
    cy.contains('Feedback');
  });
  it('successfuly renders the Page content', () => {
    cy.contains('Message 10 characters minimum');
    cy.contains('Rating');
    cy.contains('Submit');
  });
});

describe('render e2e test home', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('successfuly renders the page header', () => {
    cy.contains('Find the best Medical Center near you');
  });
  it('successfuly renders the Home content', () => {
    cy.contains('Our Affiliations');
    cy.contains('How it Works?');
    cy.contains('Clients Review');
    cy.contains('© 2022 Copyright: QhaliKay - Gilbert Huarcaya');
  });

  it('successfuly renders navbar', () => {
    cy.contains('Search');
    cy.contains('Login');
  });
});

describe('render e2e test affiliations', () => {
  beforeEach(() => {
    cy.visit('/affiliations');
  });
  it('successfuly renders the page header', () => {
    cy.contains('Our Affiliations');
  });
  it('successfuly renders the Page content', () => {
    cy.contains('Archbishop Loayza National Hospital');
    cy.contains('Avenida Alfonso Ugarte 848, Cercado de Lima');
    cy.contains('© 2022 Copyright: QhaliKay - Gilbert Huarcaya');
  });
});

describe('render e2e test Contact Us', () => {
  beforeEach(() => {
    cy.visit('/contact-us');
  });
  it('successfuly renders the page header', () => {
    cy.contains('Contact us');
  });
  it('successfuly renders the Page content', () => {
    cy.contains('Contact us');
    cy.contains('Name');
    cy.contains('Email address');
    cy.contains('Message');
    cy.contains('Submit');
  });
});
