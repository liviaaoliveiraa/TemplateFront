import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;

    try {
        const response = await axios.get(`${process.env.API_URL_SERIES}/${id}`, {
            headers: { 'x-api-key': process.env.API_KEY },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao buscar a série.' };

        return NextResponse.json(data, { status });
    }

}

export async function PUT(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();
        const response = await axios.put(`${process.env.API_URL_SERIES}/${id}`, body, {
            headers: {
                'x-api-key': process.env.API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Erro ao atualizar a série.' };

        return NextResponse.json(data, { status });
    }
}