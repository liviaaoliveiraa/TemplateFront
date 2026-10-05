'use client';

import axios from 'axios';
import { useEffect, useState} from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import FormModal from '@/components/FormModal';
import {Button, Card, Skeleton} from 'antd';

export default function ReadById() {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleUpdate = async (values) => {
        setSaving(true);

        try {
            const response = await axios.put(`/api/series/${id}`, values);
            setSerie(response.data);
            setEditOpen(false);
            toast.success('Série atualizada com sucesso!', { id: 'read-id' });
        } catch (error) {
            toast.error('Erro ao atualizar a série.', { id: 'read-id' });
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        async function buscarSerie() {
            try {
                const response = await axios.get(`/api/series/${id}`);
                setSerie(response.data);
            } catch (error) {
                toast.error("Série não encontrada.", { id: 'read-id' });
            } finally {
                setLoading(false);
            }
        }

        buscarSerie();
    }, [id]);

    return (
        <main>
            <h2>Get By Id - read</h2>
            <p>O navegador busca, edita e exclui pelo /api/series/[id] (nosso route.js); o servidor fala com a API usando a api-key privada.</p>
            <p>Abra o DevTools - Network: aparece a série (GET/PUT/DELETE), sem x-api-key.</p>

            {loading ? (
                <div className="skeleton">
                    <Skeleton active />
                    </div>
                    ) : (
                        serie && (
                            <>
                            <Card title={serie.title}>
                                <p>Gênero: {serie.genero}</p>
                                <p>Plataforma: {serie.plataforma}</p>
                                <p>Temporadas: {serie.numero_temporadas}</p>
                                <p>Ano do lançamento: {serie.ano_lancamento}</p>
                            </Card>

                            <div className="actions">
                                <Button type="primary" onClick={() => setEditOpen(true)}>
                                    Editar
                                </Button>
                                <Button danger onClick={() => setDeleteOpen(true)}>
                                    Excluir
                                </Button>
                            </div>

                            <FormModal
                                openModal={editOpen}
                                confirmLoading={saving}
                                serie={serie}
                                onSubmit={handleUpdate}
                                onCancel={() => setEditOpen(false)}
                            />
                            </>
                        )
                    )}
        </main>
    );
}