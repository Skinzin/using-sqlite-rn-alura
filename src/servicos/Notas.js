import { db } from "./SQLite"

export function criaTabela() {
  db.transaction((transaction) => { // Fazendo uma transação que tem uma CallBack
    transaction.executeSql("CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);") // O que irá executar em SQLite
  })
}

export async function adicionaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);", [nota.titulo, nota.categoria, nota.texto], () => {
        resolve("Nota adicionada com sucesso!") // Ele irá esperar e executar essa função de Resolve.
      })
    })
  })
}

export async function atualizaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [nota.titulo, nota.categoria, nota.texto, nota.id], () => {
        resolve("Nota atualizada com sucesso!")
      })
    })
  })
}

export async function removeNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [nota.id], () => {
        resolve("Nota removida com sucesso!")
      })
    })
  })
}

export async function buscaNotas() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) => { // Transaction não é usada, porém é declarada para utilizar os Results.
        resolve(resultado.rows._array) // Devolve todas as entradas.
      })
    })
  })
}

export async function filtraPorCategoria(categoria) {
  return new Promise((resolve) => {
      db.transaction((tx) => {
          tx.executeSql("SELECT * FROM Notas WHERE categoria = ?;", [categoria], (tx, results) => {
              resolve(results.rows._array)
          })
      })
  })
}
