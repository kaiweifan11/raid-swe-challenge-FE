import { Modal, Button } from 'antd';

const ConfirmModal = (props) =>{
    const {isModalOpen, setIsModalOpen, onConfirm, contentText, title } = props;

    const handleOk = () => {
        setIsModalOpen(false);
        onConfirm();
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    return(
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
            <Button key="back" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key="submit" type="primary"  onClick={handleOk}>
                Confirm
            </Button>
            ]}>
            <p>{contentText}</p>
        </Modal>
    )
};

export default ConfirmModal;