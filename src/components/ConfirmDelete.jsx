'use client';

import {Button, Modal} from "antd";

export default function ConfirmDelete({ openModal, serie, confirmloading, onSubmit, onCancel }) {
    return (
        <Modal
            open={openModal}
            title="Confirmar Exclusão"
            centered
            onCancel={onCancel}
            footer={null}
            destroyOnHidden>
            <p>Tem certeza de que deseja excluir a série "{serie?.title}"?</p>
            <Button danger type="primary" loading={confirmloading} onClick={onSubmit}>
                Excluir
            </Button>
        </Modal>
    );
}