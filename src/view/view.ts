import * as PIXI from 'pixi.js';
import { FieldTypes } from './view.model';

export class View {
    app: PIXI.Application;
    shapeCounter = document.querySelector('#shapesCount');
    squareAreaTextField = document.querySelector('#square');
    shapesPerSecField = document.querySelector('#shapesCountPerSec');
    gravityValueField = document.querySelector('#gravityValue');
    decrementButtonShapes = document.querySelector('#decrementButtonShapes');
    incrementButtonShapes = document.querySelector('#incrementButtonShapes');
    
    addChild (child: PIXI.Graphics | PIXI.Sprite): void {
        this.app.stage.addChild(child);
    }
    
    removeChild (child: PIXI.Graphics | PIXI.Sprite): void {
        child.destroy();
        this.app.stage.removeChild(child);
    }
    
    appendChildToBody (selector: string, newChild) {
        document.body.querySelector(selector).appendChild(newChild);
    }
    
    updateShapeCounter (): void {
        this.updateTextField('shapesOnScreen', `${this.app.stage.children.length - 1}`);
    }
    
    updateSquareArea (v: number): void {
        const currentSquareValue = this.getFieldValue('shapesArea');
        this.updateTextField('shapesArea', (currentSquareValue + v).toString());
    } // view
    
    updateTextField (field: FieldTypes, value: string) {
        switch (field) {
            case 'shapesOnScreen':
                this.shapeCounter.innerHTML = value;
                break;
            case 'shapesArea':
                this.squareAreaTextField.innerHTML = value;
                break;
            case 'shapesPerSec':
                this.shapesPerSecField.innerHTML = value;
                break;
            case 'gravity':
                this.gravityValueField.innerHTML = value;
                break;
        }
    } // view
    
    getFieldValue (field: FieldTypes): number {
        switch (field) {
            case 'shapesOnScreen':
                return +this.shapeCounter.innerHTML;
            case 'shapesArea':
                return +this.squareAreaTextField.innerHTML;
            case 'shapesPerSec':
                return +this.shapesPerSecField.innerHTML;
            case 'gravity':
                return +this.gravityValueField.innerHTML;
        }
    } // model view
}