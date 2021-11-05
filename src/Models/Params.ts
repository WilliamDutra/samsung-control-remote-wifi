import { KEYS } from '../Constantes/KEYS';
import { CMD } from '../Constantes/CMD';
import Data from '../Models/Data';

export default class Params {
	
	public Cmd?: CMD;

	public DataOfCmd?: KEYS;
	
	public Option?: boolean;
	
	public TypeOfRemote?: string;
	
	public data?: Data;
	
	public event?: string;
	
	public to?: string;
	
	constructor(Cmd?: CMD, DataOfCmd?: KEYS, Option?: boolean, TypeOfRemote?: string, data?: Data, event?: string, to?: string){
		
		if(Cmd){
			this.Cmd = Cmd;
			this.DataOfCmd = DataOfCmd;
			this.Option = Option;
			this.TypeOfRemote = TypeOfRemote;
		}
		
		if(event){
			this.data = data;
			this.event = event;
			this.to = to;
		}		
		
	}
	
}