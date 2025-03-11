import * as React from "react"; 
import styles from "../HelloWorld.module.scss";

export default function Form(){
    
    return(
        <div className={styles.row}>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className={styles.subTitle}>
                  Nome
                </label>
                <input
                  type="text"
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