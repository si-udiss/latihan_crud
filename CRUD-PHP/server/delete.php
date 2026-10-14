<?php

require_once 'db/conn.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $idbarang = $_POST['idbarang'];

    $query = "DELETE FROM barang WHERE idbarang = '$idbarang'";
    $result = mysqli_query($conn, $query);

    if($result){
        echo "<script>alert('Barang Berhasil Dihapus!'); window.location.href='/Latihan%20PHP/crud/public/index.php';</script>";
    } else {
        echo "<script>alert('Barang Gagal Dihapus!'); window.location.back();</script>";
    }
}