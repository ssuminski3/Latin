"use server"

import { pool } from "./db"
import { Contestant } from "./definitions";

export async function getAllWordsRandom(){
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM words_to_learn ORDER BY RANDOM();');
        //console.log(rows)
        return rows;
    } 
    catch(e){
        console.log(e)
    }finally {
        client.release();
    }
}

export async function getFillerWords(word: string) {
    const client = await pool.connect();
    const letter = word[0];
    try {
        const { rows } = await client.query(`WITH selected_words AS (SELECT latin FROM words_to_learn WHERE latin LIKE '${letter}%' AND latin NOT LIKE '${word}' ORDER BY RANDOM() LIMIT 5), extra_words AS (SELECT latin FROM words_to_learn WHERE latin NOT ILIKE '${letter}%' ORDER BY RANDOM() LIMIT GREATEST(0, 4 - (SELECT COUNT(*) FROM selected_words))) SELECT latin FROM selected_words UNION ALL SELECT latin FROM extra_words`)
        return rows;
    } finally {
        client.release();
    }
}

export async function getWordsForCompetition() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM words_to_learn ORDER BY RANDOM() LIMIT 10;');
        return rows;
    } finally {
        client.release();
    }
}

export async function getWord() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM words_to_learn ORDER BY RANDOM() LIMIT 1;');
        console.log(rows)
        return rows[0];
    } finally {
        client.release();
    }
}

export async function getRanking() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM ranking ORDER BY score DESC LIMIT 10;');
        console.log(rows)
        return rows;
    } 
    catch(e){
        console.log(e)
    }finally {
        client.release();
    }
}

export async function insertNewRanking(contestant: Contestant) {
    const client = await pool.connect();
    try {
        // Start a transaction
        await client.query('BEGIN');

        // First, check if we have less than 10 records
        const countResult = await client.query('SELECT COUNT(*) FROM ranking');
        const currentCount = parseInt(countResult.rows[0].count);

        if (currentCount < 10) {
            console.log("WTF1")
            await client.query(
                'INSERT INTO ranking (name, score) VALUES ($1, $2)',
                [contestant.name, contestant.score]
            );
        } else {
            const minScoreResult = await client.query('SELECT MIN(score) FROM ranking');
            const minScore = minScoreResult.rows[0].min;
            console.log("WTF2")
            if (contestant.score > minScore) {
                await client.query(`
                    WITH lowest_score AS (
                        SELECT id 
                        FROM ranking 
                        WHERE score = (SELECT MIN(score) FROM ranking)
                        LIMIT 1
                        FOR UPDATE  -- Lock the row we're going to delete
                    )
                    DELETE FROM ranking 
                    WHERE id = (SELECT id FROM lowest_score)
                `);

                await client.query(
                    'INSERT INTO ranking (name, score) VALUES ($1, $2)',
                    [contestant.name, contestant.score]
                );
            }
        }        

        const { rows } = await client.query(`
            SELECT name, score, 
                   RANK() OVER (ORDER BY score DESC) as rank
            FROM ranking 
            ORDER BY score DESC
            LIMIT 10
        `);
        
        // Commit the transaction
        await client.query('COMMIT');
        
        return rows;
    } catch (error) {
        // Rollback in case of error
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}