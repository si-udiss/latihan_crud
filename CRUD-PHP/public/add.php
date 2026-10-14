<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TAMBAH BARANG || MYSQL</title>
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
        <h1 class="text-center">TAMBAH BARANG</h1>
        <hr>
        <div class="d-flex mt-4">
            <a href="index.php" class="btn btn-dark">Kembali</a>
        </div>

        <form action="/Latihan%20PHP/crud/server/add.php" method="post">

            <div class="row mt-4">
                <div class="mb-3 col-6">
                    <label for="namabarang" class="form-label">Nama Barang</label>
                    <input type="text" class="form-control" id="namabarang" name="namabarang"
                        placeholder="Nama barang...">
                </div>
                <div class="mb-3 col-6">
                    <label for="jenisbarang" class="form-label">Jenis Barang</label>
                    <input type="text" class="form-control" id="jenisbarang" name="jenisbarang"
                        placeholder="Jenis barang...">
                </div>
            </div>

            <div class="row mt-2">
                <div class="mb-3 col-6">
                    <label for="stok" class="form-label">Stok</label>
                    <input type="number" class="form-control" id="stok" name="stock" placeholder="Stok...">
                </div>
                <div class="mb-3 col-6">
                    <label for="harga" class="form-label">Harga</label>
                    <input type="number" class="form-control" id="harga" name="harga" placeholder="Harga...">
                </div>
            </div>

            <div class="d-flex mt-2">
                <button class="btn btn-primary ms-auto" type="submit">Simpan</button>
            </div>

        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
</body>

</html>