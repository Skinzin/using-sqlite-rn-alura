import * as SQLite from "expo-sqlite"

function abreConexao() {
  const database = SQLite.openDatabase("db.db") // Aqui é o nome do Banco de Dados.
  return database
}

export const db = abreConexao()
