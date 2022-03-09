// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Transaction  from 'App/Models/Transaction';
import User         from 'App/Models/User';
import { schema }   from '@ioc:Adonis/Core/Validator';
import { DateTime } from 'luxon';

export default class TransactionsController {

    public async index ({ response }) {
        let transactions = await Transaction.all();
        return response.ok(transactions);
    }

    public async show ({ request, response }) {
        let id = request.params().id;

        let transaction = await Transaction.find(id);

        if ( !transaction ) {
            return response.notFound();
        }

        return response.ok(transaction);
    }

    public async create ({ request, response }) {
        const transactionSchema = schema.create ({
            reason: schema.string (),
            amount: schema.number (),
            "account_id": schema.number (),
            "direction_in": schema.boolean (),
            userId: schema.number ()
        });
        const payload = await request.validate ({ schema: transactionSchema });
        let user = await User.find (payload.userId);

        if (!user) {
            return response.notFound ();
        }

        let transaction         = new Transaction ();
        transaction.reason      = payload.reason;
        transaction.amount      = payload.amount;
        transaction.directionIn = payload["direction_in"];
        transaction.accountId   = payload["account_id"];
        transaction.userId      = payload.userId;

        try {
            await transaction.save ();
        } catch (e) {
            return response.internalServerError ();
        }

        return transaction;
    }

    public async update ({ request, response }) {
        const transactionSchema = schema.create ({
            id: schema.number(),
            reason: schema.string (),
            amount: schema.number (),
            "account_id": schema.number (),
            "direction_in": schema.boolean ()
        });

        let payload;

        try {
            payload = await request.validate ({ schema: transactionSchema });
        } catch (e) {
            return response.internalServerError (e);
        }

        if (payload.id != request.params().id) {
            return response.badRequest();
        }

        let transaction = await Transaction.find(payload.id);

        if ( !transaction ) {
            return response.notFound();
        }

        transaction.reason = payload.reason;
        transaction.amount = payload.amount;
        transaction.accountId = payload.accountId;
        transaction.directionIn = payload.directionIn;
        transaction.updatedAt = DateTime.now();

        try {
            await transaction.save ();
        } catch (e) {
            return response.internalServerError ();
        }

        return transaction;
    }

    public async destroy ({ request, response }) {
        let id = request.params().id;

        let transaction = await Transaction.find(id);

        if ( !transaction ) {
            return response.notFound();
        }

        try {
            await transaction.delete();
        } catch (e) {
            return response.internalServerError()
        }

        return id;
    }
}
