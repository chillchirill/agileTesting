# agileTesting
ATM frontend



# Project Setup Instructions

## 📦 Install Dependencies

1. **Clone the repository:**

   ```bash
   git clone https://github.com/chillchirill/agileTesting.git
   ```

2. **Navigate into the project folder:**

   ```bash
   cd agileTesting
   ```

3. **Check if Node.js is installed:**

   ```bash
   node -v
   npm -v
   ```

   If not installed, download it here:
   [https://nodejs.org/](https://nodejs.org/)

4. **Install dependencies:**

   ```bash
   npm install
   ```

---

## 🚀 Run React Development Server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173/
```

---

## Run the App

To start the application:

```bash
npm install
```

Then:

```bash
npm run dev
```


# Testing

## Cypress
The Cypress library is used for testing. It allows you to test e2e. E2E (End to end tests) - automated actions on the site such as clicks, entering data into inputs and also having access to the data of the entire page, thereby verifying the correctness of the actions.


To start the cypress graphical interface where all test actions will be visible, you need to run the following script. (You will be asked for administrator rights, agree to the action).

```bash
npx cypress open
```
Then select E2E testing

In the new browser window, click on **generated.cy.ts** (don't forget to run the React application **npm run dev**)

Congratulations, you can see the running tests.

# Technical aspects of testing

## data-testid 
**Identifiers for easier interaction with elements**

**data-testid={`balance-${id}** in React component and in testing **data-testid="balance-main"**, **data-testid="balance-savings"** - fields with total amount on account

### First form section
operation-amount-input - input for depositing or withdrawing money from an account

operation-account-select - select with account selection 

deposit-btn - button to create (deposit) money into the selected account

withdraw-btn - button to burn (withdraw) money to the selected account

### Second form section
transfer-from - select with account selection

transfer-to - select with account selection

transfer-amount - input for transfering money between accounts

transfer-btn - confirm transaction button

### history-list - div element in which childs are action logs. 
Only the last 10 actions are displayed






## To request edit access, send me a message with your email address so I can add you:

- **WhatsApp:** +380982951127
- **Email:** kirilltonkovid@gmail.com
