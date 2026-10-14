<?php

require_once 'db/conn.php';

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $query = "SELECT * FROM barang";

    $result = mysqli_query($conn, $query);
}