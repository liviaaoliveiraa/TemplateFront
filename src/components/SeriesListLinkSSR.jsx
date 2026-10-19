import axios from "axios";
import Link from "next/link";
import { Card } from "antd";

export default async function Series() {
  let series = [];

  try {
    const response = await axios.get(`${process.env.API_URL_SERIES}?limit=50`, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    series = response.data.data;
  } catch (error) {
    console.error("Erro ao buscar séries:", error);
  }

  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 360px))",
        gap: 16,
        listStyle: "none",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {series.map((item) => (
        <li key={item.id} style={{ minWidth: 0 }}>
          <Card size="small" title={<Link href={`/read/${item.id}`}>{item.title}</Link>}>
            <p>Gênero: {item.genero}</p>
            <p>Plataforma: {item.plataforma}</p>
            <p>Temporadas: {item.numero_temporadas}</p>
            <p>Ano de lançamento: {item.ano_lancamento}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}