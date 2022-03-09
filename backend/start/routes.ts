/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    // Accounts
    Route.group(() => {
        Route.get ('accounts', 'AccountsController.index');
        Route.get ('accounts/:id', 'AccountsController.show');
        Route.post ('accounts', 'AccountsController.create');
        Route.put ('accounts/:id', 'AccountsController.update');
        Route.delete ('accounts/:id', 'AccountsController.destroy');
    });

    Route.group(() => {
        Route.get ('transactions', 'TransactionsController.index');
        Route.get ('transactions/:id', 'TransactionsController.show');
        Route.post ('transactions', 'TransactionsController.create');
        Route.put ('transactions/:id', 'TransactionsController.update');
        Route.delete ('transactions/:id', 'TransactionsController.destroy');
    });
}).prefix('api');
