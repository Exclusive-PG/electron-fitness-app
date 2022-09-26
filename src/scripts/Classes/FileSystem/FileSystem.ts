import { fs, path } from "../../../scripts/requiredLib/requiredLib";

export default class FileSystem {
    private static paths = {
        images:path.resolve(path.join("data","users","images")),
        users:path.resolve(path.join("data","users","users.json"))
    }
	public static createJSONData(data: any, pathFile: string) {
		fs.mkdirSync(path.dirname(pathFile), { recursive: true }, (err: Error) => {
			if (err) throw err;
		});

		try {
			fs.writeFileSync(path.resolve(pathFile), JSON.stringify(data));
		} catch (e) {
			console.log((e as Error).message);
		}
	}

	public static createDirectory(pathDir: string = this.paths.images) {
		if (!fs.existsSync(pathDir)) {
            fs.mkdirSync(pathDir, { recursive: true })
		}
	}
    public static copyAvatarUser(srcDir:string,destDir:string){
        //console.log("srcDir",srcDir);
       // console.log("destDir",destDir);
        try {
            fs.copyFileSync(srcDir, destDir)
          } catch (err) {
            console.error(err)
          }
    }
    static get PATHS(){
        return this.paths;
    }
}
//FileSystem.createDirectory();