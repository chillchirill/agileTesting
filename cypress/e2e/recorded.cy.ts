describe('Automaticaly recorded tests', () => {
it('Deposit', function() {
  cy.visit('http://localhost:5173/')
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('100');
  cy.get('[data-testid="deposit-btn"]').click();
  
  cy.get('[data-testid="balance-main"]').should('have.text', '$100.00');
  
  cy.get('[data-testid="history-list"] span.block').should('have.text', '+$100.00');
  cy.get('[data-testid="history-list"] span.text-\\[11px\\]').should('have.text', 'to Main account');
});

it('Transfer', function() {
  cy.visit('http://localhost:5173/')
  cy.get('[data-testid="operation-account-select"]').select('savings');
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('100');
  cy.get('[data-testid="deposit-btn"]').click();
  cy.get('[data-testid="operation-account-select"]').select('main');
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('100');
  cy.get('[data-testid="deposit-btn"]').click();
  cy.get('[data-testid="transfer-amount"]').click();
  cy.get('[data-testid="transfer-amount"]').type('10');
  cy.get('[data-testid="transfer-btn"]').click();
  cy.get('[data-testid="balance-main"]').should('have.text', '$90.00');
  cy.get('[data-testid="balance-savings"]').should('have.text', '$110.00');
  cy.get('[data-testid="history-list"] span.text-sky-500').should('have.text', '+$10.00');
  cy.get('[data-testid="history-list"] div:nth-child(1) > div.flex-col > span.text-\\[11px\\]').should('have.text', 'from Main account → Savings account');
  
});
it('Withdraw more than have', function() {
  cy.visit('http://localhost:5173/')
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('100');
  cy.get('[data-testid="deposit-btn"]').click();
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('100.01');
  cy.get('[data-testid="withdraw-btn"]').click();
  cy.get('#root p.font-medium').should('have.text', 'Insufficient funds.');
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').clear();
  cy.get('[data-testid="operation-amount-input"]').type('100.00');
  cy.get('[data-testid="withdraw-btn"]').click();
  cy.get('[data-testid="balance-main"]').should('have.text', '$0.00');
  cy.get('[data-testid="history-list"] span.text-emerald-500').should('have.text', '+$100.00');
  cy.get('[data-testid="history-list"] span.text-rose-500').should('have.text', '-$100.00');
  cy.get('[data-testid="history-list"] div:nth-child(2) > div.flex-col > span.text-\\[11px\\]').should('have.text', 'to Main account');
  cy.get('[data-testid="history-list"] div:nth-child(1) > div.flex-col > span.text-\\[11px\\]').should('have.text', 'from Main account');
  
});
it('Transfer', function() {
  cy.visit('http://localhost:5173/')
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('19');
  cy.get('[data-testid="deposit-btn"]').click();
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('23');
  cy.get('[data-testid="deposit-btn"]').click();
  cy.get('[data-testid="operation-account-select"]').select('savings');
  cy.get('[data-testid="operation-amount-input"]').click();
  cy.get('[data-testid="operation-amount-input"]').type('34');
  cy.get('[data-testid="deposit-btn"]').click();
  cy.get('#root button.dark\\:border-slate-600').click();
  cy.get('[data-testid="transfer-amount"]').click();
  cy.get('[data-testid="transfer-amount"]').type('20');
  cy.get('[data-testid="transfer-btn"]').click();
  cy.get('[data-testid="balance-main"]').should('have.text', '$62.00');
  cy.get('[data-testid="balance-savings"]').should('have.text', '$14.00');
  cy.get('[data-testid="history-list"] span.text-sky-500').should('have.text', '+$20.00');
  cy.get('[data-testid="history-list"] div:nth-child(1) > div.flex-col > span.text-\\[11px\\]').should('have.text', 'from Savings account → Main account');
  
});
});






