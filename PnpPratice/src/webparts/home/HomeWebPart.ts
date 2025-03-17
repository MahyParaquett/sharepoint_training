import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HomeWebPartStrings';
import Home from './components/Home';
import { IHomeProps } from './components/IHomeProps';
import { setupSP } from '../../spConfig';

export interface IHomeWebPartProps {
  description: string;
}

export default class HomeWebPart extends BaseClientSideWebPart<IHomeWebPartProps> {

  // Inicializa o PnP JS corretamente
  protected async onInit(): Promise<void> {
    await super.onInit();
    setupSP(this.context); 
  }
  
  public render(): void {
    const element: React.ReactElement<IHomeProps> = React.createElement(
      Home,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

 
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
