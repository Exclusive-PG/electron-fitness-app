

export default class Renderer {
	private renderHomePage: Function;
	private renderTrainingPage: Function;
	private renderFoodPage: Function;
    private renderProfilePage: Function;

	 constructor(renderHomePage:Function, renderTrainingPage:Function, renderFoodPage:Function,renderProfilePage:Function) {
        this.renderHomePage = renderHomePage;
        this.renderTrainingPage = renderTrainingPage
        this.renderFoodPage = renderFoodPage
        this.renderProfilePage = renderProfilePage
     }
     public renderAllPages(){
        this.renderHomePage();
        this.renderTrainingPage();
        this.renderFoodPage();
        this.renderProfilePage();
     }
}
