import * as DCL from "decentraland-api";

export default class SampleScene extends DCL.ScriptableScene {
  // Sourcing sound files
  white_keys: { src: string }[] = [
    { src: "sounds/a1.mp3" },
    { src: "sounds/b1.mp3" },
    { src: "sounds/c2.mp3" },
    { src: "sounds/d2.mp3" },
    { src: "sounds/e2.mp3" },
    { src: "sounds/f2.mp3" },
    { src: "sounds/g2.mp3" },
    { src: "sounds/a2.mp3" },
    { src: "sounds/b2.mp3" },
    { src: "sounds/c3.mp3" },
    { src: "sounds/d3.mp3" },
    { src: "sounds/e3.mp3" },
    { src: "sounds/f3.mp3" },
    { src: "sounds/g3.mp3" },
    { src: "sounds/a3.mp3" },
    { src: "sounds/b3.mp3" },
    { src: "sounds/c4.mp3" },
    { src: "sounds/d4.mp3" },
    { src: "sounds/e4.mp3" },
    { src: "sounds/f4.mp3" },
    { src: "sounds/g4.mp3" },
    { src: "sounds/a4.mp3" },
    { src: "sounds/b4.mp3" },
    { src: "sounds/c5.mp3" },
    { src: "sounds/d5.mp3" },
    { src: "sounds/e5.mp3" },
    { src: "sounds/f5.mp3" },
    { src: "sounds/g5.mp3" },
    { src: "sounds/a5.mp3" },
    { src: "sounds/b5.mp3" },
    { src: "sounds/c6.mp3" },
    { src: "sounds/d6.mp3" },
    { src: "sounds/e6.mp3" },
    { src: "sounds/f6.mp3" },
    { src: "sounds/g6.mp3" },
    { src: "sounds/a6.mp3" },
    { src: "sounds/b6.mp3" },
    { src: "sounds/c7.mp3" },
    { src: "sounds/d7.mp3" },
    { src: "sounds/e7.mp3" },
    { src: "sounds/f7.mp3" },
    { src: "sounds/g7.mp3" },
    { src: "sounds/a7.mp3" },
    { src: "sounds/b7.mp3" },
    { src: "sounds/c8.mp3" },
    { src: "sounds/d8.mp3" },
    { src: "sounds/e8.mp3" },
    { src: "sounds/f8.mp3" },
    { src: "sounds/g8.mp3" },
    { src: "sounds/a8.mp3" },
    { src: "sounds/b8.mp3" },
    { src: "sounds/c9.mp3" }
  ];
  black_keys: { src: string }[] = [
    { src: "sounds/a#1.mp3" },
    { src: "sounds/c#2.mp3" },
    { src: "sounds/d#2.mp3" },
    { src: "sounds/f#2.mp3" },
    { src: "sounds/g#2.mp3" },
    { src: "sounds/a#2.mp3" },
    { src: "sounds/c#3.mp3" },
    { src: "sounds/d#3.mp3" },
    { src: "sounds/f#3.mp3" },
    { src: "sounds/g#3.mp3" },
    { src: "sounds/a#3.mp3" },
    { src: "sounds/c#4.mp3" },
    { src: "sounds/d#4.mp3" },
    { src: "sounds/f#4.mp3" },
    { src: "sounds/g#4.mp3" },
    { src: "sounds/a#4.mp3" },
    { src: "sounds/c#5.mp3" },
    { src: "sounds/d#5.mp3" },
    { src: "sounds/f#5.mp3" },
    { src: "sounds/g#5.mp3" },
    { src: "sounds/a#5.mp3" },
    { src: "sounds/c#6.mp3" },
    { src: "sounds/d#6.mp3" },
    { src: "sounds/f#6.mp3" },
    { src: "sounds/g#6.mp3" },
    { src: "sounds/a#6.mp3" },
    { src: "sounds/c#7.mp3" },
    { src: "sounds/d#7.mp3" },
    { src: "sounds/f#7.mp3" },
    { src: "sounds/g#7.mp3" },
    { src: "sounds/a#7.mp3" },
    { src: "sounds/c#8.mp3" },
    { src: "sounds/d#8.mp3" },
    { src: "sounds/f#8.mp3" },
    { src: "sounds/g#8.mp3" },
    { src: "sounds/a#8.mp3" }
  ];

  // States to track when a key is pressed and or sound is playing
  state: {
    whiteKeyState: boolean[];
    whiteKeyPlayingState: boolean[];
    blackKeyState: boolean[];
    blackKeyPlayingState: boolean[];
  } = {
    whiteKeyState: Array(this.white_keys.length).fill(false),
    whiteKeyPlayingState: Array(this.white_keys.length).fill(false),
    blackKeyState: Array(this.black_keys.length).fill(false),
    blackKeyPlayingState: Array(this.black_keys.length).fill(false)
  };

  // Subscribing to events
  sceneDidMount() {
    for (let i = 0; i < this.white_keys.length; i++) {
      this.eventSubscriber.on("white_note" + i + "_click", () => {
        let newWhiteKeyState = this.state.whiteKeyState.slice();
        let newWhiteKeyPlayingState = this.state.whiteKeyPlayingState.slice();
        newWhiteKeyState[i] = true;
        newWhiteKeyPlayingState[i] = true;
        this.setState({
          whiteKeyState: newWhiteKeyState,
          whiteKeyPlayingState: newWhiteKeyPlayingState
        });
      });
    }

    for (let i = 0; i < this.black_keys.length; i++) {
      this.eventSubscriber.on("black_note" + i + "_click", () => {
        let newBlackKeyState = this.state.blackKeyState.slice();
        let newBlackKeyPlayingState = this.state.blackKeyPlayingState.slice();
        newBlackKeyState[i] = true;
        newBlackKeyPlayingState[i] = true;
        this.setState({
          blackKeyState: newBlackKeyState,
          blackKeyPlayingState: newBlackKeyPlayingState
        });
      });
    }

    // Resets the states so that the keys can be clicked rapidly
    this.subscribeTo("pointerDown", e => {
      this.setState({
        whiteKeyPlayingState: Array(this.white_keys.length).fill(false),
        blackKeyPlayingState: Array(this.white_keys.length).fill(false)
      });
    });

    this.subscribeTo("pointerUp", e => {
      this.setState({
        whiteKeyState: Array(this.white_keys.length).fill(false),
        blackKeyState: Array(this.white_keys.length).fill(false)
      });
    });
  }

  // Rendering white keys
  renderWhiteKeys() {
    let z = 0;
    return this.white_keys.map((note, index) => {
      z = z + 0.55;
      let buttonZ = 0;
      if (this.state.whiteKeyState[index]) {
        buttonZ = -2.5;
      }
      return (
        <entity
          position={{ x: 0, y: 10.5, z: z }}
          rotation={{ x: 0, y: 0, z: buttonZ }}
          transition={{ rotation: { duration: 50 } }}
          sound={{
            src: note.src,
            playing: this.state.whiteKeyPlayingState[index]
          }}
        >
          <gltf-model
            src="art/white_key.glb"
            id={"white_note" + index}
            scale={{ x: 0.23, y: 0.23, z: 0.23 }}
            position={{ x: 3.5, y: 0, z: -14.57 }}
          />
        </entity>
      );
    });
  }

  // Rendering black keys
  renderBlackKeys() {
    let z = 0;
    return this.black_keys.map((note, index) => {
      if (note.src.includes("f") || note.src.includes("c")) {
        z = z + 1.1;
      } else {
        z = z + 0.55;
      }

      let buttonZ = 0;
      if (this.state.blackKeyState[index]) {
        buttonZ = -1.75;
      }
      return (
        <entity
          position={{ x: 0, y: 10.85, z: z }}
          rotation={{ x: 0, y: 0, z: buttonZ }}
          transition={{ rotation: { duration: 50 } }}
          sound={{
            src: note.src,
            playing: this.state.blackKeyPlayingState[index]
          }}
        >
          <gltf-model
            src="art/black_key.glb"
            id={"black_note" + index}
            scale={{ x: 0.23, y: 0.23, z: 0.23 }}
            rotation={{ x: 0, y: 0, z: 1.5 }}
            position={{ x: 3, y: 0, z: -14.28 }}
          />
        </entity>
      );
    });
  }

  // General scene rendering
  async render() {
    return (
      <scene>
        <gltf-model
          src="art/paving.glb"
          position={{ x: 5, y: 0, z: 5 }}
          scale={0.1}
        />
        <gltf-model
          src="art/piano.glb"
          scale={0.1}
          position={{ x: 4, y: 0.05, z: 5.5 }}
          rotation={{ x: 0, y: 0, z: 0 }}
        >
          {this.renderWhiteKeys()}
          {this.renderBlackKeys()}
        </gltf-model>
        <gltf-model
          src="art/chair.glb"
          scale={0.1}
          position={{ x: 5.275, y: 0.05, z: 5.5 }}
          rotation={{ x: 0, y: 0, z: 0 }}
        />
        <gltf-model
          src="art/sign.glb"
          position={{ x: 4, y: 0.1, z: 2.6 }}
          rotation={{ x: 0, y: -32, z: 0 }}
          scale={0.1}
        />
      </scene>
    );
  }
}
