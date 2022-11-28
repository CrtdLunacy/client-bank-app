# Banking application client

The application is a client part that receives data from the server via API.
Implemented authorization (currently only for one user).
The application has 3 sections:
1. Accounts section - it displays all user accounts, you can open an account for information about the balance chart, transaction history and transfer the amount to another account.

By clicking on the transaction chart, you can get to the detailed account history section.

2. Currency section - it displays information about the current balance on all currency accounts, real-time information about changes in the exchange rate is displayed, and you can also transfer from one currency account to another.

3. ATM map - it displays all available ATM points that are loaded via API.


## Used to create:
RE:DOM library, native JS, Chart.JS library, Webpack, CyPress library (for e2e tests)
