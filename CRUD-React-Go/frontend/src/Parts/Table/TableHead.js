const TableHead = () => {
    return (
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nama Barang</th>
                <th scope="col">Jenis Barang</th>
                <th scope="col">Stok</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Harga</th>
                <th
                    scope="col"
                    colSpan={2}
                    className="text-center"
                    style={{ width: "5%" }}
                >
                    Aksi
                </th>
            </tr>
        </thead>
    );
}

export default TableHead;