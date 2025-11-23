 const UI: Record<string, (...args: any[]) => void> = {
  // Actions for operations panel to create and burn money
  "operation-account-select": (selector: string) => {
    cy.get('[data-testid="operation-account-select"]').select(selector);
  },

  "operation-amount-input": (amount: string) => {
    cy.get('[data-testid="operation-amount-input"]').clear().type(amount);
  },

  "deposit-btn": () => {
    cy.get('[data-testid="deposit-btn"]').click();
  },

  "withdraw-btn": () => {
    cy.get('[data-testid="withdraw-btn"]').click();
  },

  // Top section with balances information
  "balance-main": (expected: string) => {
    cy.get('[data-testid="balance-main"]').then(($el) => {
      const text = $el.text();
      cy.log(`Balance of main: ${text}`);
      expect(text).to.equal(expected);
    });
  },

  "balance-savings": (expected: string) => {
    cy.get('[data-testid="balance-savings"]').then(($el) => {
      const text = $el.text();
      cy.log(`Balance of savings: ${text}`);
      expect(text).to.equal(expected);
    });
  },

  // Actions for transfer panel
  "transfer-from": (accountId: string) => {
    cy.get('[data-testid="transfer-from"]').select(accountId);
  },

  "transfer-to": (accountId: string) => {
    cy.get('[data-testid="transfer-to"]').select(accountId);
  },

  "transfer-amount": (amount: string) => {
    cy.get('[data-testid="transfer-amount"]').clear().type(amount);
  },

  "transfer-btn": () => {
    cy.get('[data-testid="transfer-btn"]').click();
  },

  // Check first entry in history list for expected words
  "history-first-check": (expectedStrings: string) => {
    const expectedArray = expectedStrings.split(";").map((s) => s.trim());

    cy.get('[data-testid="history-list"]')
      .children()
      .first()
      .then(($el) => {
        const text = $el.text();
        expectedArray.forEach((word) => {
          expect(text).to.include(word);
        });
      });
  },
};
export default UI;

