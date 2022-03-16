import Account           from 'App/Models/Account';
import { rules, schema } from '@ioc:Adonis/Core/Validator';
import User              from 'App/Models/User';
import { DateTime }      from 'luxon';

export default class AccountsController {

    public async index () {
        return await Account.all ();
    }

    public async show ({ request, response }) {
        let id = request.params ().id;

        let account = await Account
            .query()
            .from ('accounts')
            .where ('id', id)
            .preload('users')
            .first();

        if (!account) {
            return response.notFound ();
        }

        await account.load('transactions');

        return account;
    }

    public async create ({ auth, request, response }) {
        const accountSchema = schema.create ({
            name: schema.string ({}, [
                rules.minLength (4)
            ]),
            currentAmount: schema.number ()
        });

        const payload = await request.validate ({ schema: accountSchema });

        let user = await User.find(auth.use('api').user.id);

        if (!user) {
            return response.unauthorized();
        }

        let account           = new Account ();
        account.name          = payload.name;
        account.currentAmount = payload.currentAmount;
        account.creatorId     = user.id;

        try {
            await account.save ();
        } catch (e) {
            // Something went wrong here
            return response.internalServerError ();
        }
        // The account has been created. Time to create the user-account
        await user.related('accounts').attach([account.id]);

        return account;
    }

    public async update ({ request, response }) {
        const accountSchema = schema.create ({
            accountId: schema.number (),
            name: schema.string ({}, [
                rules.minLength (4)
            ]),
            currentAmount: schema.number ()
        });

        const payload = await request.validate ({ schema: accountSchema });

        if (payload.accountId != request.params ().id) {
            return response.badRequest ();
        }

        let account = await Account.find (payload.accountId);

        if (!account) {
            return response.badRequest ();
        }

        account.name = payload.name;
        account.currentAmount = payload.currentAmount;
        account.updatedAt = DateTime.now();

        try {
            await account.save ();
        } catch (e) {
            // Something went wrong here
            return response.internalServerError ();
        }
        // The account has been created.
        return account;
    }

    public async destroy ({ request, response }) {
        let accountId = request.params().id;

        let account = await Account.find(accountId);

        if (account == null) {
            return response.badRequest();
        }

        await account.load('users');

        try {
            for (let i = 0; i < account.users.length; i++) {
                let user = account.users[i];
                await account.related('users').detach([user.id]);
            }
        } catch (e) {
            return response.internalServerError();
        }

        try {
            await account.delete();
        } catch (e) {
            return response.internalServerError();
        }

        return accountId;
    }

}
