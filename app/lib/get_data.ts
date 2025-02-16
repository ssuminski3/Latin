"use server"

import { pool } from "./db"

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