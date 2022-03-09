import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserAccounts extends BaseSchema {
    protected tableName = 'user_accounts';

    public async up () {
        this.schema.createTable (this.tableName, (table) => {
            table.increments ('id');
            table.integer ('user_id').unsigned ().references ('users.id');
            table.integer ('account_id').unsigned ().references ('accounts.id');
            table.unique (['user_id', 'account_id']);
            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp ('created_at', { useTz: true });
            table.timestamp ('updated_at', { useTz: true });
        });
    }

    public async down () {
        this.schema.dropTable (this.tableName);
    }
}
