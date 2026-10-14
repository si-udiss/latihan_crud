import { useEffect, useState } from "react";

/*

RESPONSE

{
    "message": "Hello World",
    "success": true,
    "errors": null,
    "data": [{
        "idbarang": 1,
        "namabarang": "Satu",
        "jenisbarang": "Minuman",
        "stock": 3,
        "tanggal": "2026-02-02",
        "harga": 3000,
    }]
}

*/

const useSend = (url, method, payload) => {
    const [response, setResponse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const sendData = async () => {
                try {
                    setIsPending(true);

                    const res = await fetch(url, {
                        method,
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });

                    const data = await res.json();

                    setResponse(data);

                    if (!res.ok) {
                        setError(data.message);
                    } else {
                        setError(null);
                    }
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsPending(false);
                }
            };

            if (payload || (method === "DELETE" && url)) {
                sendData();
            }
        }, 1000);
    }, [url, method, payload]);

    return { response, isPending, error };
}

export default useSend;