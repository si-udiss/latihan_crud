import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSend from "../Hooks/useSend";

const Create = () => {
    const [namabarang, setNamaBarang] = useState('');
    const [jenisbarang, setJenisBarang] = useState('');
    const [stock, setStock] = useState(0);
    const [harga, setHarga] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [payload, setPayload] = useState(false);
    const navigate = useNavigate();
    const { response, isPending, error } = useSend("http://localhost:4000/barang", "POST", payload);

    useEffect(() => {
        if (!response) return;

        if (response.success) {
            navigate('/');
        } else {
            setIsSubmit(false);
            console.log(response.message);
            console.log(response.errors);
        }
    }, [response, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);

        setPayload({ namabarang, jenisbarang, stock: Number(stock), harga: Number(harga) });
    }

    return (
        <div className="container py-4">
            <h1 className="text-center">TAMBAH BARANG</h1>
            <hr />
            <div className="d-flex mt-4">
                <Link to="/" className="btn btn-dark">
                    Kembali
                </Link>
            </div>
            <form>
                <div className="row mt-4">
                    <div className="mb-3 col-6">
                        <label htmlFor="namabarang" className="form-label">
                            Nama Barang
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={namabarang}
                            onChange={(e) => setNamaBarang(e.target.value)}
                            placeholder="Nama barang..."
                        />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="jenisbarang" className="form-label">
                            Jenis Barang
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={jenisbarang}
                            onChange={(e) => setJenisBarang(e.target.value)}
                            placeholder="Jenis barang..."
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="mb-3 col-6">
                        <label htmlFor="stok" className="form-label">
                            Stok
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Stok..."
                        />
                    </div>
                    <div className="mb-3 col-6">
                        <label htmlFor="harga" className="form-label">
                            Harga
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                            placeholder="Harga..."
                        />
                    </div>
                </div>
                <div className="d-flex mt-2">
                    {!isSubmit && <button className="btn btn-primary ms-auto" onClick={handleSubmit}>Simpan</button>}
                    {isSubmit && <button className="btn btn-primary ms-auto" disabled>Menyimpan...</button>}
                </div>
            </form>
        </div>
    )
}

export default Create;