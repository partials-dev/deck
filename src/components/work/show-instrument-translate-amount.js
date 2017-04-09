const lip = 60

export default function showInstrumentTranslateAmount (state) {
  if (!state.gameDeck.cards[0]) {
    return 0
  }
  const screenHeight = state.screen.size.height
  const cardHeight = state.gameDeck.cards[0].size.height
  const distanceFromCardBottomToScreenBottom = (screenHeight - cardHeight) / 2
  const distanceFromCardBottomToScreenTop = -screenHeight + distanceFromCardBottomToScreenBottom
  const translateAmount = distanceFromCardBottomToScreenTop + lip
  return translateAmount
}
