import { BaseVisualElement } from './base-visual-element';
import { RectangleConfig } from '../models/elements-config/rectangle-config';

export class Rectangle extends BaseVisualElement<RectangleConfig> {
    protected elementWidth: RectangleConfig['width'];
    protected elementHeight: RectangleConfig['height'];
    
    constructor (bounds: RectangleConfig) {
        super(bounds);
        
        this.elementWidth = bounds.width;
        this.elementHeight = bounds.height;
        this.drawRectangle();
        this.setAnchor(this.elementWidth / 2, this.elementHeight / 2);
    }
    
    private drawRectangle () {
        this.drawRect(this.positionX, this.positionY,this.elementWidth, this.elementHeight);
    }
}