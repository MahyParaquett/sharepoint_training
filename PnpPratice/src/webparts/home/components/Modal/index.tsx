import * as React from "react";
import styles from "./Modal.module.scss";
import { useForm } from "react-hook-form";
import { Register } from "./types";
import { MdClose } from "react-icons/md";
import { sp } from "@pnp/sp";

const ModalComponent = ({ closeModal, ItemId, listName, onItemEdited }) => {
  const { register, reset, handleSubmit } = useForm<Register>();

  const onSubmit = async (newData: Register) => {
    console.log(newData);
    //Método para editar itens na lista
    await sp.web.lists
      .getByTitle(listName)
      .items.getById(ItemId)
      .update({
        Title: newData.ProfileId,
        field_1: newData.InternSystemId,
        field_2: newData.System,
        field_3: newData.Class,
        field_4: String(newData.Create),
        field_5: String(newData.Read),
        field_6: String(newData.Update),
        field_7: String(newData.Delete),
      })
      .then(function (resp) {
        console.log(resp);
        onItemEdited();
        reset();
        closeModal();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <h5>Editar informações</h5>
        <MdClose onClick={closeModal} size={20} />
      </div>

      <div className={styles.modalBody}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className={styles.subTitle}>Profile Id</label>
            <input
              type="text"
              ref={register}
              name="ProfileId"
              className="form-control"
              placeholder="Digite o id do perfil"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div className="form-group">
            <label className={styles.subTitle}>Intern System Id</label>
            <input
              type="text"
              ref={register}
              name="InternSystemId"
              className="form-control"
              placeholder="Digite o id do sistema interno"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className={styles.subTitle}>
              System
            </label>
            <input
              type="text"
              ref={register}
              name="System"
              className="form-control"
              placeholder="Digite o nome do sistema"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className={styles.subTitle}>
              Class
            </label>
            <input
              type="text"
              ref={register}
              name="Class"
              className="form-control"
              placeholder="Digite o nome da classe"
              style={{ marginBottom: "15px" }}
            />
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              ref={register}
              name="Create"
              className={styles.checkbox}
            />
            <label className={styles.subTitle}>Create</label>
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              ref={register}
              name="Read"
              className={styles.checkbox}
            />
            <label className={styles.subTitle}>Read</label>
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              ref={register}
              name="Update"
              className={styles.checkbox}
            />
            <label className={styles.subTitle}>Update</label>
          </div>

          <div className="form-group">
            <input
              type="checkbox"
              ref={register}
              name="Delete"
              className={styles.checkbox}
            />
            <label className={styles.subTitle}>Delete</label>
          </div>

          <div className={styles.modalFooter}>
            <button type="submit" className={styles.button}>
              Salvar
            </button>
            <button onClick={closeModal} className={styles.buttonClose}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalComponent;
