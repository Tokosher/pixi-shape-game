import { ColorAliases } from '../color-matrix/color-aliases';

export type ShapeTypes = 'triangle' | 'rect' | 'pentagon' | 'hexagon' | 'circle' | 'ellipse' | 'customShape';

export interface CalculatingBounds {
    width?: number;
    height?: number;
    radius?: number;
    halfWidth?: number;
    halfHeight?: number;
    sides?: number;
}

export interface Bounds {
    /**
     * Game area width
     * @default 800
     */
    areaWidth?: number;
    
    /**
     * Game area height
     * @default 600
     */
    areaHeight?: number;
    
    /**
     * P.S. If you specify min height, width more than max height, width, it will be range from "max" to "min"
     * So, I rec you specify the range of min and max bounds
     */
    
    /**
     * Minimal width of shape
     * @default 50
     */
    minShapeWidth?: number;
    
    /**
     * Minimal height of shape
     * @default 50
     */
    minShapeHeight?: number;
    
    /**
     * Max width of shape
     * @default 100
     */
    maxShapeWidth?: number;
    
    /**
     * Max height of shape
     * @default 100
     */
    maxShapeHeight?: number;
    
    /**
     * Minimal radius of pentagon, hexagon, circle and custom shape
     * @default 5
     */
    minRadius?: number;
    
    /**
     * Max radius of pentagon, hexagon, circle and custom shape
     * @default 20
     */
    maxRadius?: number;
    
    /**
     * Max sides of custom shape
     * @default 10
     */
    maxSides?: number;
    
    /**
     * Max gravity value
     * @default 15
     */
    maxGravity?: number
    
    /**
     * Max gravity value
     * @default 100
     */
    maxShapePerSec?: number
    
    /**
     * Background colour
     * @default 0xAAAAAA
     */
    bgColor?: number | ColorAliases
    
    /**
     * Animation timeout in ms
     * @default 2500
     */
    animationSpeed?: number;
}