/// cypress/e2e/generated.cy.ts
describe("Bank App E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should load main page", () => {
    cy.contains("Recent activity").should("exist");
    cy.contains("Main account").should("exist");
  });

  it("should perform deposit and create history entry", () => {
    cy.get('[data-testid="operation-account-select"]').select("main");

    cy.get('[data-testid="operation-amount-input"]').clear().type("100");
    cy.get('[data-testid="deposit-btn"]').click();

    cy.get('[data-testid="balance-main"]').then(($el) => {
        cy.log('Balance after deposit:');
        cy.log($el.text());
        expect($el.text()).to.equal("$100.00");
    });
    // /*
    cy.get('[data-testid="operation-account-select"]').select("main");

    cy.get('[data-testid="operation-amount-input"]').clear().type("100");
    cy.get('[data-testid="deposit-btn"]').click();
    // */
    cy.get('[data-testid="history-list"]')
        .children()
        .each(($el, index, $list) => {
            cy.wrap($el.text()).should('match', /^(?=.*Main)(?=.*\+\$100)/);
        });

  });
});
