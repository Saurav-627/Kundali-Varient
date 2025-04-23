import { LitElement, TemplateResult, css, svg } from "lit";
import { customElement, property } from "lit/decorators.js";
import type {
  House,
  IGetRegionsConfig,
  KundaliVariant,
  NamedHouse,
} from "./kundali-variant";

import { NorthKundaliVariant } from "./north-kundali-variant";
import { NorthKundaliVariant2 } from "./north-kundali-varient2";
import { SouthKundaliVariant } from "./south-kundali-varient";
import { EastKundaliVariant } from "./east-astro-chart";

@customElement("poc-kundali")
export class KundaliElement extends LitElement {
  @property({ type: String })
  variant: string = "north";

  @property({ type: String })
  watermark: string = "Kundali";

  @property({ type: Number })
  size: number = 400;

  @property({ attribute: "chart-data", type: Array })
  chartData: Array<House> = [];

  @property({ type: Boolean })
  debug: boolean = false;

  get namedHouses(): NamedHouse {
    return this.chartData.reduce((result: NamedHouse, info: House) => {
      result[info.name] = info;
      return result;
    }, {} as NamedHouse);
  }

  renderChart(chartVariant: KundaliVariant): TemplateResult {
    const self = this;

    const regionConfig: IGetRegionsConfig = {
      houses: this.namedHouses,
      onClick(shape, point) {
        self.dispatchEvent(
          new CustomEvent("click:chart-region", {
            detail: {
              point: point,
              region: shape,
            },
          })
        );
      },
    };

    return svg`
            ${chartVariant.getWatermark(this.watermark)}
            ${chartVariant.getRegions(regionConfig)}
            ${chartVariant.outlines}
            ${chartVariant.border}
        `;
  }

  render() {
    const VIEWBOX_WIDTH = 400;
    const VIEWBOX_HEIGHT = 300;
    let chart: KundaliVariant;

    switch (this.variant.toLowerCase()) {
      case "north":
        chart = new NorthKundaliVariant(
          VIEWBOX_WIDTH,
          VIEWBOX_HEIGHT,
          this.debug
        );
        break;
      case "north2":
        chart = new NorthKundaliVariant2(
          VIEWBOX_WIDTH,
          VIEWBOX_HEIGHT,
          this.debug
        );
        break;
      case "south":
        chart = new SouthKundaliVariant(
          VIEWBOX_WIDTH,
          VIEWBOX_HEIGHT,
          this.debug
        );
        break;
      case "east":
        chart = new EastKundaliVariant(
          VIEWBOX_WIDTH,
          VIEWBOX_HEIGHT,
          this.debug
        ); 
        break;
      default:
        chart = new NorthKundaliVariant(
          VIEWBOX_WIDTH,
          VIEWBOX_HEIGHT,
          this.debug
        );
    }
    return svg`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${this.size}"
        id="poc-kundali"
        fill="none"
        viewBox="0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}"
      >
        ${this.renderChart(chart)}
      </svg>
    `;
  }




  

// render(){
//   const VIEWBOX_WIDTH = 400;
//   const VIEWBOX_HEIGHT = 300;
//   let chart: KundaliVariant;
//   chart = new EastKundaliVariant(VIEWBOX_WIDTH, VIEWBOX_HEIGHT, this.debug);
//   return svg`
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="${this.size}"
//       id="poc-kundali"
//       fill="none"
//       viewBox="0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}"
//     >
//       ${this.renderChart(chart)}
//     </svg>
//   `;
// }

  static styles = css`
    :host {
      --poc-kundali-outline-width: 1px;
      --poc-kundali-border-width: 2px;
      --poc-kundali-outline-color: rgb(178, 124, 16);
      --poc-kundali-region-color: rgba(250, 250, 240, 0.5);
      --poc-kundali-region-color-hover: rgba(250, 250, 200, 0.8);
      --poc-kundali-label-color: rgba(0, 0, 0, 0.4);
      --poc-kundali-label-color-hover: rgba(0, 0, 0, 0.8);
      --poc-kundali-label-font: 0.75em monospace;
      --poc-kundali-rasi-label-color: rgba(0, 0, 0, 0.4);
      --poc-kundali-rasi-label-color-hover: rgba(0, 0, 0, 0.8);
      --poc-kundali-rasi-label-font: 0.75em monospace;
      --poc-kundali-watermark-label-font: 0.75em monospace;
      --poc-kundali-watermark-label-color: rgba(0, 0, 0, 0.15);

      --planet-sun-color: rgb(186, 11, 51);
      --planet-moon-color: rgb(93, 156, 236);
      --planet-mars-color: rgb(207, 56, 44);
      --planet-mercury-color: rgb(53, 179, 140);
      --planet-jupiter-color: rgb(232, 168, 42);
      --planet-venus-color: rgb(220, 103, 160);
      --planet-saturn-color: rgb(87, 94, 142);
      --planet-rahu-color: rgb(113, 113, 113);
      --planet-ketu-color: rgb(174, 120, 169);
      --planet-ascendant-color: rgb(130, 130, 130);
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --planet-sun-color: rgb(217, 11, 59);
        --planet-moon-color: rgb(108, 173, 255);
        --planet-mars-color: rgb(237, 73, 59);
        --planet-mercury-color: rgb(64, 202, 158);
        --planet-jupiter-color: rgb(255, 189, 58);
        --planet-venus-color: rgb(238, 125, 179);
        --planet-saturn-color: rgb(107, 113, 174);
        --planet-rahu-color: rgb(142, 142, 142);
        --planet-ketu-color: rgb(198, 142, 191);
        --planet-ascendant-color: rgb(160, 160, 160);
      }
    }

    /** Kundali Border Styling */

    .border {
      fill: none;
      stroke: var(
        --poc-kundali-border-color,
        var(--poc-kundali-outline-color, black)
      );
      stroke-width: var(
        --poc-kundali-border-width,
        var(--poc-kundali-outline-width, 1px)
      );
    }

    /** Kundali Outline Styling */

    .outline {
      pointer-events: none;
      fill: none;
      stroke: var(--poc-kundali-outline-color, black);
      stroke-width: var(--poc-kundali-outline-width, 1px);
    }

    /** Kundali Region Styling */

    .region {
      cursor: pointer;

      stroke: none;
      fill: var(--poc-kundali-region-color, white);
    }

    .region:hover {
      fill: var(--poc-kundali-region-color-hover, white);
    }

    .region path,
    text {
      pointer-events: all;

      -webkit-transition: fill 0.5s;
      -moz-transition: fill 0.5s;
      -o-transition: fill 0.5s;
      transition: fill 0.5s;
    }

    .region:hover .label {
      fill: var(--poc-kundali-label-color-hover, black);
      font-size: 1.1em;
    }

    .region:hover .rasi-label {
      fill: var(--poc-kundali-rasi-label-color-hover, black);
    }

    /*# Kundali Label Styling*/

    .label {
      pointer-events: none;
      user-select: none;
      dominant-baseline: middle;
      text-anchor: middle;
      fill: var(--poc-kundali-label-color, black);
      font: var(--poc-kundali-label-font, 1em monospace);

      -webkit-transition: font-size 0.2s;
      -moz-transition: font-size 0.2s;
      -o-transition: font-size 0.2s;
      transition: font-size 0.2s;
    }

    .label-1,
    .label-4,
    .label-7,
    .label-10 {
      text-anchor: middle;
    }

    .label-2,
    .label-3,
    .label-5,
    .label-6 {
      text-anchor: end;
    }

    .label-8,
    .label-9,
    .label-11,
    .label-12 {
      text-anchor: start;
    }

    .label-2,
    .label-3,
    .label-11,
    .label-12 {
      dominant-baseline: text-after-edge;
    }

    .label-5,
    .label-6,
    .label-8,
    .label-9 {
      dominant-baseline: hanging;
    }

    /*# Kundali Rasi Label Styling*/

    .rasi-label {
      pointer-events: none;
      user-select: none;
      white-space: pre-wrap;
      dominant-baseline: text-before-edge;
      text-anchor: middle;
      font: var(--poc-kundali-rasi-label-font, 1em monospace);
      fill: var(--poc-kundali-rasi-label-color, black);
    }

    .rasi-label-3,
    .rasi-label-5 {
      text-anchor: start;
      dominant-baseline: text-after-edge;
    }

    .rasi-label-11,
    .rasi-label-9 {
      text-anchor: end;
      dominant-baseline: text-after-edge;
    }

    .rasi-label-4,
    .rasi-label-10 {
      dominant-baseline: middle;
    }

    .rasi-label-4 {
      text-anchor: start;
    }

    .rasi-label-10 {
      text-anchor: end;
    }

    .rasi-label-6,
    .rasi-label-7,
    .rasi-label-8 {
      text-anchor: middle;
      dominant-baseline: text-after-edge;
    }

    /** Watermark Styling */

    .watermark-text {
      fill: var(--poc-kundali-watermark-label-color, black);
      font: var(--poc-kundali-watermark-label-font, 0.75em monospace);
      cursor-events: none;
      user-select: none;
    }

    /** Planet Grid + Planet Line Styling */

    /** Planet Styling */

    .planet {
      font-size: 0.55em;
      font-weight: 400;
      font-family: sans-serif;
      stroke-width: 0.5;
    }

    .planet-sun {
      fill: var(--planet-sun-color, currentColor);
      stroke: var(--planet-sun-color, currentColor);
    }

    .planet-moon {
      fill: var(--planet-moon-color, currentColor);
      stroke: var(--planet-moon-color, currentColor);
    }

    .planet-mars {
      fill: var(--planet-mars-color, currentColor);
      stroke: var(--planet-mars-color, currentColor);
    }

    .planet-mercury {
      fill: var(--planet-mercury-color, currentColor);
      stroke: var(--planet-mercury-color, currentColor);
    }

    .planet-jupiter {
      fill: var(--planet-jupiter-color, currentColor);
      stroke: var(--planet-jupiter-color, currentColor);
    }

    .planet-venus {
      fill: var(--planet-venus-color, currentColor);
      stroke: var(--planet-venus-color, currentColor);
    }

    .planet-saturn {
      fill: var(--planet-saturn-color, currentColor);
      stroke: var(--planet-saturn-color, currentColor);
    }

    .planet-rahu {
      fill: var(--planet-rahu-color, currentColor);
      stroke: var(--planet-rahu-color, currentColor);
    }

    .planet-ketu {
      fill: var(--planet-ketu-color, currentColor);
      stroke: var(--planet-ketu-color, currentColor);
    }

    .planet-ascendant {
      fill: var(--planet-ascendant-color, currentColor);
      stroke: var(--planet-ascendant-color, currentColor);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "poc-kundali": KundaliElement;
  }
}
