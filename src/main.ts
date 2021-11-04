import Samsung from './Samsung';
import Command from './Models/Command';
import { KEYS } from './Constantes/KEYS';
import { CMD } from './Constantes/CMD';




(async() => {
 
	let tv = new Samsung('localhost', '8001', 'App Name');
	let token = await tv.getTokenId();
	await tv.sendCommand(KEYS.KEY_VOLUP, CMD.CLICK, token);

	console.log('finished');
 
 
})()



