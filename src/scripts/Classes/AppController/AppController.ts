export default class  AppController {
	static isOnline(): { status: boolean; message: string } {
        //console.log(navigator.onLine)
		return navigator.onLine ? { status: true, message: "online" } : { status: false, message: "offline" };
	}
	static watchInternetConnection() {
		window.addEventListener("online", this.isOnline);
		window.addEventListener("offline", this.isOnline);
	}
	static stopWatchingInternetConnection() {
        window.removeEventListener("online", this.isOnline,true);
        window.removeEventListener("offline", this.isOnline,true);
	}
}

