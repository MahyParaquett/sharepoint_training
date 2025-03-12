import * as React from "react"; 
import styles from "../HelloWorld.module.scss";
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
        Title: data.Name,
        Item: dateFormat,
        G_x00ea_nero: data.Gender
        
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
                <label htmlFor="exampleInputEmail1" className={styles.subTitle}>
                  Nome
                </label>
                <input
                  type="text"
                  ref={register}
                  name="Name"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Digite o Nome"
                  style={{ marginBottom: "15px" }}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
                  Data de nascimento
                </label>
                <input
                  type="text"
                  ref={register}
                  name="Birthdate"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Digite a data de nascimento"
                  style={{ marginBottom: "15px" }}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.subTitle}
                >
                  Gênero
                </label>
                <input
                  type="text"
                  ref={register}
                  name="Gender"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Digite o gênero"
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