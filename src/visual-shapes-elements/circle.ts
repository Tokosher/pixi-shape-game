import { BaseVisualElement } from './base-visual-element';
import { CircleConfig } from '../models/elements-config/circle-config';

export class Circle extends BaseVisualElement<CircleConfig> {
    protected radius: CircleConfig['radius'];
    
    constructor (bounds: CircleConfig) {
        super(bounds);
        
        this.radius = bounds.radius;
        this.drawCircleShape();
    }
 
    private drawCircleShape () {
        this.drawCircle(this.positionX, this.positionY, this.radius);
    }
}