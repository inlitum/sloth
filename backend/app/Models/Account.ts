import { DateTime }                                                            from 'luxon';
import { BaseModel, column, HasMany, hasMany, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { HasOne }                                                              from '@adonisjs/lucid/build/src/Factory/Relations/HasOne';
import User                                                                    from 'App/Models/User';
import Transaction                                                             from 'App/Models/Transaction';

export default class Account extends BaseModel {
    @column ({ isPrimary: true })
    public id: number;

    @column ()
    public name: string;

    @column ()
    public currentAmount: number;

    @column ()
    public creatorId: number;

    @hasOne (() => User)
    // @ts-ignore
    public creator: HasOne<typeof User>;

    @manyToMany(() => User, {
        pivotTable: 'user_accounts'
    })
    public users: ManyToMany<typeof User>;

    @hasMany(() => Transaction)
    public transactions: HasMany<typeof Transaction>;

    @column.dateTime ({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime ({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}
