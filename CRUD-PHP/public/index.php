<?php

require_once '../server/select.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD BARANG || MYSQL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    <style>
        .container {
            width: 1200px;
        }
    </style>
</head>

<body>
    <div class="container py-4">
        <h1 class="text-center">CRUD BARANG</h1>
        <hr>
        <div class="d-flex mt-4">
            <a href="add.php" class="btn btn-success">Tambah Barang</a>
            <div class="d-flex ms-auto">
                <input type="text" class="form-control me-2" id="cariProduk" placeholder="Cari produk...">
            </div>
        </div>

        <table class="table mt-5" id="tabelProduk">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Jenis Barang</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Harga</th>
                    <th scope="col" colspan="2" class="text-center" style="width: 5%;">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($result as $row): ?>
                    <tr>
                        <th scope="row"><?= $row['idbarang'] ?></th>
                        <td class="nama-produk"><?= $row['namabarang'] ?></td>
                        <td><?= $row['jenisbarang'] ?></td>
                        <td><?= $row['stock'] ?></td>
                        <td><?= $row['tanggal'] ?></td>
                        <td><?= $row['harga'] ?></td>
                        <td>
                            <a href="edit.php?idbarang=<?= $row['idbarang'] ?>" class="btn btn-warning">Ubah</a>
                        </td>
                        <td>
                            <form action="/Latihan%20PHP/crud/server/delete.php" method="post">
                                <input type="hidden" name="idbarang" value="<?= $row['idbarang'] ?>">
                                <button class="btn btn-danger" type="submit">Hapus</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>

    <script>
        document.getElementById("cariProduk").addEventListener("keyup", function () {
            const keyword = this.value.toLowerCase();
            const rows = document.querySelectorAll("#tabelProduk tbody tr");

            rows.forEach(function (row) {
                const namaProduk = row.querySelector(".nama-produk").textContent.toLowerCase();
                row.style.display = namaProduk.includes(keyword) ? "" : "none";
            });
        });
    </script>
</body>

</html>