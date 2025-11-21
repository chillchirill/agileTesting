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
            // cy.log(`Елемент #${index}: ${}`);
            cy.wrap($el.text()).should('match', /^(?=.*Main)(?=.*\+\$100)/);
            // тут можна робити будь-які перевірки
            // expect($el.text()).to.include("Deposit")
        });

  });
/*
  it("should perform withdraw and create history entry", () => {
    cy.get('[data-testid="operation-account-select"]').select("main");

    cy.get('[data-testid="operation-amount-input"]').clear().type("50");

    cy.get('[data-testid="withdraw-btn"]').click();

    cy.get('[data-testid="history-list"]')
      .children()
      .first()
      .should("contain.text", "Withdraw")
      .and("contain.text", "50");
  });

  it("should perform transfer and update history + balances", () => {
    cy.get('[data-testid="transfer-from"]').select("main");
    cy.get('[data-testid="transfer-to"]').select("savings");

    cy.get('[data-testid="transfer-amount"]').clear().type("25");
    cy.get('[data-testid="transfer-btn"]').click();

    cy.get('[data-testid="history-list"]')
      .children()
      .first()
      .should("contain.text", "Transfer")
      .and("contain.text", "25");
  });*/
});
