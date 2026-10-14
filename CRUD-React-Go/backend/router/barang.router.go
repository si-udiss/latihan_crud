package router

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v3"

	"backend/helpers"
	"backend/models"
	"backend/repositories"
)

func BarangRouter(app *fiber.App, db *sql.DB) {
	barang := app.Group("/barang")

	barang.Get("/", func(c fiber.Ctx) error {
		barangs, nil := repositories.GetAllUsers(db)

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": true,
			"message": nil,
			"errors":  nil,
			"data":    barangs,
		})
	})

	barang.Get("/:id", func(c fiber.Ctx) error {
		barang, err := repositories.GetUserById(db, c.Params("id"))
		if err != nil {
			if err == sql.ErrNoRows {
				return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
					"success": false,
					"message": "barang tidak ditemukan.",
					"errors":  nil,
					"data":    nil,
				})
			}
			return err
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": true,
			"message": nil,
			"errors":  nil,
			"data":    barang,
		})
	})

	barang.Post("/", func(c fiber.Ctx) error {
		barang := new(models.Barang)

		if err := c.Bind().Body(barang); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"message": "Format request tidak valid",
				"errors":  err.Error(),
				"data":    nil,
			})
		}

		if errors := helpers.ValidateStruct(barang); len(errors) > 0 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"message": "Validasi gagal",
				"errors":  errors,
				"data":    nil,
			})
		}

		repositories.CreateUser(db, barang)

		Message := "barang berhasil disimpan"

		return c.Status(fiber.StatusCreated).JSON(fiber.Map{
			"success": true,
			"message": Message,
			"errors":  nil,
			"data":    barang,
		})
	})

	barang.Put("/:id", func(c fiber.Ctx) error {
		barang := new(models.Barang)

		if err := c.Bind().Body(barang); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"message": "Format request tidak valid",
				"errors":  err.Error(),
				"data":    nil,
			})
		}

		if errors := helpers.ValidateStruct(barang); len(errors) > 0 {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"success": false,
				"message": "Validasi gagal",
				"errors":  errors,
				"data":    nil,
			})
		}

		repositories.UpdateUser(db, c.Params("id"), barang)

		Message := "barang berhasil diubah"

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": true,
			"message": Message,
			"errors":  nil,
			"data":    barang,
		})
	})

	barang.Delete("/:id", func(c fiber.Ctx) error {
		repositories.DeleteUser(db, c.Params("id"))

		Message := "barang berhasil dihapus"

		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": true,
			"message": Message,
			"errors":  nil,
			"data":    nil,
		})
	})
}
