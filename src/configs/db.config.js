import { Sequelize } from "sequelize";

// dbname, username, password
const db = new Sequelize("", "", "", {
  host: "",
  dialect: "mysql",
});


// Sinkron table pada db dari model

// db.sync({ alter: true })
//   .then(() => {
//     console.log("Tabel berhasil di sinkronisasi");
//   })
//   .catch((error) => {
//     console.error("Terjadi kesalahan:", error);
//   });

export default db;
