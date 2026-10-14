package models

type Barang struct {
	Idbarang    int     `json:"idbarang"`
	Namabarang  string  `json:"namabarang" validate:"required"`
	Jenisbarang string  `json:"jenisbarang" validate:"required"`
	Stock       int     `json:"stock" validate:"required"`
	Tanggal     string  `json:"tanggal"`
	Harga       float32 `json:"harga" validate:"required"`
}