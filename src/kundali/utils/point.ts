export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get coords() {
        return [this.x, this.y];
    }

    get x_y() {
        return this.coords.join(' ');
    }

    static concat(points: Point[]): Number[] {
        return ([] as Number[]).concat(...points.map((p) => p.coords));
    }

    static section(p1: Point, p2: Point, m: number, n: number): Point {
        const x = (m * p2.x + n * p1.x) / (m + n);
        const y = (m * p2.y + n * p1.y) / (m + n);

        return new Point(x, y);
    }

    static mid(p1: Point, p2: Point): Point {
        const x = (p2.x + p1.x) / 2;
        const y = (p2.y + p1.y) / 2;

        return new Point(x, y);
    }
}