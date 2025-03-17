import * as React from "react"; 
import styles from "../Home.module.scss";
import { useForm } from "react-hook-form";
import { Inputs } from "./type";
import { sp } from "@pnp/sp";

export default function Form(props){
    
    const {register, handleSubmit } = useForm<Inputs>();
    
    const onSubmit = async data => {
      const birthdate = data.Birthdate
      const dateFormat = new Date(birthdate);
      
      await sp.web.lists.getByTitle(props.listName).items.add({
        //Só precisoou abrir o objeto porque o nome dos inputs e os da lista estão diferentes
        
       Title: data.ProfileId,
       field_1: data.InternSystemId,
       field_2: data.System,
       field_3: data.Class,
       field_4: data.Create,
       field_5: data.Read,
       field_6: data.Update,
       field_7: data.Delete,
       
        
      }).then(res =>{
        console.log(res)
      }).catch(err => {
        console.log("erro", err)
      }) 
    }
    
    return(
        <div className={styles.row}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className={styles.subTitle}>
                  Profile Id
                </label>
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
                <label
                 className={styles.subTitle}
                >
                  Intern System Id
                </label>
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
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
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
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
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
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
                  Create
                </label>
                <input
                  type="bool"
                  ref={register}
                  name="Create"
                  className="form-control"
                  placeholder="Digite permissão para criar"
                  style={{ marginBottom: "15px" }}
                />
              </div>
              
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
                  Read
                </label>
                <input
                  type="bool"
                  ref={register}
                  name="Read"
                  className="form-control"
                  placeholder="Digite permissão para ler"
                  style={{ marginBottom: "15px" }}
                />
              </div>
              
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
                  Update
                </label>
                <input
                  type="bool"
                  ref={register}
                  name="Update"
                  className="form-control"
                  placeholder="Digite permissão para atualizar"
                  style={{ marginBottom: "15px" }}
                />
              </div>
              
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
                  Delete
                </label>
                <input
                  type="bool"
                  ref={register}
                  name="Delete"
                  className="form-control"
                  placeholder="Digite permissão para deletar"
                  style={{ marginBottom: "15px" }}
                />
              </div>

              <div style={{display:'flex', alignItems:"flex-end", width:"100%",justifyContent: "flex-end"}}>
                <button type="submit" className={styles.button}>
                  Criar Novo Registro
                </button>
              </div>
            </form>
          </div>
    )
}