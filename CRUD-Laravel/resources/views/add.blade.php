<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TAMBAH USER || MYSQL</title>
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
        <h1 class="text-center">TAMBAH USER</h1>
        <hr>
        <div class="d-flex mt-4">
            <a href="/" class="btn btn-dark">Kembali</a>
        </div>

        <form action="{{ route('users.store') }}" method="post">
            @csrf

            <div class="row mt-4">
                <div class="mb-3 col-6">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name"
                        placeholder="name...">
                </div>
                <div class="mb-3 col-6">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email"
                        placeholder="email...">
                </div>
            </div>

            <div class="row mt-2">
                <div class="mb-3 col-6">
                    <label for="phone_number" class="form-label">Nomor Telepon</label>
                    <input type="number" class="form-control" id="phone_number" name="phone_number" placeholder="nomor telepon...">
                </div>
                <div class="mb-3 col-6">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" placeholder="password...">
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
