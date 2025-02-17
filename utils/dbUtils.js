import db from '../db.js';

/**
 * Vérifie si une entrée existe dans une table donnée pour un champ spécifique.
 * @param {string} table - Nom de la table (users, patients, doctors, etc.).
 * @param {string} field - Champ à vérifier (email, phone).
 * @param {any} value - Valeur à rechercher.
 * @returns {Promise<boolean>} - True si l'entrée existe, False sinon.
 */

export const checkExistence = async (table, column, value) => {
    try {
        const query = `SELECT EXISTS(SELECT 1 FROM ${table} WHERE ${column} = $1) AS exists`;
        const result = await db.query(query, [value]);
        return result.rows[0].exists;
    } catch (err) {
        console.error(`Error checking existence in ${table}:`, err);
        throw err;
    }
};
