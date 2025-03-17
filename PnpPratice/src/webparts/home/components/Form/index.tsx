import * as React from "react";
import { useForm } from "react-hook-form";
import { Inputs } from "./type";
import { sp } from "@pnp/sp";
import styles from "./Forms.module.scss";

export default function Form(props) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit = async (data) => {
   
    await sp.web.lists
      .getByTitle(props.listName)
      .items.add({
        //Só precisou abrir o objeto porque o nome dos inputs e os da lista estão diferentes
        Title: data.ProfileId,
        field_1: data.InternSystemId,
        field_2: data.System,
        field_3: data.Class,
        field_4: String(data.Create),
        field_5: String(data.Read),
        field_6: String(data.Update),
        field_7: String(data.Delete),
      })
      .then((res) => {
        console.log(res);
        //Limpa os campos do formulário
        reset();

        // Atualiza a lista na Home
        props.onItemAdded();
      })
      .catch((err) => {
        console.log("erro", err);
      });
  };

  return (
    <div className={styles.row}>
      <h5>Adicione um novo registro</h5>
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
          <input type="checkbox" ref={register} name="Create" className={styles.checkbox}/>
          <label className={styles.subTitle}>Create</label>
        </div>

        <div className="form-group">
          <input type="checkbox" ref={register} name="Read" className={styles.checkbox}/>
          <label className={styles.subTitle}>Read</label>
        </div>

        <div className="form-group">
          <input type="checkbox" ref={register} name="Update" className={styles.checkbox}/>
          <label className={styles.subTitle}>Update</label>
        </div>

        <div className="form-group">
          <input type="checkbox" ref={register} name="Delete" className={styles.checkbox}/>
          <label className={styles.subTitle}>Delete</label>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <button type="submit" className={styles.button}>
            Criar Novo Registro
          </button>
        </div>
      </form>
    </div>
  );
}
