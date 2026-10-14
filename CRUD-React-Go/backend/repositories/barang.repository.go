package repositories

import (
	"backend/models"
	"database/sql"
)

func GetAllUsers(db *sql.DB) (*[]models.Barang, error) {
	var barangs []models.Barang

	results, err := db.Query("SELECT * FROM barang")
	if err != nil {
		return nil, err
	}

	for results.Next() {
		var barang models.Barang

		err = results.Scan(&barang.Idbarang, &barang.Namabarang, &barang.Jenisbarang, &barang.Stock, &barang.Tanggal, &barang.Harga)
		if err != nil {
			return nil, err
		}
		defer results.Close()

		barangs = append(barangs, barang)
	}

	return &barangs, nil
}

func GetUserById(db *sql.DB, id string) (*models.Barang, error) {
	var barang models.Barang

	err := db.QueryRow("SELECT * FROM barang WHERE Idbarang = ? LIMIT 1", id).Scan(&barang.Idbarang, &barang.Namabarang, &barang.Jenisbarang, &barang.Stock, &barang.Tanggal, &barang.Harga)
	if err != nil {
		return nil, err
	}

	return &barang, nil
}

func CreateUser(db *sql.DB, barang *models.Barang) error {
	_, err := db.Exec("INSERT INTO barang (Namabarang, Jenisbarang, Stock, Harga, Tanggal) VALUES (?, ?, ?, ?, NOW())", barang.Namabarang, barang.Jenisbarang, barang.Stock, barang.Harga)
	return err
}

func UpdateUser(db *sql.DB, id string, barang *models.Barang) error {
	_, err := db.Exec("UPDATE barang SET Namabarang = ?, Jenisbarang = ?, Stock = ?, Harga = ? WHERE Idbarang = ?", barang.Namabarang, barang.Jenisbarang, barang.Stock, barang.Harga, id)
	return err
}

func DeleteUser(db *sql.DB, id string) error {
	_, err := db.Exec("DELETE FROM barang WHERE Idbarang = ?", id)
	return err
}
