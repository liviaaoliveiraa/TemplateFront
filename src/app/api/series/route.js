import axios from "axios";
import { NextResponse } from "next/server";

const API_URL_SERIES =
  process.env.API_URL_SERIES ??
  process.env.NEXT_PUBLIC_URL_SERIES ??
  process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY ?? process.env.NEXT_PUBLIC_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const resp = await axios.get(API_URL_SERIES, {
      params: Object.fromEntries(searchParams),
      headers: { "x-api-key": API_KEY },
    });

    return NextResponse.json(resp.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Erro ao buscar as séries" };

    return NextResponse.json(data, { status });
  }
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);

  try {
    const resp = await axios.post(API_URL_SERIES, await req.json(), {
      params: Object.fromEntries(searchParams),
      headers: { "x-api-key": API_KEY },
    });

    return NextResponse.json(resp.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: "Erro ao criar a série" };

    return NextResponse.json(data, { status });
  }
}
