package main

import (
	"log"

	"github.com/gofiber/fiber/v3/middleware/cors"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v3"

	"backend/db"
	"backend/router"
)

func main() {
	app := fiber.New()

	db := db.Conn()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

	router.BarangRouter(app, db)

	defer db.Close()
	log.Fatal(app.Listen(":4000"))
}
