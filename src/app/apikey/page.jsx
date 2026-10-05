"use client";

import { Skeleton } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL_SERIES =
  process.env.NEXT_PUBLIC_URL_SERIES ??
  process.env.API_URL_SERIES ??
  process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? process.env.API_KEY;

export default function ApiKeyPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resp = await axios.get(`${API_URL_SERIES}?limit=50`, {
          headers: { "x-api-key": API_KEY },
        });

        toast.success("Séries carregadas !", { id: "getApiKey" });
        setSeries(resp.data.data);
      } catch {
        toast.error("Erro ao buscar as séries.", { id: "getApiKey" });
      } finally {
        setLoading(false);
      }
    }

    buscarSeries();
  }, []);

  return (
    <main>
      <h2>Veja api-key ficando exposta no header desta chamada</h2>
      <p>DevTools - Network - Header - series</p>
      <p>Axios.get direto na API, com api-key exposta no navegador</p>
      {loading ? (
        <div className="skeleton">
          <Skeleton />
        </div>
      ) : (
        <ul>
          {series.map((item) => (
            <li key={item.id}>
              {item.name ?? item.title ?? JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
