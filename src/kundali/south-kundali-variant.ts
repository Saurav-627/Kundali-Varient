import { KundaliVariant } from "./kundali-variant";
import type { CmdTuple } from "./kundali-variant";
import { Point } from "./utils/point";

export class SouthKundaliVariant extends KundaliVariant {
  setup() {
    //    v= vertex, h= house
    //
    //    v00    v10    v20    v30    v40
    //     ┌──────┬──────┬──────┬──────┐
    //     │      │      │      │      │
    //     │ H12  │ H1   │ H2   │ H3   │
    // v01 ├──────┼──────┼──────┼──────┤ v41
    //     │      │ v11 v21 v31 │      │
    //     │ H11  │             │ H4   │
    // v02 ├──────┼             ┼──────┤ v42
    //     │      │ v12 v22 v32 │      │
    //     │ H10  │             │ H5   │
    // v03 ├──────┼──────┼──────┼──────┤ v43
    //     │      │ v13  │v23   │v33   │
    //     │ H9   │ H8   │ H7   │ H6   │
    //     └──────┴──────┴──────┴──────┘
    //    v04    v14    v24    v34    v44

    const cellWidth = this.width / 4; // 400
    const cellHeight = this.height / 4; // 300

    this.geometry["v00"] = new Point(0, 0);
    this.geometry["v10"] = new Point(cellWidth, 0);
    this.geometry["v20"] = new Point(2 * cellWidth, 0);
    this.geometry["v30"] = new Point(3 * cellWidth, 0);
    this.geometry["v40"] = new Point(this.width, 0);
    this.geometry["v01"] = new Point(0, cellHeight);
    this.geometry["v11"] = new Point(cellWidth, cellHeight);
    this.geometry["v21"] = new Point(2 * cellWidth, cellHeight);
    this.geometry["v31"] = new Point(3 * cellWidth, cellHeight);
    this.geometry["v41"] = new Point(this.width, cellHeight);
    this.geometry["v02"] = new Point(0, 2 * cellHeight);
    this.geometry["v12"] = new Point(cellWidth, 2 * cellHeight);
    this.geometry["v22"] = new Point(2 * cellWidth, 2 * cellHeight);
    this.geometry["v32"] = new Point(3 * cellWidth, 2 * cellHeight);
    this.geometry["v42"] = new Point(this.width, 2 * cellHeight);
    this.geometry["v03"] = new Point(0, 3 * cellHeight);
    this.geometry["v13"] = new Point(cellWidth, 3 * cellHeight);
    this.geometry["v23"] = new Point(2 * cellWidth, 3 * cellHeight);
    this.geometry["v33"] = new Point(3 * cellWidth, 3 * cellHeight);
    this.geometry["v43"] = new Point(this.width, 3 * cellHeight);
    this.geometry["v04"] = new Point(0, this.height);
    this.geometry["v14"] = new Point(cellWidth, this.height);
    this.geometry["v24"] = new Point(2 * cellWidth, this.height);
    this.geometry["v34"] = new Point(3 * cellWidth, this.height);
    this.geometry["v44"] = new Point(this.width, this.height);
  }

  defineShapes() {
    this.shapes = [
      {
        name: 1,
        label: Point.section(this.geometry["v11"], this.geometry["v21"], 13, 1),
        rasi: Point.section(this.geometry["v11"], this.geometry["v21"], 2, 8),
        outlines: [
          this.getSquareCommands(
            this.geometry["v10"],
            this.geometry["v20"],
            this.geometry["v21"],
            this.geometry["v11"]
          ),
        ],
        regions: [
          this.getSquareCommands(
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
        name: 2,
        label: Point.section(this.geometry["v21"], this.geometry["v31"], 14, 1),
        rasi: Point.section(this.geometry["v21"], this.geometry["v31"], 2, 7),
        outlines: [
          this.getSquareCommands(
            this.geometry["v20"],
            this.geometry["v30"],
            this.geometry["v31"],
            this.geometry["v21"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v20"],
            this.geometry["v30"],
            this.geometry["v31"],
            this.geometry["v21"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v20"],
            this.geometry["v31"],
            1,
            1
          ),
        },
      },
      {
        name: 3,
        label: Point.section(
          this.geometry["v31"],
          this.geometry["v41"],
          14,
          1.2
        ),
        rasi: Point.section(this.geometry["v31"], this.geometry["v41"], 1, 14),
        outlines: [
          this.getSquareCommands(
            this.geometry["v30"],
            this.geometry["v40"],
            this.geometry["v41"],
            this.geometry["v31"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v30"],
            this.geometry["v40"],
            this.geometry["v41"],
            this.geometry["v31"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v30"],
            this.geometry["v41"],
            1,
            1
          ),
        },
      },
      {
        name: 4,
        label: Point.section(
          this.geometry["v32"],
          this.geometry["v42"],
          15,
          1.2
        ),
        rasi: Point.section(this.geometry["v32"], this.geometry["v42"], 1, 4),
        outlines: [
          this.getSquareCommands(
            this.geometry["v31"],
            this.geometry["v41"],
            this.geometry["v42"],
            this.geometry["v32"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v31"],
            this.geometry["v41"],
            this.geometry["v42"],
            this.geometry["v32"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v31"],
            this.geometry["v42"],
            1,
            1
          ),
        },
      },
      {
        name: 5,
        label: Point.section(
          this.geometry["v33"],
          this.geometry["v43"],
          15,
          1.2
        ),
        rasi: Point.section(this.geometry["v33"], this.geometry["v43"], 1, 24),
        outlines: [
          this.getSquareCommands(
            this.geometry["v32"],
            this.geometry["v42"],
            this.geometry["v43"],
            this.geometry["v33"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v32"],
            this.geometry["v42"],
            this.geometry["v43"],
            this.geometry["v33"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v32"],
            this.geometry["v43"],
            1,
            1
          ),
        },
      },
      {
        name: 6,
        label: Point.section(
          this.geometry["v34"],
          this.geometry["v44"],
          14,
          1.2
        ),
        rasi: Point.section(this.geometry["v34"], this.geometry["v44"], 1, 5),
        outlines: [
          this.getSquareCommands(
            this.geometry["v33"],
            this.geometry["v43"],
            this.geometry["v44"],
            this.geometry["v34"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v33"],
            this.geometry["v43"],
            this.geometry["v44"],
            this.geometry["v34"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v33"],
            this.geometry["v44"],
            1,
            1
          ),
        },
      },
      {
        name: 7,
        label: Point.section(
          this.geometry["v24"],
          this.geometry["v34"],
          14,
          1.2
        ),
        rasi: Point.section(this.geometry["v24"], this.geometry["v34"], 1, 4),
        outlines: [
          this.getSquareCommands(
            this.geometry["v23"],
            this.geometry["v33"],
            this.geometry["v34"],
            this.geometry["v24"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v23"],
            this.geometry["v33"],
            this.geometry["v34"],
            this.geometry["v24"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v23"],
            this.geometry["v34"],
            1,
            1
          ),
        },
      },
      {
        name: 8,
        label: Point.section(this.geometry["v14"], this.geometry["v24"], 14, 2),
        rasi: Point.section(this.geometry["v14"], this.geometry["v24"], 2, 6),
        outlines: [
          this.getSquareCommands(
            this.geometry["v13"],
            this.geometry["v23"],
            this.geometry["v24"],
            this.geometry["v14"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v13"],
            this.geometry["v23"],
            this.geometry["v24"],
            this.geometry["v14"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v13"],
            this.geometry["v24"],
            1,
            1
          ),
        },
      },
      {
        name: 9,
        label: Point.section(this.geometry["v04"], this.geometry["v14"], 9, 2),
        rasi: Point.section(this.geometry["v04"], this.geometry["v14"], 2, 1),
        outlines: [
          this.getSquareCommands(
            this.geometry["v03"],
            this.geometry["v13"],
            this.geometry["v14"],
            this.geometry["v04"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v03"],
            this.geometry["v13"],
            this.geometry["v14"],
            this.geometry["v04"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v03"],
            this.geometry["v14"],
            1,
            1
          ),
          align: "right",
        },
      },
      {
        name: 10,
        label: Point.section(this.geometry["v03"], this.geometry["v13"], 9, 2),
        rasi: Point.section(this.geometry["v03"], this.geometry["v13"], 1.2, 1),
        outlines: [
          this.getSquareCommands(
            this.geometry["v02"],
            this.geometry["v03"],
            this.geometry["v13"],
            this.geometry["v12"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v02"],
            this.geometry["v03"],
            this.geometry["v13"],
            this.geometry["v12"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v02"],
            this.geometry["v13"],
            1,
            1
          ),
        },
      },
      {
        name: 11,
        label: Point.section(this.geometry["v02"], this.geometry["v12"], 9, 2),
        rasi: Point.section(this.geometry["v02"], this.geometry["v12"], 5, 5),
        outlines: [
          this.getSquareCommands(
            this.geometry["v01"],
            this.geometry["v11"],
            this.geometry["v12"],
            this.geometry["v02"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v01"],
            this.geometry["v11"],
            this.geometry["v12"],
            this.geometry["v02"]
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
        name: 12,
        label: Point.section(this.geometry["v01"], this.geometry["v11"], 9, 2),
        rasi: Point.section(this.geometry["v01"], this.geometry["v11"], 1, 3.5),
        outlines: [
          this.getSquareCommands(
            this.geometry["v01"],
            this.geometry["v11"],
            this.geometry["v12"],
            this.geometry["v02"]
          ),
        ],
        regions: [
          this.getSquareCommands(
            this.geometry["v00"],
            this.geometry["v10"],
            this.geometry["v11"],
            this.geometry["v01"]
          ),
        ],
        planet: {
          type: "grid",
          center: Point.section(
            this.geometry["v01"],
            this.geometry["v10"],
            1,
            1
          ),
        },
      },
    ];
  }

  getSquareCommands(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point
  ): CmdTuple[] {
    return [
      ["M", topLeft],
      ["L", topRight, bottomRight, bottomLeft, topLeft],
    ];
  }

  getWatermarkCommands(): CmdTuple[] {
    const center = Point.mid(this.geometry["v00"], this.geometry["v44"]);
    const offsetX = 70;
    const offsetY = 90;

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
