// Fundamental class for every element created in application.
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

    addStyleProperty( style, value ) {
        this.element.css( style, value );
    }
}

// Represents a customizable Panel Header. E.g. Element Panel header, Compatibility Panel header
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

// Represents a customizable Panel Body. E.g. Element Panel, Compatibility Panel
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

// Represents a UI Panel. Contains PanelHeader and PanelContent 
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

// Button used to increase transform value in Transform Panel.
class IncreaseButton extends CPMSElement {

    transformType;
    axis;

    signals = {
        increaseTransformButtonPressed: new signals.Signal(),
        increaseTransformButtonReleased: new signals.Signal()
    }

    constructor( transformType='translate', axis='x' ) {

        super();

        super.setElement(this.createNewIncreaseButton());

        this.transformType = transformType;

        this.axis = axis;

        this.element.mousedown( () => this.signals.increaseTransformButtonPressed.dispatch( transformType, axis ) );

        this.element.mouseup( () => this.signals.increaseTransformButtonReleased.dispatch() );
        
    }

    createNewIncreaseButton() {

        let button = $('<button></button>');
        button.text('>');

        return button;

    }

}


// Button used to decrease transform value in Transform Panel.
class DecreaseButton extends CPMSElement {

    transformType;
    axis;

    signals = {
        decreaseTransformButtonPressed: new signals.Signal(),
        decreaseTransformButtonReleased: new signals.Signal()
    }

    constructor( transformType='translate', axis='x' ) {

        super();

        super.setElement(this.createNewDecreaseButton());

        this.transformType = transformType;

        this.axis = axis;

        this.element.mousedown( () => this.signals.decreaseTransformButtonPressed.dispatch( transformType, axis ) );

        this.element.mouseup( () => this.signals.decreaseTransformButtonReleased.dispatch() );

    }

    createNewDecreaseButton() {

        let button = $('<button></button>');
        button.text('<');

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