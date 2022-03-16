import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Transactions extends BaseSchema {
    protected tableName = 'transactions';

    public async up () {
        this.schema.createTable (this.tableName, (table) => {
            table.increments ('id');
            table.integer ('user_id').unsigned().references('users.id').onDelete('CASCADE').primary();

            table.string ('reason');
            table.float ('amount');
            table.boolean ('direction_in');
            table.integer ('account_id').unsigned().references('accounts.id');

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp ('created_at', { useTz: true });
            table.timestamp ('updated_at', { useTz: true });
            table.unique(['id', 'user_id'])
        });
    }

    public async down () {
        this.schema.dropTable (this.tableName);
    }
}
