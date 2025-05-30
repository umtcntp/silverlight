import React, { useState, useEffect } from 'react'
import '../styles/Home.css'

function Home() {

    const [url, setUrl] = useState("")
    const [analyses, setAnalyses] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = analyses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(analyses.length / itemsPerPage);

    useEffect(() => {
        const saved = [];
        for (let key in localStorage) {
            if (key.startsWith("analysis-")) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    saved.push({
                        id: key.split("analysis-")[1],
                        url: item.url,
                        status: "done"
                    });
                } catch (e) {
                    console.error("Veri çözümlemesi başarısız:", key);
                }
            }
        }
        setAnalyses(saved);
    }, []);

    const handleAnalyse = async () => {
        if (!isValidURL(url)) return;

        const id = Date.now();
        const newAnalysis = {
            id,
            url,
            status: "analysing",
        };
        setAnalyses(prev => [...prev, newAnalysis]);
        setUrl("");

        try {
            const res = await fetch("http://localhost:5001/analyse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url })
            });

            const data = await res.json();

            localStorage.setItem(`analysis-${id}`, JSON.stringify({
                ...data,
                url,
            }));

            setAnalyses(prev => prev.map(a =>
                a.id === id ? { ...a, status: "done" } : a
            ));
        } catch (err) {
            setAnalyses(prev => prev.map(a =>
                a.id === id ? { ...a, status: "error", error: err.message } : a
            ));
        }
    }


    const isValidURL = (url) => {
        const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
        return pattern.test(url);
    }

    return (
        <div className='home-container'>
            <div className='form-container'>
                <h2 className='home-title'>Silverlight - Website Analyser</h2>
                <input type='text' placeholder='URL want to be checked' value={url} onChange={(e) => setUrl(e.target.value)} className='form-input form-element' />
                <button onClick={handleAnalyse} disabled={!isValidURL(url)} className='form-button form-element'>Analyse</button>
            </div>
            <div className='analyses-list'>
                <h2>Analysing Targets</h2>
                {
                    currentItems.map((item) => (
                        <div key={item.id} className='analyses-item'>
                            <p className='analyses-item-element'>{item.url}</p>
                            {item.status === "analysing" && (
                                <p className='analyses-item-element'>Analysing...</p>
                            )}

                            {item.status === "done" && (
                                <a href={`/details/${item.id}`} className='analyses-item-element'>
                                    View More
                                </a>
                            )}

                            {item.status === "error" && (
                                <p className='analyses-item-element text-red'>
                                    Error: {item.error}
                                </p>
                            )}
                        </div>
                    ))
                }
                <div className='pagination-buttons'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            disabled={page === currentPage}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>



    )
}

export default Home;