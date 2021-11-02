import WebSocket from 'ws'

import Command from './Models/Command';
import { KEYS } from './Constantes/KEYS';

export default class Samsung {
	
	private IP_TV_HOST: string;
	
	private APP_NAME: string;
	
	private PORT: string;
		
	private WS: WebSocket;
	
	
	constructor(IP: string, PORT: string, APP: string){
		this.IP_TV_HOST = IP;
		this.APP_NAME = Buffer.from(APP).toString('base64');
		this.PORT = PORT;
		
		this.WS = new WebSocket('ws://' + this.IP_TV_HOST + ':' + this.PORT + '/api/v2/');
		
	}
	
	public getTokenId() : Promise<any> {
		
		return new Promise((resolve, reject) => {
			
			let command = new Command('ms.channel.connect', 'Click', KEYS.KEY_HOME, false, 'SendRemoteKey');
						
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
	
	
	public sendCommand(Key: KEYS, TokenId: string) : Promise<any> {
		
		let command = new Command('ms.remote.control', 'Click', Key, false, 'SendRemoteKey'); 
		
		return new Promise((resolve, reject) => {
			
			this.WS = new WebSocket('wss://' + this.IP_TV_HOST + ':8002/api/v2/channels/samsung.remote.control?name=' + this.APP_NAME + '&token=' + TokenId , { rejectUnauthorized: false });
			
			this.WS.on('open', () => {
				this.WS.send(JSON.stringify(command));
			});
			
			this.WS.on('message', (message) => {
				console.log('Message: ', message.toString());
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
	
}