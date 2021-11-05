import WebSocket from 'ws'

import Command from './Models/Command';
import Data from './Models/Data';
import { KEYS } from './Constantes/KEYS';
import { CMD } from './Constantes/CMD';

export default class Samsung {
	
	private IP_TV_HOST: string;
	
	private APP_NAME: string;
	
	private PORT: string;
		
	private WS: WebSocket;
	
	/**
	 * 
	 * @constructor
	 * @param {string} IP   - IP da TV
	 * @param {string} PORT - Porta do ip da TV
	 * @param {string} APP  - Nome do applicativo
	 */
	constructor(IP: string, PORT: string, APP: string){
		this.IP_TV_HOST = IP;
		this.APP_NAME = Buffer.from(APP).toString('base64');
		this.PORT = PORT;
		
		this.WS = new WebSocket('ws://' + this.IP_TV_HOST + ':' + this.PORT + '/api/v2/');
		
	}
	
	/**
	* Método que retorna o token de autorização
	*/
	public getTokenId() : Promise<any> {
		
		return new Promise((resolve, reject) => {
			
			let command = new Command('ms.channel.connect', CMD.CLICK, KEYS.KEY_HOME, false, 'SendRemoteKey');
						
			this.WS = new WebSocket('wss://' + this.IP_TV_HOST + ':8002/api/v2/channels/samsung.remote.control?name=' + this.APP_NAME + '&toke=00000', { rejectUnauthorized: false });
			
			this.WS.on('open', () => {
				this.WS.send(JSON.stringify(command));
				console.log('Conneted: ');
			})
			
					
			this.WS.on('message', (message) => {
				let response = JSON.parse(message.toString());
				resolve(response.data.token);
			});
			
			this.WS.on('error', (err) => {
				this.WS.close();
				reject(err);
			})
		
		});
			
	}
	
	/**
	* Método que envia um comando para a tv
	* @param {KEYS}    Keys   - Tecla do controle remoto
	* @param {CMD}     Cmd    - Tipo do comando
	* @param {TokenId} string - Token da autorização
	*/
	public sendCommand(Key: KEYS, Cmd: CMD, TokenId: string) : Promise<any> {
		
		let command = new Command('ms.remote.control', Cmd, Key, false, 'SendRemoteKey'); 
		
		return new Promise((resolve, reject) => {
			
			this.WS = new WebSocket('wss://' + this.IP_TV_HOST + ':8002/api/v2/channels/samsung.remote.control?name=' + this.APP_NAME + '&token=' + TokenId , { rejectUnauthorized: false });
			
			this.WS.on('open', () => {
				this.WS.send(JSON.stringify(command));
			});
			
			this.WS.on('message', (message) => {
				console.log('Message: [Command] ', message.toString());
				resolve(message);
			});
			
			this.WS.on('error', (err) => {
				console.log('Error: ', err);
				this.WS.close();
				reject(err);
			});
			
			this.WS.on('response', (response) => {
				resolve(response.toString());
			});
			
		});
		
	}
	
	
	private sendSpecificCommand(Cmd: Command, TokenId: string) : Promise<any> {
		
				
		return new Promise((resolve, reject) => {
			
			this.WS = new WebSocket('wss://' + this.IP_TV_HOST + ':8002/api/v2/channels/samsung.remote.control?name=' + this.APP_NAME + '&token=' + TokenId , { rejectUnauthorized: false });
			
			this.WS.on('open', () => {
				this.WS.send(JSON.stringify(Cmd));
			});
			
			this.WS.on('message', (message) => {
				console.log('Message: [Command] ', message.toString());
				resolve(message);
			});
			
			this.WS.on('error', (err) => {
				console.log('Error: ', err);
				this.WS.close();
				reject(err);
			});
			
			this.WS.on('response', (response) => {
				resolve(response.toString());
			});
			
		});
		
	}
	
	/**
	* Método que retorno todos os aplicativos instalados na tv
	* @param {TokenId}     string   - Token de autorização
	*/
	public getAppsInstaled(tokenId: string) : Promise<any> {
		let command = new Command('ms.channel.emit', undefined, undefined, undefined, undefined, undefined, 'ed.installedApp.get', 'host');
		return this.sendSpecificCommand(command, tokenId);
	}
	
	/**
	* Método que abre o aplicativo na tv pelo ID do aplicativo
	* @param {AppId}       string   - Id do aplicativo na tv
	* @param {TokenId}     string   - Token de autorização
	*/
	public openAppsById(AppId: string, TokenId: string): Promise<any> {
		let data = new Data('DEEP_LINK', AppId);
		let command = new Command('ms.channel.emit', undefined, undefined, undefined, undefined, data, 'ed.apps.launch', 'host');
		return this.sendSpecificCommand(command, TokenId);
		
	}
	
	/**
	* Método que retorna o icone em base64 do aplicativo
	* @param {IconPath}    string   - Caminho do icone do aplicativo
	* @param {TokenId}     string    - Token de autorização
	*/
	public getAppIconByPath(IconPath: string, TokenId: string): Promise<any> {
		let data = new Data(undefined, undefined, IconPath);
		let command = new Command('ms.channel.emit', undefined, undefined, undefined, undefined, data, 'ed.apps.icon', 'host');
		return this.sendSpecificCommand(command, TokenId);
	}
}