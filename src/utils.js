export function encodeNote(name, bar, beat, split) {
  return `${name},${bar},${beat},${split}`
}

export function decodeNote(code) {
  const [name, bar, beat, split] = code.split(',')

  return {
    name,
    bar: parseInt(bar, 10),
    beat: parseInt(beat, 10),
    split: parseInt(split, 10)
  }
}

export function getScrollbarWidth() {
  var outer = document.createElement("div")
  outer.style.visibility = "hidden"
  outer.style.width = "100px"
  // needed for WinJS apps
  outer.style.msOverflowStyle = "scrollbar"

  document.body.appendChild(outer)

  var widthNoScroll = outer.offsetWidth
  // force scrollbars
  outer.style.overflow = "scroll"

  // add innerdiv
  var inner = document.createElement("div")
  inner.style.width = "100%"
  outer.appendChild(inner)

  var widthWithScroll = inner.offsetWidth

  // remove divs
  outer.parentNode.removeChild(outer)

  return widthNoScroll - widthWithScroll
}
