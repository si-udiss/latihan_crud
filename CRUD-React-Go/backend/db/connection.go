package db

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Conn() *sql.DB {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_login_android")

	if err != nil {
		panic(err.Error())
	}

	return db
}