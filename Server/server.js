const express = require('express')
const sqlite3 = require('sqlite3').verbose();

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = 5000
const db = new sqlite3.Database("data.db")

const getQueryWithParams = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (_, row) => {
      if (!row) {
        reject("No record found!")
      } else {
        resolve(row)
      }
    })
  })
}

const runQueryWithParams = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (_, row) => {
      if (_ !== null) {
        reject("Query failed!")
      } else {
        resolve(row)
      }
    })
  })
}

const getStatus = (str) => {
  return {
    status: str
  }
}

db.run("CREATE TABLE IF NOT EXISTS COURSE_COMPONENTS (COURSE TEXT, COMPONENTS TEXT)")

app.post("/course", (req, res) => {
  getQueryWithParams("SELECT * FROM COURSE_COMPONENTS WHERE COURSE = ?", [req.body.course])
    .then(_ => {
      runQueryWithParams("UPDATE COURSE_COMPONENTS SET COMPONENTS = ? WHERE COURSE = ?", [JSON.stringify(req.body.data), req.body.course])
        .then(_ => res
          .status(200)
          .json(getStatus("Updated!")))
        .catch(_ => res
          .status(404)
          .json(getStatus("Update failed!")))
    })
    .catch(_ => {
      runQueryWithParams("INSERT INTO COURSE_COMPONENTS VALUES (?, ?)", [req.body.course, JSON.stringify(req.body.data)])
        .then(_ => res
          .status(200)
          .json(getStatus("Updated!")))
        .catch(_ => res
          .status(404)
          .json(getStatus("Insert failed!")))
    })
})

app.get("/course", (req, res) => {
  getQueryWithParams("SELECT COMPONENTS FROM COURSE_COMPONENTS WHERE COURSE = ?", [req.query.course])
    .then(data => res
      .status(200)
      .json({
        components: data.COMPONENTS
      }))
    .catch(_ => res
      .status(404)
      .json(getStatus("Not found!")))
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
