<?php

$conn = mysqli_connect("localhost", "root", "", "db_login_android", "3307");

if (!$conn) {
    die("<h3>Error: " . mysqli_connect_error() . "</h3>");
}