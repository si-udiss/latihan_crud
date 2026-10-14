<?php

require_once 'db/conn.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $namabarang = mysqli_escape_string($conn, $_POST['namabarang']);
    $jenisbarang = mysqli_escape_string($conn, $_POST['jenisbarang']);
    $stock = $_POST['stock'];
    $harga = $_POST['harga'];

    $query = "INSERT INTO barang (namabarang, jenisbarang, stock, harga, tanggal) VALUES ('$namabarang', '$jenisbarang', '$stock', '$harga', NOW())";
    $result = mysqli_query($conn, $query);

    if($result){
        echo "<script>alert('Barang Berhasil Disimpan!'); window.location.href='/Latihan%20PHP/crud/public/index.php';</script>";
    } else {
        echo "<script>alert('Barang Gagal Disimpan!'); window.location.back();</script>";
    }
}