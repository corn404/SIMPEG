const Knex = require("knex");
const tableName = require("../constant/tableName");


/**
 *
 * @param {Knex} knex
 */

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableName.pangkat)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName.pangkat).insert([
        {
          id: 1,
          pangkat: "Juru Muda",
          golongan: "I",
          ruang: "a"
        },
        {
          id: 2,
          pangkat: "Juru Muda Tingkat 1",
          golongan: "I",
          ruang: "b"
        },
        {
          id: 3,
          pangkat: "Juru",
          golongan: "I",
          ruang: "c"
        },
        {
          id: 4,
          pangkat: "Juru Tingkat 1",
          golongan: "I",
          ruang: "d"
        },

        {
          id: 5,
          pangkat: "Pengatur Muda",
          golongan: "II",
          ruang: "a"
        },
        {
          id: 6,
          pangkat: "Pengatur Muda Tingkat 1",
          golongan: "II",
          ruang: "b"
        },
        {
          id: 7,
          pangkat: "Pengatur",
          golongan: "II",
          ruang: "c"
        },
        {
          id: 8,
          pangkat: "Pengatur Tingkat 1",
          golongan: "II",
          ruang: "d"
        },
        {
          id: 9,
          pangkat: "Penata Muda",
          golongan: "III",
          ruang: "a"
        },
        {
          id: 10,
          pangkat: "Penata Muda Tingkat 1",
          golongan: "III",
          ruang: "b"
        },
        {
          id: 11,
          pangkat: "Penata",
          golongan: "III",
          ruang: "c"
        },
        {
          id: 12,
          pangkat: "Penata Tingkat 1",
          golongan: "III",
          ruang: "d"
        },

        {
          id: 13,
          pangkat: "Pembina",
          golongan: "IV",
          ruang: "a"
        },
        {
          id: 14,
          pangkat: "Pembina Tingkat 1",
          golongan: "IV",
          ruang: "b"
        },
        {
          id: 15,
          pangkat: "Pembina Utama Muda",
          golongan: "IV",
          ruang: "c"
        },
        {
          id: 16,
          pangkat: "Pembina Utama Madya",
          golongan: "IV",
          ruang: "d"
        },
        {
          id: 17,
          pangkat: "Pembina Utama",
          golongan: "IV",
          ruang: "e"
        }
      ]);
    });
};
