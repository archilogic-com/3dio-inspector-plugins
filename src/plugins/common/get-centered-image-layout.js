export default function getCenteredImageLayout (args) {

  // API
  var originalWidth = args.originalWidth,
    originalHeight = args.originalHeight,
    maxWidth = args.maxWidth,
    maxHeight = args.maxHeight

  // internals
  var top, left, newWidth, newHeight,
    ratio = originalWidth / originalHeight

  if (ratio > 1) {
    // landscape
    top = Math.round((maxHeight - maxHeight / ratio) / 2)
    left = 0
    newWidth = maxWidth
    newHeight = Math.round(maxHeight / ratio)
  } else {
    // portrait
    top = 0
    left = Math.round((maxWidth - maxWidth * ratio) / 2)
    newWidth = Math.round(maxWidth * ratio)
    newHeight = maxHeight
  }

  return { top:top, left:left, width:newWidth, height:newHeight }

}