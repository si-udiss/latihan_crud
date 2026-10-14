import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ barangs }) => {
    return (
        <table className="table mt-5" id="tabelProduk">
            <TableHead />
            <TableBody barangs={barangs} />
        </table>
    );
}

export default Table;