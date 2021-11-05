export default class Data {
	
	public action_type?: string;

	public appId?: string;
	
	public iconPath?: string;
	
	constructor(action_type?: string, appId?: string, iconPath?: string){
		this.action_type = action_type;
		this.appId = appId;
		this.iconPath = iconPath;
	}
}