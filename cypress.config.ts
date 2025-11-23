import { defineConfig } from "cypress";
import readExcel from "./cypress/support/excel.ts";
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        readExcel
      });
    },
  },
});
