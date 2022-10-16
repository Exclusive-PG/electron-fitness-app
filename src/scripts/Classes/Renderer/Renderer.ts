import { renderPagesType } from "../../../types/types";

export default class Renderer {
	private renderPages: renderPagesType;

	private controllersUI: Array<Function>;

	public initRenderPages(renderPages: renderPagesType) {
		this.renderPages = renderPages;
	}
	public renderAllPages() {
		this.renderPages.renderFoodPage();
		this.renderPages.renderHomePage();
		this.renderPages.renderTrainingPage();
		this.renderPages.renderProfilePage();
	}

	public initControllers(controllersUI: Array<Function>) {
		this.controllersUI = controllersUI;
	}
	public startControllers() {
		this.controllersUI.forEach((callback) => {
			callback();
		});
	}
}
