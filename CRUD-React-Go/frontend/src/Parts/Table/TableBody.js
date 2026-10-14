import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSend from "../../Hooks/useSend";

const TableBody = ({ barangs }) => {
    const [url, setUrl] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const { response, isPending, error } = useSend(url, "DELETE", null);

    useEffect(() => {
        if (!response) return;

        if (response.success) {
            window.location.reload();
        } else {
            setIsSubmit(false);
            console.log(response.message);
            console.log(response.errors);
        }
    }, [response]);

    const handleSubmit = (e, idbarang) => {
        e.preventDefault();
        setIsSubmit(true);
        setUrl("http://localhost:4000/barang/" + idbarang);
    }

    return (
        <tbody>
            {isPending && url && <tr>
                <td colSpan="8">
                    <p className="text-center m-2">Loading...</p>
                </td>
            </tr>}
            {error && url && <tr>
                <td colSpan="8">
                    <p className="text-center m-2">{error}</p>
                </td>
            </tr>}
            {barangs && barangs.length > 0 ? barangs.map((barang) => (
                <tr key={barang.idbarang}>
                    <th scope="row">{barang.idbarang}</th>
                    <td className="nama-produk">{barang.namabarang}</td>
                    <td>{barang.jenisbarang}</td>
                    <td>{barang.stock}</td>
                    <td>{barang.tanggal}</td>
                    <td>{barang.harga}</td>
                    <td>
                        <Link to={`/edit/${barang.idbarang}`} className="btn btn-warning">
                            Ubah
                        </Link>
                    </td>
                    <td>
                        {!isSubmit && <button className="btn btn-danger" onClick={(e) => handleSubmit(e, barang.idbarang)}>Hapus</button>}
                        {isSubmit && <button className="btn btn-danger" disabled>Hapus</button>}
                    </td>
                </tr>
            )) : (
                <tr>
                    <td colSpan="8">
                        <p className="text-center m-2">No matches found.</p>
                    </td>
                </tr>
            )}
        </tbody>
    );
}

export default TableBody;