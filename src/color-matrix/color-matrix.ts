import { ColorAliases } from './color-aliases';

export const colours: ColorAliases[] = [
    'red',
    'orange',
    'yellow',
    'lightgreen',
    'magenta',
    'white',
    'blue'
]

export const ColorMatrix = (() => {
    const matrix: { [alias in ColorAliases]: { code: number } } = {
        red: {code: 0xFF0000},
        orange: {code: 0xFFA500},
        yellow: {code: 0xFFFF00},
        lightgreen: {code: 0x90EE90},
        magenta: {code: 0xFF00FF},
        white: {code: 0xFFFFFF},
        blue: {code: 0x3944BC},
    };
    
    return {
        resolveColor (color: ColorAliases | number): number {
            if (typeof color === 'string') {
                const alias = matrix[color];
                if (alias) {
                    return alias.code;
                } else {
                    console.warn(`Cannot find alias "${color}" in color matrix`);
                }
            } else {
                return color;
            }
        }
    };
})();


