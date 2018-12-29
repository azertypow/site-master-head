interface IGridColumn {
    totalWidth:      IUnit
    offset:          "center" | IUnit
    numberOfColumn:  number
    gutterOnOutside: "half gutter" | "no gutter on outside" | "gutter width"

    gutterWidth:     IUnit
}


export default class Grid implements IGrid {

    readonly column:     IGridColumn | false;
    readonly row:        IGridRow | false;
    readonly lineHeight: number;
    readonly xHeight:    number;

    private _elementForGrid: HTMLElement;

    private _startLineHeight = 0;

    private _gridElement            = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    private _columnGroupElement     = document.createElementNS("http://www.w3.org/2000/svg", "g");
    private _lineHeightGroupElement = document.createElementNS("http://www.w3.org/2000/svg", "g")
    private _xHeightGroupElement    = document.createElementNS("http://www.w3.org/2000/svg", "g")

    public toggleGrid() {
        const isDisable = this._gridElement.style.display === "none"

        if(isDisable) {
            this.buildGrid();
        } else {
            this._gridElement.style.display = "none";
        }
    }

    public plus() {
        this._startLineHeight++;
        this.buildGrid();
    }

    public moin() {
        this._startLineHeight--;
        this.buildGrid();
    }

    public toggleColumn() {
        const isDisable = this._columnGroupElement.style.display === "none"
        this._columnGroupElement.style.display = isDisable ? "block" : "none"
    }
    public toggleLineHeight() {
        const isDisable = this._lineHeightGroupElement.style.display === "none"
        this._lineHeightGroupElement.style.display = isDisable ? "block" : "none"
    }
    public toggleXHeight() {
        const isDisable = this._xHeightGroupElement.style.display === "none"
        this._xHeightGroupElement.style.display = isDisable ? "block" : "none"
    }

    constructor(elementForGrid: HTMLElement, settings: IGrid) {
        this._elementForGrid = elementForGrid;
        this._elementForGrid.appendChild(this._gridElement);

        this.xHeight = settings.xHeight;
        this.lineHeight = settings.lineHeight;
        this.row = settings.row;
        this.column = settings.column;

        window.addEventListener("resize", () => {this.buildGrid()})

        this.buildGrid();
    }

    public buildGrid() {
        this._generateGridElement()
        this._generateGridColumns()

        this._generateLineElements()
    }

    private _generateLineElements() {
        this._lineHeightGroupElement.remove()
        this._lineHeightGroupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._gridElement.appendChild(this._lineHeightGroupElement);

        this._xHeightGroupElement.remove()
        this._xHeightGroupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._gridElement.appendChild(this._xHeightGroupElement);

        for (let i = 1; i < this._elementForGrid.getBoundingClientRect().height / this.lineHeight; i++) {
            this._lineHeightGroupElement.appendChild(this.createHorizontalGuid(`${i * this.lineHeight + this._startLineHeight}px`))

            const xHeightGuid = this.createHorizontalGuid(`${i * this.lineHeight - this.xHeight + this._startLineHeight}px`)
            xHeightGuid.style.fill = "cornflowerblue"
            this._xHeightGroupElement.appendChild(xHeightGuid)
        }

        this._gridElement.appendChild(this._lineHeightGroupElement)
        this._gridElement.appendChild(this._xHeightGroupElement)
    }

    private _generateGridColumns() {
        this._columnGroupElement.remove()
        this._columnGroupElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this._gridElement.appendChild(this._columnGroupElement);

        if (this.column) {
            const totalWidthStringValue = this.getTotalWidthStringValue();

            const columnWidthStringValue = `${totalWidthStringValue} / ${this.column.numberOfColumn}`;

            const halfGutterWidthStringValue = new Unit({
                unit: this.column.gutterWidth.unit,
                value: this.column.gutterWidth.value / 2,
            }).stringValue;

            if (this.column.gutterOnOutside === "half gutter") {
                // columnContainer.style.transform = `translateX(${halfGutterWidthStringValue})`
            } else {
                this._columnGroupElement.style.transform = `translateX(-${halfGutterWidthStringValue})`
            }

            for (let i = 0; i < this.column.numberOfColumn; i++) {

                const leftGutter    = this.createVerticalGuid(`${i}     * ${columnWidthStringValue} + ${halfGutterWidthStringValue}`);
                const rightGutter   = this.createVerticalGuid(`${i + 1} * ${columnWidthStringValue} - ${halfGutterWidthStringValue} - 1px`);
                const centerGutter  = this.createVerticalGuid(`${i}     * ${columnWidthStringValue}`)
                centerGutter.style.fill = "hotpink";

                this._columnGroupElement.appendChild(leftGutter);
                this._columnGroupElement.appendChild(rightGutter);
                this._columnGroupElement.appendChild(centerGutter);
            }

        }
    }

    private getTotalWidthStringValue() {
        if(this.column) {
            const columnTotalWidthStringValue   = new Unit(this.column.totalWidth).stringValue;
            const gutterWidthStringValue        = new Unit(this.column.gutterWidth).stringValue;

            switch(this.column.gutterOnOutside) {
                case "half gutter"  : return `(${columnTotalWidthStringValue})`
                case "gutter width" : return `(${columnTotalWidthStringValue} + ${gutterWidthStringValue})`
                default             : return `(${columnTotalWidthStringValue} - ${gutterWidthStringValue})`
            }
        }
        return null;
    }

    private createVerticalGuid(xPosition: string) {
        const leftGutter = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        leftGutter.style.width = "1px"
        leftGutter.style.height = this._elementForGrid.getBoundingClientRect().height + "px"
        leftGutter.style.fill = "deeppink"
        leftGutter.style.transform = `translateX(calc(${xPosition}))`
        return leftGutter
    }

    private createHorizontalGuid(xPosition: string) {
        const leftGutter = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        leftGutter.style.width = this._elementForGrid.getBoundingClientRect().width + "px"
        leftGutter.style.height = "1px"
        leftGutter.style.fill = "royalblue"
        leftGutter.style.transform = `translateY(calc(${xPosition}))`
        return leftGutter
    }

    private _generateGridElement() {
        this._gridElement.remove()
        this._gridElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._elementForGrid.appendChild(this._gridElement)

        this._setGridStyle();
    }

    private _setGridStyle() {
        this._gridElement.style.width = this._elementForGrid.getBoundingClientRect().width + "px";
        this._gridElement.style.height = this._elementForGrid.getBoundingClientRect().height + "px";
        this._gridElement.style.top = "0";
        this._gridElement.style.left = "0";
        this._gridElement.style.position = "absolute";
        this._gridElement.style.zIndex = "100000";
        this._gridElement.style.pointerEvents = "none";
    }
}

export class GridUi {
    private _grids: Grid[] = []

    private _uiContainer       = document.createElement("div")

    private _buttonGrid         = document.createElement("button")
    private _buttonPlus         = document.createElement("button")
    private _buttonMoin         = document.createElement("button")
    private _buttonColumn       = document.createElement("button")
    private _buttonLineHeight   = document.createElement("button")
    private _buttonXHeight      = document.createElement("button")

    constructor(grids: Grid[]) {
        for(const grid of grids) {
            this._grids.push(grid);
        }
        this._createUiElements()
        this._uiEvents()
    }

    private _createUiElements() {

        this._buttonGrid.innerText          = "grid"
        this._buttonPlus.innerText          = "+"
        this._buttonMoin.innerText          = "-"
        this._buttonColumn.innerText        = "coll"
        this._buttonLineHeight.innerText    = "line height"
        this._buttonXHeight.innerText       = "x height"

        this._uiContainer.appendChild(this._buttonGrid)
        this._uiContainer.appendChild(this._buttonPlus)
        this._uiContainer.appendChild(this._buttonMoin)
        this._uiContainer.appendChild(this._buttonColumn)
        this._uiContainer.appendChild(this._buttonLineHeight)
        this._uiContainer.appendChild(this._buttonXHeight)

        this._buttonGrid.className          = "grid-ui-control"
        this._buttonPlus.className          = "grid-ui-control"
        this._buttonMoin.className          = "grid-ui-control"
        this._buttonColumn.className        = "grid-ui-control"
        this._buttonLineHeight.className    = "grid-ui-control"
        this._buttonXHeight.className       = "grid-ui-control"

        this._uiContainer.className = "grid-ui-container"

        document.body.appendChild(this._uiContainer)

        const styleElements = document.createElement("style")
        styleElements.innerText = `
        .grid-ui-container {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 10000000;
          line-height: 1ex;
          opacity: 0.25;
        }
        .grid-ui-container:hover {
          opacity: 1;
        }

        .grid-ui-control {
          all: unset;
          cursor: pointer;
          padding: 1ex;
          line-height: 1ex;
          display: inline-block;
          color: black;
          background: white;
          border: solid 1px;
          font-size: 10px;
          font-family: sans-serif;            
        }
        `
        document.body.appendChild(this._uiContainer)
        document.body.appendChild(styleElements)
    }

    private _uiEvents() {
        this._buttonGrid.addEventListener("click",      () => { this.forAllGridOf_grids("toggleGrid") });
        this._buttonPlus.addEventListener("click",      () => { this.forAllGridOf_grids("plus") });
        this._buttonMoin.addEventListener("click",      () => { this.forAllGridOf_grids("moin") });
        this._buttonColumn.addEventListener("click",    () => { this.forAllGridOf_grids("toggleColumn") });
        this._buttonLineHeight.addEventListener("click",() => { this.forAllGridOf_grids("toggleLineHeight") });
        this._buttonXHeight.addEventListener("click",   () => { this.forAllGridOf_grids("toggleXHeight") });
    }

    private forAllGridOf_grids(gridMethod: "toggleGrid" | "plus" | "moin" | "toggleColumn" | "toggleLineHeight" | "toggleXHeight") {
        for (const grid of this._grids) {
            // @ts-ignore
            grid[`${gridMethod}`]()
        }
    }
}

export enum UNIT {
    PIXEL   = "px",
    PERCENT = "%",
}

export interface IGrid {
    column:           false | IGridColumn
    row:              false | IGridRow
    // pixel value
    lineHeight:       number
    // pixel value
    xHeight:          number
}

export interface IGridRow {}

export interface IUnit {
    unit: UNIT;
    value: number;
}

export class Unit implements IUnit {
    public unit: UNIT;
    public value: number;

    constructor(unit: IUnit) {
        this.unit   = unit.unit
        this.value  = unit.value
    }

    public get stringValue():string {return this.value + this.unit}
}
