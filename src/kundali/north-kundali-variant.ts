import { KundaliVariant } from "./kundali-variant";
import type { CmdTuple } from "./kundali-variant";

import { Point } from "./utils/point";

export class NorthKundaliVariant extends KundaliVariant {
    setup() {
        /**
         *
         *      (vA)   (mAT)    (mTop)   (mBT)   (vB)
         *          ┌----------------------------┐
         *          |                            |
         *     (mAL)|                            |(mBR)
         *          |                            |
         *   (mLeft)|         (center)           |(mRight)
         *          |                            |
         *     (mDL)|                            |(mCR)
         *          |                            |
         *          └----------------------------┘
         *      (vD)   (mDB)  (mBottom)  (mCB)   (vC)
         *
         */

        this.geometry['vA'] = new Point(0, 0);
        this.geometry['vB'] = new Point(this.width, 0);
        this.geometry['vC'] = new Point(this.width, this.height);
        this.geometry['vD'] = new Point(0, this.height);
        this.geometry['center'] = Point.mid(this.geometry['vA'], this.geometry['vC']);
        this.geometry['mTop'] = Point.mid(this.geometry['vA'], this.geometry['vB']);
        this.geometry['mRight'] = Point.mid(this.geometry['vB'], this.geometry['vC']);
        this.geometry['mBottom'] = Point.mid(this.geometry['vC'], this.geometry['vD']);
        this.geometry['mLeft'] = Point.mid(this.geometry['vA'], this.geometry['vD']);
        this.geometry['mAT'] = Point.mid(this.geometry['vA'], this.geometry['mTop']);
        this.geometry['mBT'] = Point.mid(this.geometry['vB'], this.geometry['mTop']);
        this.geometry['mBR'] = Point.mid(this.geometry['vB'], this.geometry['mRight']);
        this.geometry['mCR'] = Point.mid(this.geometry['vC'], this.geometry['mRight']);
        this.geometry['mCB'] = Point.mid(this.geometry['vC'], this.geometry['mBottom']);
        this.geometry['mDB'] = Point.mid(this.geometry['vD'], this.geometry['mBottom']);
        this.geometry['mDL'] = Point.mid(this.geometry['vD'], this.geometry['mLeft']);
        this.geometry['mAL'] = Point.mid(this.geometry['vA'], this.geometry['mLeft']);
        this.geometry['d1'] = Point.section(this.geometry['vA'], this.geometry['center'], 5, 4);
        this.geometry['d2'] = Point.section(this.geometry['vB'], this.geometry['center'], 5, 4);
        this.geometry['d3'] = Point.section(this.geometry['vC'], this.geometry['center'], 5, 4);
        this.geometry['d4'] = Point.section(this.geometry['vD'], this.geometry['center'], 5, 4);
    }

    defineShapes() {
        this.shapes = [
            {
                name: 1,
                label: Point.section(this.geometry['center'], this.geometry['mTop'], 1, 9),
                rasi: Point.section(this.geometry['mTop'], this.geometry['center'], 7, 17),
                outlines: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mTop']),
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mTop']),
                    [
                        ['M', this.geometry['d1']],
                        ['L', this.geometry['center']],
                        ['M', this.geometry['center']],
                        ['L', this.geometry['d2']],
                    ],
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mTop'], this.geometry['center']),
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mTop'], this.geometry['center'])
                ],
                planet: {
                    type: "grid",
                    center: Point.section(this.geometry["mTop"],
                        this.geometry["center"],
                        10,
                        9,
                    ),
                }
            },
            {
                name: 2,
                label: Point.section(this.geometry['d1'], this.geometry['mAT'], 2, 9),
                rasi: Point.section(this.geometry['vA'], this.geometry['mTop'], 4, 11),
                outlines: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mTop'], this.geometry['vA'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mTop'], this.geometry['vA'])
                ],
                planet: {
                    type: "grid",
                    center: Point.section(Point.section(this.geometry["mAT"], this.geometry["mTop"], 2, 7),
                        this.geometry["d1"],
                        5,
                        13)
                }
            },
            {
                name: 3,
                label: Point.section(this.geometry['d1'], this.geometry['mAL'], 2, 9),
                rasi: Point.section(this.geometry['vA'], this.geometry['mLeft'], 14, 19),
                outlines: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mLeft'], this.geometry['vA'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mLeft'], this.geometry['vA'])
                ],
                planet: {
                    type: "line",
                    center: Point.section(this.geometry["vA"],
                        this.geometry["mLeft"],
                        11,
                        7)
                }
            },
            {
                name: 4,
                label: Point.section(this.geometry['center'], this.geometry['mLeft'], 1, 9),
                rasi: Point.section(this.geometry['mLeft'], this.geometry['center'], 4, 17),
                outlines: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mLeft']),
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mLeft']),
                    [
                        ['M', this.geometry['d1']],
                        ['L', this.geometry['center']],
                        ['M', this.geometry['center']],
                        ['M', this.geometry['d4']],
                    ],
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vA'], this.geometry['d1'], this.geometry['mLeft'], this.geometry['center']),
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mLeft'], this.geometry['center'])
                ],
                planet: {
                    type: "line",
                    center: Point.section(this.geometry["mLeft"],
                        Point.mid(this.geometry["d1"], this.geometry["d4"]),
                        7,
                        3)
                }
            },
            {
                name: 5,
                label: Point.section(this.geometry['d4'], this.geometry['mDL'], 2, 9),
                rasi: Point.section(this.geometry['vD'], this.geometry['mLeft'], 14, 19),
                outlines: [
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mLeft'], this.geometry['vD'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mLeft'], this.geometry['vD'])
                ],
                planet: {
                    type: "line",
                    center: Point.section(this.geometry["vD"],
                        this.geometry["mLeft"],
                        8,
                        7)
                }
            },
            {
                name: 6,
                label: Point.section(this.geometry['d4'], this.geometry['mDB'], 2, 9),
                rasi: Point.section(this.geometry['vD'], this.geometry['mBottom'], 4, 11),
                outlines: [
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mBottom'], this.geometry['vD'])
                ],
                regions: [
                    (
                        this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mBottom'], this.geometry['vD'])
                    ),
                ],
                planet: {
                    type: "grid",
                    center: Point.section(Point.section(this.geometry["mDB"], this.geometry["mBottom"], 2, 7),
                        this.geometry["d4"],
                        5,
                        13)
                }
            },
            {
                name: 7,
                label: Point.section(this.geometry['center'], this.geometry['mBottom'], 1, 9),
                rasi: Point.section(this.geometry['mBottom'], this.geometry['center'], 7, 17),
                outlines: [
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mBottom']),
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mBottom']),
                    [
                        ['M', this.geometry['d3']],
                        ['L', this.geometry['center']],
                        ['M', this.geometry['center']],
                        ['L', this.geometry['d4']],
                    ],
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vD'], this.geometry['d4'], this.geometry['mBottom'], this.geometry['center']),
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mBottom'], this.geometry['center'])
                ],
                planet: {
                    type: "grid",
                    center: Point.section(this.geometry["mBottom"],
                        this.geometry["center"],
                        10,
                        9)
                }
            },
            {
                name: 8,
                label: Point.section(this.geometry['d3'], this.geometry['mCB'], 2, 9),
                rasi: Point.section(this.geometry['vC'], this.geometry['mBottom'], 4, 11),
                outlines: [
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mBottom'], this.geometry['vC'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mBottom'], this.geometry['vC'])
                ],
                planet: {
                    type: "grid",
                    center: Point.section(Point.section(this.geometry["mCB"], this.geometry["mBottom"], 2, 7),
                        this.geometry["d3"],
                        5,
                        13)
                }
            },
            {
                name: 9,
                label: Point.section(this.geometry['d3'], this.geometry['mCR'], 2, 9),
                rasi: Point.section(this.geometry['vC'], this.geometry['mRight'], 14, 19),
                outlines: [
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mRight'], this.geometry['vC'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mRight'], this.geometry['vC'])
                ],
                planet: {
                    type: "line",
                    center: Point.section(this.geometry["vC"],
                        this.geometry["mRight"],
                        8,
                        7,
                    ),
                    align: "right",
                }
            },

            {
                name: 10,
                label: Point.section(this.geometry['center'], this.geometry['mRight'], 1, 9),
                rasi: Point.section(this.geometry['mRight'], this.geometry['center'], 4, 17),
                outlines: [
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mRight']),
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mRight']),
                    [
                        ['M', this.geometry['d2']],
                        ['L', this.geometry['center']],
                        ['M', this.geometry['center']],
                        ['L', this.geometry['d3']],
                    ],
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vC'], this.geometry['d3'], this.geometry['mRight'], this.geometry['center']),
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mRight'], this.geometry['center'])
                ],
                planet: {
                    type: "line",
                    center: Point.section(this.geometry["mRight"],
                        Point.mid(this.geometry["d2"], this.geometry["d3"]),
                        7,
                        3,
                    ),
                    align: "right",
                }
            },
            {
                name: 11,
                label: Point.section(this.geometry['d2'], this.geometry['mBR'], 2, 9),
                rasi: Point.section(this.geometry['vB'], this.geometry['mRight'], 14, 19),
                outlines: [
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mRight'], this.geometry['vB'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mRight'], this.geometry['vB'])
                ],
                planet: {
                    type: "line",
                    center: Point.section(this.geometry["vB"],
                        this.geometry["mRight"],
                        11,
                        7,
                    ),
                    align: "right",
                }
            },
            {
                name: 12,
                label: Point.section(this.geometry['d2'], this.geometry['mBT'], 2, 9),
                rasi: Point.section(this.geometry['vB'], this.geometry['mTop'], 4, 11),
                outlines: [
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mTop'], this.geometry['vB'])
                ],
                regions: [
                    this.getShapeCommands(this.geometry['vB'], this.geometry['d2'], this.geometry['mTop'], this.geometry['vB'])
                ],
                planet: {
                    type: "grid",
                    center: Point.section(Point.section(this.geometry["mBT"], this.geometry["mTop"], 1, 7),
                        this.geometry["d2"],
                        5,
                        13,
                    )
                }
            },
        ];
    }

    getShapeCommands(vertex: Point, moveTo: Point, curveTo: Point, lineTo?: Point): CmdTuple[] {
        const cp1RefPoint = Point.mid(vertex, curveTo);
        const controlPoint1 = Point.section(moveTo, cp1RefPoint, 7, 5);
        const controlPoint2 = Point.section(curveTo, this.geometry['center'], 4, 5);

        let commands: CmdTuple[] = [
            ['M', moveTo],
            ['C', controlPoint1, controlPoint2, curveTo],
        ];

        if (lineTo) {
            commands = [
                ...commands,
                ['L', lineTo]
            ];
        }

        return commands;
    }

    getWatermarkCommands(): CmdTuple[] {
        return ([
            ['M', new Point(this.geometry['center'].x - 70, this.geometry['center'].y)],
            [
                'Q',
                new Point(this.geometry['center'].x, this.geometry['center'].y + 90),
                new Point(this.geometry['center'].x + 70, this.geometry['center'].y),
            ],
        ]);
    }
}