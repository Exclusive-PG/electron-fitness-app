export default class  AppController {
	public static _scripts : Function[] | any[] = []
	static isOnline(): { status: boolean; message: string } {
      // console.log(navigator.onLine)
		return navigator.onLine ? { status: true, message: "online" } : { status: false, message: "offline" };
	}
	static watchInternetConnection() {
		console.log("App is watching the internet connection...")
		window.addEventListener("online", this.isOnline);
		window.addEventListener("offline", this.isOnline);
	}
	static stopWatchingInternetConnection() {
		console.log("App stopped watching the internet connection")
        window.removeEventListener("online", this.isOnline);
        window.removeEventListener("offline", this.isOnline);
	}
	static pushScript(script:Function){
		this._scripts.push(script)
	}
}

