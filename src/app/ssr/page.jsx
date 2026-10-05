import SeriesList from "@components/SeriesList";
import axios from "axios";

const API_URL_SERIES =
  process.env.API_URL_SERIES ??
  process.env.NEXT_PUBLIC_URL_SERIES ??
  process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;

export default async function GetPage() {
  let series;

  try {
    const resp = await axios.get(`${API_URL_SERIES}?limit=50`, {
      headers: { "x-api-key": API_KEY },
    });

    series = resp.data.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <h2>Busca feita pela servidor, com a api-key privada.</h2>
      <p>
        DevTools - Network: essa chamada nem aparece lá, pois ela acontece no
        servidor.
      </p>
      <p>
        Axios.get direto na API e salva SessionStorage, mas rodando no servidor,
        a api-key nunca chega no navegador.
      </p>
      <SeriesList series={series} />
    </main>
  );
}
