//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

export const scale = (width, size) => width / guidelineBaseWidth * size

export const verticalScale = (height, size) =>
  height / guidelineBaseHeight * size

export const moderateScale = (width, size, factor = 0.5) =>
  size + (scale(width, size) - size) * factor
