import { KundaliVariant } from "./kundali-variant";
import type { CmdTuple } from "./kundali-variant";
import { Point } from "./utils/point";

export class EastKundaliVariant extends KundaliVariant {
  setup() {
    // Define the grid points for a 3x3 grid
    //     v00─────v10─────────v20─────v30
    //      ┌──────┬───────────┬──────┐
    //      │ H2  ╲│           │╱ H12 │
    //      │ H3  ╱│    H1     │╲ H11 │
    //  v01 ├──────┼───────────┼──────┤ v31
    //      │ H4   │           │  H10 │
    //  v02 ├──────┼───────────┼──────┤ v32
    //      │ H5  ╱│    H7     │╲ H9  │
    //      │ H6  ╲│           │╱ H8  │
    //      └──────┴───────────┴──────┘
    //     v03─────v13─────────v23─────v33

    const cellWidth = this.width / 3; // Width of each cell
    const cellHeight = this.height / 3; // Height of each cell

    this.geometry["v00"] = new Point(0, 0);
    this.geometry["v10"] = new Point(cellWidth, 0);
    this.geometry["v20"] = new Point(2 * cellWidth, 0);
    this.geometry["v30"] = new Point(3 * cellWidth, 0);
    this.geometry["v01"] = new Point(0, cellHeight);
    this.geometry["v11"] = new Point(cellWidth, cellHeight);
    this.geometry["v21"] = new Point(2 * cellWidth, cellHeight);
    this.geometry["v31"] = new Point(3 * cellWidth, cellHeight);
    this.geometry["v02"] = new Point(0, 2 * cellHeight);
    this.geometry["v12"] = new Point(cellWidth, 2 * cellHeight);
    this.geometry["v22"] = new Point(2 * cellWidth, 2 * cellHeight);
    this.geometry["v32"] = new Point(3 * cellWidth, 2 * cellHeight);
    this.geometry["v03"] = new Point(0, 3 * cellHeight);
    this.geometry["v13"] = new Point(cellWidth, 3 * cellHeight);
    this.geometry["v23"] = new Point(2 * cellWidth, 3 * cellHeight);
    this.geometry["v33"] = new Point(3 * cellWidth, 3 * cellHeight);
  }

  defineShapes() {
    this.shapes = [
      {
        name: 2,
        label: Point.section(this.geometry["v10"], this.geometry["v11"], 9, 1), 
        rasi: Point.section(this.geometry["v00"], this.geometry["v10"], 1, 2), 
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v00"],
            this.geometry["v11"],
            this.geometry["v10"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v00"],
            this.geometry["v11"],
            this.geometry["v10"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v10"],
            this.geometry["v01"],
            1,
            1.5
          ),
        },
      },
      {
        name: 1,
        label: Point.section(this.geometry["v11"], this.geometry["v21"], 1, 1),
        rasi: Point.section(this.geometry["v10"], this.geometry["v20"], 1, 1),
        outlines: [
          this.getShapeCommands(
            "square",
            this.geometry["v10"],
            this.geometry["v20"],
            this.geometry["v21"],
            this.geometry["v11"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "square",
            this.geometry["v10"],
            this.geometry["v20"],
            this.geometry["v21"],
            this.geometry["v11"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v10"],
            this.geometry["v21"],
            1,
            1
          ),
        },
      },
      {
        name: 12,
        label: Point.section(this.geometry["v20"], this.geometry["v21"], 6, 1),
        rasi: Point.section(this.geometry["v20"], this.geometry["v30"], 9, 1),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v20"],
            this.geometry["v30"],
            this.geometry["v21"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v20"],
            this.geometry["v30"],
            this.geometry["v21"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v20"],
            this.geometry["v21"],
            1,
            1.5
          ),
        },
      },
      {
        name: 11,
        label: Point.section(this.geometry["v31"], this.geometry["v21"], 6, 1),
        rasi: Point.section(this.geometry["v30"], this.geometry["v31"], 29, 1),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v30"],
            this.geometry["v21"],
            this.geometry["v31"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v30"],
            this.geometry["v21"],
            this.geometry["v31"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v30"],
            this.geometry["v31"],
            2,
            1.5
          ),
          align: "right",
        },
      },
      {
        name: 10,
        label: Point.section(this.geometry["v21"], this.geometry["v22"], 1, 1),
        rasi: Point.section(this.geometry["v32"], this.geometry["v31"], 1, 1),
        outlines: [
          this.getShapeCommands(
            "square",
            this.geometry["v31"],
            this.geometry["v21"],
            this.geometry["v22"],
            this.geometry["v32"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "square",
            this.geometry["v31"],
            this.geometry["v21"],
            this.geometry["v22"],
            this.geometry["v32"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v21"],
            this.geometry["v32"],
            1,
            1
          ),
        },
      },
      {
        name: 9,
        label: Point.section(this.geometry["v22"], this.geometry["v33"], 1, 7),
        rasi: Point.section(this.geometry["v32"], this.geometry["v33"], 1, 7),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v32"],
            this.geometry["v22"],
            this.geometry["v33"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v32"],
            this.geometry["v22"],
            this.geometry["v33"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v32"],
            this.geometry["v33"],
            1,
            2
          ),
          align:"right"
        },
      },
      {
        name: 8,
        label: Point.section(this.geometry["v22"], this.geometry["v23"], 1, 4),
        rasi: Point.section(this.geometry["v33"], this.geometry["v23"], 1, 3),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v33"],
            this.geometry["v22"],
            this.geometry["v23"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v33"],
            this.geometry["v22"],
            this.geometry["v23"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v22"],
            this.geometry["v23"],
            1.5,
            1
          ),
        },
      },
      {
        name: 7,
        label: Point.section(this.geometry["v12"], this.geometry["v22"], 1, 1),
        rasi: Point.section(this.geometry["v13"], this.geometry["v23"], 1, 1),
        outlines: [
          this.getShapeCommands(
            "square",
            this.geometry["v23"],
            this.geometry["v22"],
            this.geometry["v12"],
            this.geometry["v13"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "square",
            this.geometry["v23"],
            this.geometry["v22"],
            this.geometry["v12"],
            this.geometry["v13"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v12"],
            this.geometry["v23"],
            1,
            1
          ),
        },
      },
      {
        name: 6,
        label: Point.section(this.geometry["v12"], this.geometry["v13"], 1, 4),
        rasi: Point.section(this.geometry["v03"], this.geometry["v13"], 1, 4),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v03"],
            this.geometry["v12"],
            this.geometry["v13"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v03"],
            this.geometry["v12"],
            this.geometry["v13"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v12"],
            this.geometry["v13"],
            1.2,
            1
          ),
          align:"right"
        },
      },
      {
        name: 5,
        label: Point.section(this.geometry["v03"], this.geometry["v12"], 7, 1),
        rasi: Point.section(this.geometry["v02"], this.geometry["v03"], 1, 7),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v03"],
            this.geometry["v12"],
            this.geometry["v02"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v03"],
            this.geometry["v12"],
            this.geometry["v02"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v02"],
            this.geometry["v03"],
            1,
            2
          ),
        },
      },
      {
        name: 4,
        label: Point.section(this.geometry["v11"], this.geometry["v12"], 1, 1),
        rasi: Point.section(this.geometry["v02"], this.geometry["v01"], 1, 1),
        outlines: [
          this.getShapeCommands(
            "square",
            this.geometry["v02"],
            this.geometry["v12"],
            this.geometry["v11"],
            this.geometry["v01"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "square",
            this.geometry["v02"],
            this.geometry["v12"],
            this.geometry["v11"],
            this.geometry["v01"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v01"],
            this.geometry["v12"],
            1,
            1
          ),
        },
      },
      {
        name: 3,
        label: Point.section(this.geometry["v01"], this.geometry["v11"], 7, 1),
        rasi: Point.section(this.geometry["v01"], this.geometry["v11"], 0, 12),
        outlines: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v01"],
            this.geometry["v11"],
            this.geometry["v00"]
          ),
        ],
        regions: [
          this.getShapeCommands(
            "triangle",
            this.geometry["v01"],
            this.geometry["v11"],
            this.geometry["v00"]
          ),
        ],
        planet: {
          type: "line",
          center: Point.section(
            this.geometry["v00"],
            this.geometry["v01"],
            1,
            1.5
          ),
        },
      },
    ];
  }

  getShapeCommands(
    shapeType: "square" | "triangle",
    topLeft?: Point,
    topRight?: Point,
    bottomRight?: Point,
    bottomLeft?: Point
  ): CmdTuple[] {
    const resolvedTopLeft = topLeft || new Point(0, 0);
    const resolvedTopRight = topRight || new Point(this.width / 3, 0);
    const resolvedBottomRight =
      bottomRight || new Point(this.width / 3, this.height / 3);
    const resolvedBottomLeft = bottomLeft || new Point(0, this.height / 3);

    if (shapeType === "square") {
      return [
        ["M", resolvedTopLeft],
        [
          "L",
          resolvedTopRight,
          resolvedBottomRight,
          resolvedBottomLeft,
          resolvedTopLeft,
        ], // Draw lines to form a square
      ];
    } else if (shapeType === "triangle") {
      return [
        ["M", resolvedTopLeft],
        ["L", resolvedTopRight, resolvedBottomRight],
      ];
    } else {
      throw new Error(`Unsupported shape type: ${shapeType}`);
    }
  }

  getWatermarkCommands(): CmdTuple[] {
    const center = Point.mid(this.geometry["v00"], this.geometry["v33"]);
    const offsetX = 70;
    const offsetY = 0;
    return [
      ["M", new Point(center.x - offsetX, center.y)],
      [
        "Q",
        new Point(center.x, center.y + offsetY),
        new Point(center.x + offsetX, center.y),
      ],
    ];
  }
}
