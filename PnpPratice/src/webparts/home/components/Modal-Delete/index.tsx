import * as React from "react";
import styles from "./Modal.module.scss";
import { Register } from "./types";
import { MdClose } from "react-icons/md";
import { sp } from "@pnp/sp";

const ModalDelete = ({ closeModal, ItemId, listName, onItemEdited }) => {
  
  const handleDelete = async () => {
    
    //Método para apagar itens na lista
    await sp.web.lists
      .getByTitle(listName)
      .items.getById(ItemId)
      .delete()
      .then(function (resp) {
        console.log(resp);
        onItemEdited();
        closeModal();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <h5>Apagar registro</h5>
        <MdClose onClick={closeModal} size={20} />
      </div>

      <div className={styles.modalBody}>
       <p>Atenção! Ao apagar esse registro não será mais possível recuperá-lo, tem certeza que deseja apagar?</p>

          <div className={styles.modalFooter}>
            <button onClick={handleDelete} className={styles.button}>
              Apagar
            </button>
            <button onClick={closeModal} className={styles.buttonClose}>
              Fechar
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default ModalDelete;
