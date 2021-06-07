const Knex = require("knex");
const tableName = require("../constant/tableName");
/**
 *
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  await knex.schema
    .createTable(tableName.pegawai, (table) => {
      table.increments("id").notNullable().primary();
      table.string("nidn", 100).nullable();
      table.string("nama", 150).notNullable();
      table.string("tempat_lahir", 150).nullable();
      table.date("tgl_lahir").nullable();
      table.enum("kelamin", ["L", "P"]).notNullable();
      table.string("pendidikan", 100).nullable();
      table
        .integer("jenis_pegawai")
        .notNullable()
        .comment("1=pegaiwai biasa, 2=dosen");
      table.integer("id_jabatan").notNullable();
      table.string("no_hp", 20).nullable();
      table.text("sertifikasi").nullable();
      table.text("riwayat_hidup").nullable();
      table.integer("status").defaultTo(1).unsigned().notNullable();
    })
    .createTable(tableName.users, (table) => {
      table.increments("id").primary().unique().notNullable();
      table.string("username", 100).notNullable();
      table.text("password").notNullable();
      table.enum("role", ["admin", "user"]).notNullable();
      table
        .integer("status")
        .defaultTo(1)
        .unsigned()
        .notNullable()
        .comment("1=active, 0=blokir");
      table.integer("id_pegawai").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable(tableName.absensi, (table) => {
      table.increments("id").primary().unique().notNullable();
      table.integer("id_pegawai").notNullable();
      table.integer("masuk").notNullable().defaultTo(0);
      table.integer("pulang").notNullable().defaultTo(0);
      table.timestamp("tgl_absen").defaultTo(knex.fn.now());
      table
        .integer("status")
        .defaultTo(1)
        .notNullable()
        .comment("1=hadir, 2=tidak hadir, 3=libur");
    })
    .createTable(tableName.jabatan, (table) => {
      table.increments("id").primary().unique().notNullable();
      table.string("jabatan").notNullable();
    });
  // .createTable(tableName.setting, (table) => {
  //   table.increments("id").primary().unique().notNullable();
  //   table.string("buka").notNullable();
  //   table.string("masuk").notNullable();
  //   table.string("pulang").notNullable();
  // })
};

/**
 *
 * @param {Knex} knex
 */

exports.down = async (knex) => {
  await knex.schema
    .dropTable(tableName.users)
    .dropTable(tableName.pegawai)
    .dropTable(tableName.jabatan)
    .dropTable(tableName.absensi);
  // .dropTable(tableName.berkas);
};
