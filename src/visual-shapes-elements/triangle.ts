import { BaseVisualElement } from './base-visual-element';
import { TriangleConfig } from '../models/elements-config/triangle-config';
import { ColorMatrix } from '../color-matrix/color-matrix';

export class Triangle extends BaseVisualElement<TriangleConfig> {
    protected elementWidth: TriangleConfig['width'];
    
    constructor (bounds: TriangleConfig) {
        super(bounds);
        
        this.elementWidth = bounds.width;
        this.onPositions();
        this.drawTriangle();
        this.setAnchor(this.elementWidth / 2, this.elementWidth / 2);
    }
    
    private drawTriangle () {
        const triangleHeight = this.elementWidth,
            triangleHalfway = this.elementWidth / 2;
        
        // draw triangle
        this.lineStyle(0, ColorMatrix.resolveColor(this.colour), 1);
        this.moveTo(this.elementWidth, 0);
        this.lineTo(triangleHalfway, triangleHeight);
        this.lineTo(0, 0);
        this.endFill();
    }
}