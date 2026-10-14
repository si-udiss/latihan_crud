<?php

require_once 'db/conn.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $idbarang = $_POST['idbarang'];
    $namabarang = mysqli_escape_string($conn, $_POST['namabarang']);
    $jenisbarang = mysqli_escape_string($conn, $_POST['jenisbarang']);
    $stock = $_POST['stock'];
    $harga = $_POST['harga'];

    $query = "UPDATE barang SET namabarang = '$namabarang', jenisbarang = '$jenisbarang', stock = '$stock', harga = '$harga' WHERE idbarang = $idbarang";
    $result = mysqli_query($conn, $query);

    if($result){
        echo "<script>alert('Barang Berhasil Diubah!'); window.location.href='/Latihan%20PHP/crud/public/index.php';</script>";
    } else {
        echo "<script>alert('Barang Gagal Diubah!'); window.location.back();</script>";
    }
}