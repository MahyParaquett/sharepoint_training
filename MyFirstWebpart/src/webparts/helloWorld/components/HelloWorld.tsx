import * as React from "react";
import styles from "./HelloWorld.module.scss";
import { IHelloWorldProps } from "./IHelloWorldProps";
import { escape } from "@microsoft/sp-lodash-subset";
import Logo from "../../../assets/logo-t2m-pb1.png";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { getSP } from "../../../spConfig";
import { SPFI } from "@pnp/sp";

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  private sp: SPFI;

  constructor(props: IHelloWorldProps) {
    super(props);
    this.sp = getSP(); 
  }

  async componentDidMount() {
    try {
      const items: any[] = await this.sp.web.lists.getByTitle("Lista teste").items();
      console.log(items);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <h1>TESTE</h1>

              <span className={styles.title}>Welcome to my first webpart!</span>
              <p className={styles.subTitle}>
                I'm learning how to customize SharePoint experiences using Web
                Parts.
              </p>
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>
              <a
                href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigNt8j5n9F80rTN3hTwWvBZWb0aVa1zOduVa1SSL_kZ2OHf6Pcx8igskCP6eDZmvSa07GurVkzKJAYr1j0cH0o5nsD4Ib_rtjGtbq57sQCsLSwMgsPu4DqBGm91beV62AjIO9NqJ75ZPw/s1600/joinha+na+%C3%A1gua.jpg"
                className={styles.button}
                target="_blank"
              >
                <span className={styles.label}>Click here!</span>
              </a>
            </div>
            <div className={styles.columnLogo}>
              <img src={Logo} alt="logo" className={styles.logo}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
