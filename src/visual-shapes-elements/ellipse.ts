import { BaseVisualElement } from './base-visual-element';
import { EllipseConfig } from '../models/elements-config/ellipse-config';

export class Ellipse extends BaseVisualElement<EllipseConfig> {
    protected halfWidth: EllipseConfig['halfWidth'];
    protected halfHeight: EllipseConfig['halfHeight'];
    
    constructor (bounds: EllipseConfig) {
        super(bounds);
    
        this.halfWidth = bounds.halfWidth;
        this.halfHeight = bounds.halfHeight;
        this.drawEllipseShape();
    }
    
    private drawEllipseShape () {
        this.drawEllipse(this.positionX, this.positionY, this.halfWidth, this.halfHeight);
    }
}
