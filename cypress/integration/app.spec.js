/// <reference types="cypress" />

//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Integration Testing", () => {
  before(() => {
    cy.visit("/");
  });

  it("displays two candidates by default", () => {
    cy.get(`[data-testid=list] > div:not([class*=noContent])`).should("have.length", 2);
  });

  it("displays one candidate in first column by default", () => {
    cy.get(`[data-testid=list]`).first().children().should("have.length", 1);
  });

  it("move candidate to the next step", () => {
    cy.get(`[data-testid=list]`).first().children().first().find("button:last").click();
    cy.get(`[data-testid=list]`).first().contains("No hay candidatos");
    cy.get(`[data-testid=list]`).eq(1).children().should("have.length", 2);
  });

  // it("can add new todo items", () => {
  // We'll store our item text in a variable so we can reuse it
  // const newItem = "Feed the cat";
  // cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);
  // cy.get(".todo-list li").should("have.length", 3).last().should("have.text", newItem);
  // });

  it("add new candidate and verify it is in first column", () => {
    cy.getById("add-candidate").click();
    cy.getById("new-candidate-form").find("input[type=text]").type("Mark");
    cy.getById("new-candidate-form").find("textarea").type("Good candidate");
    cy.getById("new-candidate-form").find("[type=submit]").click();
    cy.get(`[data-testid=list] > div:not([class*=noContent])`).should("have.length", 3);
    cy.get(`[data-testid=list]`).first().children().should("have.length", 1);
    // cy.contains("Pay electric bill").parents("li").should("have.class", "completed");
  });
});
