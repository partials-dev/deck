const CARD_WIDTH = 368
const defaultCard = {
  id: 'start',
  title: 'Hi!',
  text: 'Hello world!',
  image: 'switchroom.jpg',
  userIsTouching: false,
  position: { x: -CARD_WIDTH / 2, y: -1000 },
  initialPosition: { x: 0, y: 0 },
  leanDirection: 'middle',
  size: { width: 368, height: 540 },
  left: { link: null, text: null },
  right: { link: null, text: null },
  body: null,
  song: { replaceRoom: null, with: null },
  sound: {
    onEnter: null,
    setBackgroundTo: 'forest-music-2nd-draft.mp3'
  }
}

export default defaultCard
