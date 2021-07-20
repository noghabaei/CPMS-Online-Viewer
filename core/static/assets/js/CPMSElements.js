class CPMSElement {
    element;

    setElement(element) {
        this.element = element;
    }

    getElement() {
        return this.element;
    }

    appendElement(element) {
        this.element.append(element);
    }

    setId(id) {
        this.element.attr("id", id);
    }

    getId() {
        return this.element.attr("id");
    }

    setClass(classString) {
        this.element.addClass(classString);
    }

    getClass() {
        return this.element.attr("class");
    }
}

class PanelHeader extends CPMSElement {

    mainDiv;
    headerDiv;

    constructor(panelHeaderText = "New Panel") {

        super();

        super.setElement(this.createPanelHeader(panelHeaderText));
    }

    createPanelHeader(panelHeaderText) {
        this.mainDiv = $("<div></div>");
        this.mainDiv.addClass("panel-header");

        this.headerDiv = $("<div></div>");
        this.headerDiv.addClass("text-center");
        this.headerDiv.text(panelHeaderText);

        this.mainDiv.append(this.headerDiv);

        return this.mainDiv;
    }

    setPanelHeaderText(panelHeaderText) {
        this.headerDiv.text(panelHeaderText);
    }

}

class PanelContent extends CPMSElement {

    constructor() {
        super();

        super.setElement(this.createPanelContentElement());
    }

    createPanelContentElement() {
        let panelContent = super.getElement();

        panelContent = $("<div></div>");
        panelContent.addClass("panel-content");

        return panelContent;
    }

}

class Panel extends CPMSElement {

    panelHeader;
    panelContent;

    constructor() {

        super();

        super.setElement(this.createPanel());

    }

    getPanelHeader() {
        return this.panelHeader;
    }

    getPanelContent() {
        return this.panelContent;
    }

    createPanel() {

        let panel = $("<div></div>");
        panel.addClass("panel small");

        this.panelHeader = new PanelHeader();
        panel.append(this.panelHeader.getElement());

        this.panelContent = new PanelContent();
        panel.append(this.panelContent.getElement());

        return panel;
    }
}

class IncreaseButton extends CPMSElement {

    constructor() {

        super();

        super.setElement( this.createNewIncreaseButton() );

    }

    setOnClick( fn ) {

        this.element.on( 'click', fn );

    }

    clearOnClick() {

        this.element.off();

    }

    createNewIncreaseButton() {

        let button = $( '<button></button>' );
        button.text( '>' );

        return button;

    }

}

class DecreaseButton extends CPMSElement {

    constructor() {

        super();

        super.setElement( this.createNewDecreaseButton() );

    }

    setOnClick( fn ) {

        this.element.on( 'click', fn );

    }

    clearOnClick() {

        this.element.off();

    }

    createNewDecreaseButton() {

        let button = $( '<button></button>' );
        button.text( '<' );

        return button;

    }

}

export {
    CPMSElement,
    Panel,
    PanelHeader,
    PanelContent,
    IncreaseButton,
    DecreaseButton
};