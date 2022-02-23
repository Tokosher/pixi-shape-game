import { BaseElementConfig } from '../models/elements-config/base-element-config';
import * as PIXI from 'pixi.js';
import { ColorMatrix } from '../color-matrix/color-matrix';

export abstract class BaseVisualElement<T extends BaseElementConfig = BaseElementConfig> extends PIXI.Graphics {
    protected positionX: BaseElementConfig['x'];
    protected positionY: BaseElementConfig['y'];
    protected colour: BaseElementConfig['colour'];
    
    protected constructor (bounds: BaseElementConfig) {
        super();
        this.positionX = bounds.x;
        this.positionY = bounds.y;
        this.colour = bounds.colour;
        
        this.setColour(ColorMatrix.resolveColor(this.colour));
    }
    
    protected onPositions () {
        this.x = this.positionX;
        this.y = this.positionY;
    }
    
    protected setAnchor (xIndent, yIndent) {
        this.pivot.set(xIndent, yIndent);
    }
    
    private setColour (colour: number) {
        this.beginFill(colour, 1);
    }
    
}