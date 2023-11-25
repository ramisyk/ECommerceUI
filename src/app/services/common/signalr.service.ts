import {Inject, Injectable} from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {

  constructor(@Inject("domainUrl") private domainUrl: string) { }

  private _connection: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    hubUrl = this.domainUrl + hubUrl;

    // if (!this.connection || this.connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();

      const hubConnection: HubConnection = builder.withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();

      hubConnection.start()
        .then(() => console.log("Connected"))
        .catch(error => setTimeout(() => this.start(hubUrl), 2000));

    // }
    hubConnection.onreconnected(connectionID => console.log("Reconnected"));
    hubConnection.onreconnecting(error => console.log("Reconnecting..."));
    hubConnection.onclose(error => console.log("Close Reconnection"));

    return hubConnection
  }

  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {
    this.start(hubUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
