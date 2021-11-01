import WebSocket from 'ws'

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
			
			const command =  "{\"method\":\"ms.remote.control\",\"params\":{\"Cmd\":\"Click\",\"DataOfCmd\":\"KEY_HOME\",\"Option\":\"false\",\"TypeOfRemote\":\"SendRemoteKey\"}}";

			
			this.WS = new WebSocket('wss://' + this.IP_TV_HOST + ':8002/api/v2/channels/samsung.remote.control?name=' + this.APP_NAME + '=&token=0000', { rejectUnauthorized: false });
			
			this.WS.on('open', () => {
				this.WS.send(JSON.stringify(command));
				console.log('Conneted: ');
			})
			
					
			this.WS.on('message', (message) => {
				let response = JSON.parse(message.toString());
				resolve(response.data.token);
			});
			
			this.WS.on('error', (err) => {
				reject(err);
			})
		
		});
			
	}
	
	
	
	
}