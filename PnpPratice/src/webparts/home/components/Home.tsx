import * as React from "react";
import styles from "./Home.module.scss";
import { IHomeProps, RequestInterface } from "./IHomeProps";
import Logo from "../../../assets/logo-t2m-pb1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDate } from "../../../utils/FormatDate";
import Form from "./Form";
import { sp } from "@pnp/sp";

export default class Home extends React.Component<
  IHomeProps,
  RequestInterface,
  {}
> {
  
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
    };
  }
 
  private readonly listName: string = "Perfis_Permissões_Mapeamento";
  
  async componentDidMount() {
    console.log("Itens da lista:", this.listName);
    try {
      const items = await sp.web.lists.getByTitle(this.listName).items.get();
      
      this.setState({
        Items: items,
      });
      
      console.log("Itens da lista:", items);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
    }
  }

  renderHtml(value) {
    return (
      <tr>
        <td>{value.Title}</td>
        <td>{value.field_1}</td>
        <td>{value.field_2}</td>
        <td>{value.field_3}</td>
        <td>{value.field_4}</td>
        <td>{value.field_5}</td>
        <td>{value.field_6}</td>
        <td>{value.field_7}</td>
      </tr>
    );
  }
  public render(): React.ReactElement<IHomeProps> {
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1>Treinamento de Crud em lista</h1>
            </div>
            <div className={styles.columnLogo}>
              <img src={Logo} alt="logo" className={styles.logo}></img>
            </div>
          </div>

          <div className={styles.row}>
            <table className="table table-striped">
              <thead>
                <th>Profile_Id</th>
                <th>InternSystem_Id</th>
                <th>System</th>
                <th>Class</th>
                <th>Create</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
              </thead>
              <tbody>{this.state.Items.map(this.renderHtml)}</tbody>
            </table>
          </div>

          <Form listName={this.listName}/>
        </div>
      </div>
    );
  }
}
