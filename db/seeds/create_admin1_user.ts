import { Knex } from "knex";
import bcrypt from 'bcryptjs'


async function hashPassword(password: string) {
    return bcrypt.hash(password, 10)
}

export async function seed(knex: Knex): Promise<void> {
    // Check if the admin1 user already exists
    const users = await knex("users").where({ email: 'admin1@example.com' });

    if (users.length === 0) {
        console.log("Seeding admin user...");

        // Hash the password
        const pass = await hashPassword('admin1password');

        // Insert seed entries
        await knex("users").insert([
            {
                full_name: 'Admin 1',
                email: 'admin1@example.com',
                password: pass,
                role: 'admin',
            }
        ]);
        console.log("Admin user seeded successfully.");
    } else {
        console.log("Users table already has entries. Skipping seeding.");
    }
}
