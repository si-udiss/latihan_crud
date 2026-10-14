import { Link } from "react-router-dom";
import Table from "../Parts/Table/Table";
import useFetch from "../Hooks/useFetch";
import { useState } from "react";

const Home = () => {
    const { response, isPending, error } = useFetch('http://localhost:4000/barang');
    const [keyword, setKeyword] = useState('');

    const filteredData =
        response?.data.filter((item) =>
            item.namabarang
                .toLowerCase()
                .includes(keyword.toLowerCase())
        ) || [];

    return (
        <div className="container py-4">
            <h1 className="text-center">CRUD BARANG</h1>
            <hr />
            <div className="d-flex mt-4">
                <Link to="/create" className="btn btn-success">
                    Tambah Barang
                </Link>
                <div className="d-flex ms-auto">
                    <input
                        type="text"
                        className="form-control me-2"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Cari produk..."
                    />
                </div>
            </div>
            {isPending && <p className="text-center m-2">Loading...</p>}
            {error && <p className="text-center m-2">{error}</p>}
            {filteredData && <Table barangs={filteredData} />}
        </div>
    )
}

export default Home;