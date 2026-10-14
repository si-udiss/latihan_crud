<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRUD USERS || MYSQL</title>
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
        <h1 class="text-center">CRUD USERS</h1>
        <hr>
        <div class="d-flex mt-4">
            <a href="{{ route('users.create') }}" class="btn btn-success">Tambah Users</a>
            <div class="d-flex ms-auto">
                <input type="text" class="form-control me-2" id="cariUsers" placeholder="Cari user...">
            </div>
        </div>

        <table class="table mt-5" id="tabelUsers">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col" colspan="2" class="text-center" style="width: 5%;">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($result as $i => $row)
                    <tr>
                        <th scope="row">{{ $i + 1 }}</th>
                        <td class="nama-user">{{ $row->name }}</td>
                        <td>{{ $row->email }}</td>
                        <td>{{ $row->phone_number }}</td>
                        <td>
                            <a href="{{ route('users.edit', $row->id) }}" class="btn btn-warning">Ubah</a>
                        </td>
                        <td>
                            <form action="{{ route('users.destroy', $row->id) }}" method="post">
                                @method('delete')
                                @csrf
                                <button class="btn btn-danger" type="submit">Hapus</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous">
    </script>

    <script>
        document.getElementById("cariUsers").addEventListener("keyup", function() {
            const keyword = this.value.toLowerCase();
            const rows = document.querySelectorAll("#tabelUsers tbody tr");

            rows.forEach(function(row) {
                const namaUser = row.querySelector(".nama-user").textContent.toLowerCase();
                row.style.display = namaUser.includes(keyword) ? "" : "none";
            });
        });
    </script>
</body>

</html>
