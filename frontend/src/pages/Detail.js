import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem(`analysis-${id}`);
        if (stored) {
            setData(JSON.parse(stored));
        } else {
            navigate("/");
        }
    }, [id, navigate]);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="detail-container">
            <h2>Analysis Detail</h2>
            <p><strong>URL:</strong> {data.url}</p>
            <p><strong>Page Count:</strong> {data.pageCount}</p>

            <h3>Technologies:</h3>
            <ul>
                {data.technologies?.map((tech, index) => (
                    <li key={index}>{tech}</li>
                ))}
            </ul>
        </div>
    );
}

export default Detail;
