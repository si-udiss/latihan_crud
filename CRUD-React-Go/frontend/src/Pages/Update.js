import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";
import useSend from "../Hooks/useSend";

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [namabarang, setNamaBarang] = useState('');
    const [jenisbarang, setJenisBarang] = useState('');
    const [stock, setStock] = useState(0);
    const [harga, setHarga] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [payload, setPayload] = useState(false);
    const { response, isPending, error } = useFetch('http://localhost:4000/barang/' + id);
    const { response: responsePut, isPending: isPendingPut, error: errorPut } = useSend("http://localhost:4000/barang/" + id, "PUT", payload);

    const data = response?.data;

    useEffect(() => {
        if (!response) return;

        if (response.success) {
            setNamaBarang(data.namabarang);
            setJenisBarang(data.jenisbarang);
            setStock(data.stock);
            setHarga(data.harga);
        }
    }, [response, data]);

    useEffect(() => {
        if (!responsePut) return;

        if (responsePut.success) {
            navigate('/');
        } else {
            setIsSubmit(false);
            console.log(responsePut.message);
            console.log(responsePut.errors);
        }
    }, [responsePut, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);

        setPayload({ namabarang, jenisbarang, stock: Number(stock), harga: Number(harga) });
    }

    return (
        <div className="container py-4">
            <h1 className="text-center">UBAH BARANG</h1>
            <hr />
            <div className="d-flex mt-4">
                <Link to="/" className="btn btn-dark">
                    Kembali
                </Link>
            </div>
            {isPending && <p className="text-center m-2">Loading...</p>}
            {error && <p className="text-center m-2">{error}</p>}
            {data && <form>
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
                        />
                    </div>
                </div>
                <div className="d-flex mt-2">
                    {!isSubmit && <button className="btn btn-warning ms-auto" onClick={handleSubmit}>Simpan</button>}
                    {isSubmit && <button className="btn btn-warning ms-auto" disabled>Menyimpan...</button>}
                </div>
            </form>}
        </div>

    )
}

export default Update;