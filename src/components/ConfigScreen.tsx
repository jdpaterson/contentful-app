import React, { Component } from 'react';
import { AppExtensionSDK } from 'contentful-ui-extensions-sdk';
import { Button, Heading, Form, Workbench, Paragraph } from '@contentful/forma-36-react-components';
import { css } from 'emotion';

export interface AppInstallationParameters {}

interface ConfigProps {
  sdk: AppExtensionSDK;
}

interface ConfigState {
  parameters: AppInstallationParameters;
}

export default class Config extends Component<ConfigProps, ConfigState> {
  constructor(props: ConfigProps) {
    super(props);
    this.state = { parameters: {} };

    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    props.sdk.app.onConfigure(() => this.onConfigure());
  }

  async componentDidMount() {
    const contentTypes = await this.props.sdk.space.getContentTypes()
    console.log("CTs:", contentTypes)
    // Get current parameters of the app.
    // If the app is not installed yet, `parameters` will be `null`.
    const parameters: AppInstallationParameters | null = await this.props.sdk.app.getParameters();

    this.setState(parameters ? { parameters } : this.state, () => {
      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      this.props.sdk.app.setReady();
    });
  }

  onConfigure = async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await this.props.sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters: this.state.parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState
    };
  };

  onButtonClick = async () => {
    const fetchResp = await fetch('https://happy-perlman-340ad0.netlify.app/.netlify/functions/test')
    console.log(fetchResp)
  }

  render() {
    // const authUrl = "https://be.contentful.com/oauth/authorize?response_type=token"
    // const clientId = "gccU7VkNHpIGeSr0OlEFhq52jsGH32FKOEPNolVi9kc"
    // const redirectUri = "https://www.google.com"
    // const scope = "content_management_manage"
    return (
      <Workbench className={css({ margin: '80px' })}>
        {/* <a href={`${authUrl}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`}> */}
          <Button onClick={() => this.onButtonClick()}buttonType={"primary"}>Authorize</Button>
        {/* </a> */}
        <Form>
          <Heading>App Config</Heading>
          <Paragraph>Welcome to your contentful app. This is your config page.</Paragraph>
        </Form>
      </Workbench>
    );
  }
}
