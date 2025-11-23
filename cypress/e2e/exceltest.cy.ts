//this code unfortunately legacy and will never used again
/// <reference types="cypress" />
import UI from "../support/actions";

// console.log(data);
describe('Automated tests from Excel', () => {
let data: any;
beforeEach(() => {
  cy.visit("http://localhost:5173/");
});
before(() => {
  return cy.task("readExcel", "test.xlsx").then((excelData) => {
    data = excelData;
});
});
it('should have loaded excel data', () => {
    cy.log(data)
});
for (const sheetName in data) {
  cy.log(`Sheet: ${sheetName}`);
  const table = data[sheetName];
  let isStart = true;
  for (let i = 0; i < table.length; i++) {
    if(table[i].length === 0) {
        isStart = true;
        continue; 
    }
    if(isStart) {
        isStart = false;
        if(table.length > i+2) {
            let testIds = table[i+1];
            it(table[i][0], () => {
                for(let j = i + 2; j < table.length; j++, i++) {
                    if(table[j].length === 0) {
                        break;
                    }
                    for(let k = 0; k < testIds.length; k++) {
                        if(testIds[k] && table[j][k] !== undefined) {
                            if(table[j][k] == true) {
                                const func = UI[testIds[k]];
                                func(String(table[j][k]));
                            }
                        }
                    }
                }
            });
        } else {
            break;
        }
    }
     
  }
}
});


