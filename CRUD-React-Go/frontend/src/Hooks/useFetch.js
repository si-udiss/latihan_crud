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

const useFetch = (url) => {
    const [response, setResponse] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if(!res.ok){
                        throw Error('Could not fetch the data...');
                    }
                    return res.json();
                })
                .then(data => {
                    setResponse(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if(err.name === "AbortError"){
                        console.log("Fetch aborted...");
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                });

            return () => abortCont.abort();
        }, 1000);
    }, [url]);

    return { response, isPending, error };
}

export default useFetch;