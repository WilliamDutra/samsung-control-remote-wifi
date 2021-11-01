export default class Params {
	
	public Cmd: string;

	public DataOfCmd: string;
	
	public Option: boolean;
	
	public TypeOfRemote: string;
	
	constructor(Cmd: string, DataOfCmd: string, Option: boolean, TypeOfRemote: string){
		this.Cmd = Cmd;
		this.DataOfCmd = DataOfCmd;
		this.Option = Option;
		this.TypeOfRemote = TypeOfRemote;
	}
	
}