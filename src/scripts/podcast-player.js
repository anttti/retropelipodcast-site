import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.2.1/lit-element.js?module";

class PodcastPlayer extends LitElement {
  static get properties() {
    return {
      currentTime: { type: String },
      currentSpeedIdx: { type: Number },
      duration: { type: String },
    };
  }

  static get styles() {
    return css`
      .podcast-player {
        background: var(--player-background, rgb(255 255 255 / 0.2));
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 3rem 1.5rem 3rem;
        gap: 0.5rem 1rem;
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      button,
      span {
        padding: 0.5rem;
        display: block;
        line-height: 1;
        font-size: 1.5rem;
        text-shadow: 1px 1px var(--text-shadow);
      }

      span {
        align-self: center;
      }

      :focus {
        outline: 2px solid var(--player-highlight);
      }

      button {
        -webkit-appearance: none;
        font-family: inherit;
        min-width: 26px;
        border: 1px solid transparent;
        background-color: transparent;
        border-radius: 0;
        cursor: pointer;
        color: currentColor;
      }

      button svg {
        width: 2rem;
        height: 2rem;
      }

      .button-play {
        background: var(--player-highlight);
      }

      .button-secondary {
        background: var(--player-highlight-light);
      }

      .progress-meter {
        grid-row: 2;
        grid-column: 1 / -1;
      }

      input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
      }

      input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 0.5rem;
        cursor: pointer;
        animate: 0.2s;
        border: 1px solid #333;
        border-radius: 0;
      }

      input[type="range"]::-webkit-slider-thumb {
        border: none;
        height: 1rem;
        width: 1rem;
        border-radius: 0;
        background: var(--player-highlight);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -0.25rem;
      }

      input[type="range"]::-ms-fill-lower {
        background: var(--player-highlight);
      }

      input[type="range"]::-ms-fill-upper {
        background: white;
      }

      time {
        grid-row: 3;
      }

      .duration {
        grid-column: 3;
        justify-self: end;
      }

      .button-speed {
        min-width: 3em;
        grid-column: 2;
        grid-row: 3;
      }

      .button-speed:after {
        content: "x";
      }

      .button-play .pause {
        display: none;
      }

      :host(.is-playing) .button-play .pause {
        display: inline;
      }
      :host(.is-playing) .button-play .play {
        display: none;
      }
    `;
  }

  constructor() {
    super();

    // HTMLAudioElement
    this.audio = this.querySelector("audio");
    this.audio.controls = false; // remove controls if it has 'em

    this.speeds = [1, 1.25, 1.5, 1.75, 2];
    this.currentSpeedIdx = 0;
    this.currentTime = 0;
    this.duration = 0;

    this.audio.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
    this.audio.addEventListener(
      "loadedmetadata",
      this.handleLoadedMetadata.bind(this)
    );
  }

  handleLoadedMetadata() {
    this.duration = this.audio.duration;
  }

  handleTimeUpdate(e) {
    this.currentTime = this.audio.currentTime;
  }

  parseTime(str) {
    var plain = /^\d+(\.\d+)?$/g,
      npt = /^(?:npt:)?(?:(?:(\d+):)?(\d\d?):)?(\d\d?)(\.\d+)?$/,
      quirks = /^(?:(\d\d?)[hH])?(?:(\d\d?)[mM])?(\d\d?)[sS]$/,
      match;
    if (plain.test(str)) {
      return parseFloat(str);
    }
    match = npt.exec(str) || quirks.exec(str);
    if (match) {
      return (
        3600 * (parseInt(match[1], 10) || 0) +
        60 * (parseInt(match[2], 10) || 0) +
        parseInt(match[3], 10) +
        (parseFloat(match[4]) || 0)
      );
    }
    return 0;
  }

  toHHMMSS(totalsecs) {
    var sec_num = parseInt(totalsecs, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    hours = hours > 0 ? hours + ":" : "";
    minutes = minutes + ":";

    var time = hours + minutes + seconds;
    return time;
  }

  changeSpeed() {
    this.currentSpeedIdx =
      this.currentSpeedIdx + 1 < this.speeds.length
        ? this.currentSpeedIdx + 1
        : 0;
    this.audio.playbackRate = this.speeds[this.currentSpeedIdx];
  }

  rewind() {
    this.audio.currentTime -= 30;
  }

  ff() {
    this.audio.currentTime += 30;
  }

  play() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.classList.toggle("is-playing", !this.audio.paused);
  }

  seek(e) {
    this.audio.currentTime = e.target.value;
  }

  render() {
    return html`
      <slot></slot>
      <svg style="display: none;">
        <symbol id="icon-play" viewBox="0 0 30.406 46.843">
          <path
            fill="var(--player-contrast)"
            d="M977.571,603.068l-2.828-2.4,2.828-2.4,2.828,2.4Zm-3.535,3-2.829-2.4,2.829-2.4,2.828,2.4Zm-3.536,3-2.828-2.4,2.828-2.4,2.828,2.4Zm10.607-9.01-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.829,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.829,2.4Zm-17.677,9.01-2.829-2.4,2.829-2.4,2.828,2.4Zm-3.536,3-2.828-2.4,2.828-2.4,2.828,2.4Zm7.071-6.006-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.829,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm-17.678,9.01-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.829,2.4ZM970.5,591.055l-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm-10.607,3-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm3.535-3-2.828-2.4,2.828-2.4,2.828,2.4Zm-7.071,0-2.828-2.4,2.828-2.4,2.828,2.4Zm3.536-3-2.829-2.4,2.829-2.4,2.828,2.4Zm21.213,12.013-2.829-2.4,2.829-2.4,2.828,2.4Zm-3.536-3-2.828-2.4,2.828-2.4,2.829,2.4Zm-3.535-3-2.829-2.4,2.829-2.4,2.828,2.4Zm-3.536-3-2.828-2.4,2.828-2.4,2.829,2.4Zm-3.535-3-2.829-2.4,2.829-2.4,2.828,2.4Zm-3.536-3-2.828-2.4,2.828-2.4,2.828,2.4Zm-3.535-3-2.829-2.4,2.829-2.4,2.828,2.4Zm-3.536-3-2.828-2.4,2.828-2.4,2.828,2.4Zm0,6.007-2.828-2.4,2.828-2.4,2.828,2.4Z"
            transform="translate(-967.656 -562.219)"
          />
        </symbol>
        <symbol id="icon-pause" viewBox="0 0 32 32">
          <path
            fill="var(--player-contrast)"
            d="M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z "
          ></path>
        </symbol>
      </svg>

      <div class="podcast-player">
        <button class="button-play" aria-label="Toista" @click="${this.play}">
          <svg class="play"><use xlink:href="#icon-play"></use></svg>
          <svg class="pause"><use xlink:href="#icon-pause"></use></svg>
        </button>

        <button
          class="button-secondary"
          aria-label="30 sekuntia taaksepäin"
          @click="${this.rewind}"
        >
          -30s
        </button>

        <button
          class="button-secondary"
          aria-label="30 sekuntia eteenpäin"
          @click="${this.ff}"
        >
          +30s
        </button>

        <span class="sr-only">Toistettu</span>
        <span class="currenttime time">${this.toHHMMSS(this.currentTime)}</span>
        <input
          type="range"
          class="progress-meter"
          value="${this.currentTime}"
          max="${this.duration}"
          @click="${this.seek}"
        />
        <span class="sr-only">Kesto</span>
        <span class="duration time">${this.toHHMMSS(this.duration)}</span>

        <button
          class="button-speed button-secondary"
          @click="${this.changeSpeed}"
        >
          ${this.speeds[this.currentSpeedIdx]}
        </button>
      </div>
    `;
  }
}

customElements.define("podcast-player", PodcastPlayer);
