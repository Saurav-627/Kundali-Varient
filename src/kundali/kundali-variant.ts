import { svg, TemplateResult } from "lit";
import { Point } from "/src/kundali/utils/point";

import { RASI_NAMES } from "./utils/constants";
import { isObjectEmpty } from "/src/utils/helper";

export interface IKundaliGeometry {
    [key: string]: Point;
}

export interface IPlanetsGeometry {
    center: Point;
    type: "line" | "grid";
    align?: string;
}

export interface IShape {
    name: number;
    label: Point;
    rasi: Point;
    outlines: CmdTuple[][];
    regions: CmdTuple[][];
    planet: IPlanetsGeometry;
}

export type NamedShape = Record<number, IShape>;

export type Planet = {
    name: string;
    displayName: string;
}

export type Zodiac = {
    name: string;
    displayName: string;
}

export type House = {
    name: number;
    displayName: string;
    zodiac: Zodiac;
    planets: Planet[];
}

export type NamedHouse = Record<number, House>;

const defaultHouses: NamedHouse = RASI_NAMES.reduce((result: NamedHouse, zodiac_name: string, index: number) => {
    const code = index + 1;
    const house: House = {
        name: code,
        displayName: `${code}`,
        zodiac: {
            name: zodiac_name,
            displayName: zodiac_name,
        },
        planets: [],
    };
    result[code] = house;

    return { ...result, [code]: house };

}, {} as NamedHouse);

export interface IGetRegionsConfig {
    houses: NamedHouse;
    onClick(shape: IShape, point: Point): void;
}


// Define the tuple type
export type CmdTuple = ["M" | "C" | "L" | "Q", ...Point[]];

export abstract class KundaliVariant {
    geometry: IKundaliGeometry = {};
    shapes: IShape[] = [];

    constructor(public width: number, public height: number, public debug: boolean = false) {
        this.setup();
        this.defineShapes();
    }

    abstract setup(): void;
    abstract defineShapes(): void;
    abstract getWatermarkCommands(): CmdTuple[];

    get border(): TemplateResult {
        return svg`
            <rect
                x="0"
                y="0"
                width="${this.width}"
                height="${this.height}"
                class="border"
            />
        `;
    }

    get outlines(): TemplateResult[] {
        return this.shapes.map(shape => {
            const outlines = shape.outlines.map(outline => {
                return svg`<path d="${this.toSVGPath(outline)}""/>`
            });

            return svg`<g 
                class="outline">
                    ${outlines}
                </g>`
        });
    }

    getRegions(config: IGetRegionsConfig): TemplateResult[] {
        const zodiacNamesLower = RASI_NAMES.map(r => r.toLowerCase());
        const houses: NamedHouse = isObjectEmpty(config.houses)
            ? defaultHouses
            : config.houses;

        return this.shapes.map(shape => {
            const house = houses[shape.name];

            let planets: TemplateResult;

            const regions = shape.regions.map(region => {
                return svg`<path d="${this.toSVGPath(region)}""/>`
            });

            const labelText = zodiacNamesLower.indexOf(house.zodiac.name.toLowerCase()) + 1;
            const label = svg`
            <text class="label label-${shape.name}" x="${shape.label.x}" y="${shape.label.y}">
                ${labelText}
            </text>
            `;

            const rasiLabel = svg`
                <text class="rasi-label rasi-label-${shape.name}" x="${shape.rasi.x}" y="${shape.rasi.y}">
                    ${house.zodiac.displayName}
                </text>
            `;

            if (shape.planet.type == "grid") {
                planets = this.getPlanetsGrid(house.planets, shape.planet.center);
            } else {
                planets = this.getPlanetsLine(house.planets, shape.planet.center, shape.planet.align);
            }

            const handleOnClick = (e: MouseEvent) => {
                const point = new Point(e.offsetX, e.offsetY);
                config.onClick(shape, point);
            }

            return svg`<g
                class="region" 
                @click="${handleOnClick}"
                >
                    ${house?.zodiac ? rasiLabel : ""}
                    ${regions}
                    ${label}
                    ${planets}
                </g>`
        });
    }

    getWatermark(text: string): TemplateResult {
        return svg`
                <g>
                    <path id="watermark"  d="${this.toSVGPath(this.getWatermarkCommands())}" />
    
                    <text class="watermark-text">
                        <textPath href="#watermark" lengthAdjust="spacingAndGlyphs" startOffset="50%" text-anchor="middle" dominant-baseline="middle">
                        ${text}
                        </textPath>
                    </text>
                </g>
            `
    }

    toSVGPath(commands: CmdTuple[]): string {
        let paths = [];

        for (let cmd of commands) {
            const [name, ...points] = cmd;

            if (!points.length) {
                continue;
            }

            paths.push(`${name} ${points.map((p) => p.x_y).join(', ')}`);

            if (name == 'L') {
                paths.push('Z');
            }
        }

        return paths.join(' ');
    }

    get namedShapes(): NamedShape {
        return this.shapes.reduce((result: NamedShape, shape: IShape) => {
            result[shape.name] = shape;

            return result;
        }, ({} as NamedShape));
    }

    getDot(center: Point, radius: number = 4, fillColor: string = 'red'): TemplateResult {

        return svg`
            <circle cx="${center.x}" cy="${center.y}" r="${radius}" fill="${fillColor}" />
        `;
    }

    getPlanetsGrid(planets: Planet[], center: Point, boxWidth: number = 160): TemplateResult {
        const paddingX = boxWidth / 7.5;
        const paddingY = boxWidth / 7.5;
        const boxHeight = boxWidth / 2.2;

        const cx = boxWidth / 2;
        const cy = boxHeight / 2;

        const coords: Record<string, Record<string, any>> = {
            topLeft: {
                x: paddingX,
                y: paddingY,
                anchor: 'start',
                baseline: 'hanging',
            },
            topRight: {
                x: boxWidth - paddingX,
                y: paddingY,
                anchor: 'end',
                baseline: 'hanging',
            },
            bottomLeft: {
                x: paddingX,
                y: boxHeight - paddingY,
                anchor: 'start',
                baseline: 'baseline',
            },
            bottomRight: {
                x: boxWidth - paddingX,
                y: boxHeight - paddingY,
                anchor: 'end',
                baseline: 'baseline',
            },
            topCenter: {
                x: cx,
                y: paddingY,
                anchor: 'middle',
                baseline: 'hanging',
            },
            bottomCenter: {
                x: cx,
                y: boxHeight - paddingY,
                anchor: 'middle',
                baseline: 'baseline',
            },
            leftCenter: {
                x: paddingX,
                y: cy,
                anchor: 'start',
                baseline: 'middle',
            },
            rightCenter: {
                x: boxWidth - paddingX,
                y: cy,
                anchor: 'end',
                baseline: 'middle',
            },
            center: { x: cx, y: cy, anchor: 'middle', baseline: 'middle' },
        };

        const positions = planetGridLayout[planets.length] || planetGridLayout[9];

        const translateX = center.x - cx;
        const translateY = center.y - cy;

        const rect = svg`
            <rect x="${paddingX}" y="${paddingY}" width="${boxWidth - 2 * paddingX}" height="${boxHeight - 2 * paddingY}" stroke="red">
            </rect>
        `;

        let texts: TemplateResult[] = [];

        planets.forEach((planet, i) => {
            const key = positions[i];
            const { x, y, anchor, baseline } = coords[key];

            texts.push(svg`
                <text
                    class="planet planet-${planet.name.toLocaleLowerCase()}"
                    x="${x}" 
                    y="${y}" 
                    text-anchor="${anchor}" 
                    dominant-baseline="${baseline}" 
                >
                    ${planet.displayName}
                </text>
            `);
        });

        return svg`<g class="planet-grid" transform="translate(${translateX}, ${translateY})">
            ${texts}
            ${this.debug && rect || null}
        </g>`;
    }

    getPlanetsLine(
        planets: Planet[],
        center: Point,
        align: string = 'left',
        lineHeight: number = 100
    ) {
        const totalSegments = 9;
        const topY = center.y - lineHeight / 2;
        const step = lineHeight / (totalSegments - 1);
        const centerIndex = Math.floor(totalSegments / 2); // index 4

        const line = svg`
            <line x1="${center.x}" y1="${topY}" x2="${center.x}" y2="${topY + step * (totalSegments - 1)}" stroke="black" stroke-width="2" />
        `;

        const count = planets.length;
        let planetIndices = [];

        if (count % 2 === 1) {
            // Odd: include center
            planetIndices.push(centerIndex); // center
            const half = Math.floor(count / 2);
            for (let i = 1; i <= half; i++) {
                planetIndices.unshift(centerIndex - i);
                planetIndices.push(centerIndex + i);
            }
        } else {
            // Even: exclude center but stay close
            const half = count / 2;
            const start = centerIndex - half + 0.5; // e.g., 4 - 2 + 0.5 = 2.5
            for (let i = 0; i < count; i++) {
                planetIndices.push(Math.round(start + i));
            }
        }

        // Align text on left or right
        const isRight = align === 'right';
        const xOffset = isRight ? -5 : 5;
        const anchor = isRight ? 'end' : 'start';

        let texts: TemplateResult[] = []

        // Draw text
        planetIndices.forEach((segIndex, i) => {
            const planet = planets[i];
            const y = topY + segIndex * step;

            texts.push(svg`
            <text
                class="planet planet-${planet.name.toLocaleLowerCase()}"
                x="${center.x + xOffset}"
                y="${y}"
                text-anchor="${anchor}"
                dominant-baseline="middle"
            >
                ${planet.displayName}
            </text>
        `);
        });

        return svg`
            <g class="planet-line">
                ${texts}
                ${this.debug && line || null}
            </g>
        `;
    }
}


const planetGridLayout: Record<number, string[]> = {
    1: ['center'],
    2: ['topCenter', 'bottomCenter'],
    3: ['topCenter', 'center', 'bottomCenter'],
    4: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    5: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
    6: [
        'topLeft',
        'leftCenter',
        'bottomLeft',
        'topRight',
        'rightCenter',
        'bottomRight',
    ],
    7: [
        'topLeft',
        'leftCenter',
        'bottomLeft',
        'center',
        'topRight',
        'rightCenter',
        'bottomRight',
    ],
    8: [
        'topLeft',
        'topCenter',
        'topRight',
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
        'leftCenter',
        'rightCenter',
    ],
    9: [
        'topLeft',
        'topCenter',
        'topRight',
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
        'leftCenter',
        'rightCenter',
        'center',
    ],
};