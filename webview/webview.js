import React, { Component } from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebViewThatOpensLinksInNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri:null
    };
  }
  render() {
    const { navigation, route } = this.props;
    const { qrData} = route.params;
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri: qrData }}
        onNavigationStateChange={(event) => {
          if (event.url !== qrData) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }
}