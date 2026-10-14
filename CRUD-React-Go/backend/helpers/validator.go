package helpers

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
)

var validate = validator.New()

func ValidateStruct(s interface{}) []fiber.Map {
	var errors []fiber.Map

	err := validate.Struct(s)
	if err != nil {
		for _, e := range err.(validator.ValidationErrors) {
			errors = append(errors, fiber.Map{
				"field":   e.Field(),
				"message": GetValidationMessage(e),
			})
		}
	}

	return errors
}

func GetValidationMessage(e validator.FieldError) string {
	switch e.Tag() {
	case "required":
		return e.Field() + " tidak boleh kosong"
	case "min":
		return e.Field() + " minimal " + e.Param()
	case "max":
		return e.Field() + " maksimal " + e.Param()
	default:
		return e.Field() + " tidak valid"
	}
}