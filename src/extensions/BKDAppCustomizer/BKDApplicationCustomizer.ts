import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'BKDApplicationCustomizerStrings';
import Footer from './components/Footer';
import { sp } from "@pnp/sp/presets/all";

const LOG_SOURCE: string = 'BKDApplicationCustomizer';

export interface IBKDApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

export default class BKDApplicationCustomizer
  extends BaseApplicationCustomizer<IBKDApplicationCustomizerProperties> {

    private _bottomPlaceholder?: PlaceholderContent;

    private _handleDispose(): void {
      console.log('[BKDApplicationCustomizer._onDispose] Disposed custom bottom placeholder.');
    }

  @override
  public async onInit(): Promise<void> {

    sp.setup({
      spfxContext: this.context
    });

    // inject custom css file to manage hub navigation colors
    const cssUrl: string = "https://bkdllp.sharepoint.com/SiteAssets/BKDApplicationCustomizer/BKDApplicationCustomizer.css";

    if (cssUrl) {
      const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
      let customStyle: HTMLLinkElement = document.createElement("link");
      customStyle.href = cssUrl;
      customStyle.rel = "stylesheet";
      customStyle.type = "text/css";
      head.insertAdjacentElement("beforeEnd", customStyle);
    }
    else {
      const links = document.getElementsByTagName("link");
      console.log(links);
      for (let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf(cssUrl) > -1) {
          links[i].remove();
        }
      }
    }
    return (await this._renderPlaceHolders());
  }

  private async _renderPlaceHolders(): Promise<void> {

    // check if the application customizer has already been rendered
    if (!this._bottomPlaceholder) {
      // create a DOM element in the bottom placeholder for the application customizer to render
      this._bottomPlaceholder = this.context.placeholderProvider
        .tryCreateContent(PlaceholderName.Bottom, { onDispose: this._handleDispose });
    }

    // if the top placeholder is not available, there is no place in the UI
    // for the app customizer to render, so quit.
    if (!this._bottomPlaceholder) {
      return;
    }

    const element: React.ReactElement = React.createElement(Footer, {});     
    ReactDOM.render(element, this._bottomPlaceholder.domElement);

  }
}
