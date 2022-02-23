import { ColorAliases } from '../../color-matrix/color-aliases';

export interface BaseElementConfig {
    x: number;
    y: number;
    colour: number | ColorAliases;
}