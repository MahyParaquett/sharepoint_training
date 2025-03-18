import * as React from "react";
import { IHomeProps, RequestInterface } from "./IHomeProps";
import Logo from "../../../assets/logo-t2m-pb1.png";
import Form from "./Form";
import { sp } from "@pnp/sp";
import { MdEdit } from "react-icons/md";
import ModalEdit from "./Modal-Edit";


import styles from "./Home.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export default class Home extends React.Component<
  IHomeProps,
  RequestInterface,
  {}
> {
  constructor(props) {
    super(props);
    this.state = {
      Items: [],
      OpenModal: false,
      ItemId: 0
    };
  }

  private readonly listName: string = "Perfis_Permissões_Mapeamento";

  async componentDidMount() {
    await this.loadItems();
  }

  // Método para buscar os itens da lista novamente
  async loadItems() {
    try {
      const items = await sp.web.lists
        .getByTitle(this.listName)
        .items.top(150)
        .get();
      this.setState({ Items: items });
      console.log("Itens carregados:", items);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
    }
  }

  // Método chamado após um item ser adicionado
  handleItemAdded = async () => {
    await this.loadItems(); // Recarrega a lista após adicionar um item
  };

  

  renderHtml = (value) => {
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
        <td>
          <MdEdit
            size={18}
            onClick={() => {
              console.log("Antes do setState:", this.state.OpenModal);
              this.setState({ OpenModal: true }, () => {
                console.log("Depois do setState:", this.state.OpenModal);
              });
              this.setState({ItemId: value.Id})
            }}
            style={{ cursor: "pointer", color: "#A85413" }}
          />
        </td>
      </tr>
    );
  };
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
                <th>System_Id</th>
                <th>System</th>
                <th>Class</th>
                <th>Create</th>
                <th>Read</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Editar</th>
              </thead>
              <tbody>{this.state.Items.map(this.renderHtml)}</tbody>
            </table>
        
            {this.state.OpenModal && (
            <ModalEdit
              closeModal={() => this.setState({ OpenModal: false })}
              ItemId={this.state.ItemId}
              listName={this.listName}
              onItemEdited={this.handleItemAdded}
            />
            )} 
          </div>

          <Form listName={this.listName} onItemAdded={this.handleItemAdded} />
        </div>
      </div>
    );
  }
}
