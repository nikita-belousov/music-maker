import { library, dom } from '@fortawesome/fontawesome-svg-core'

import {
  faPlus,
  faMinus,
  faPlayCircle,
  faStopCircle,
  faPaintBrush,
  faEraser,
  faMousePointer,
  faArrowsAlt,
  faTimes,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faCheck,
  faBan,
} from '@fortawesome/free-solid-svg-icons'


export default function initIcons() {
  library.add(
    faPlus,
    faMinus,
    faPlayCircle,
    faStopCircle,
    faPaintBrush,
    faEraser,
    faMousePointer,
    faArrowsAlt,
    faTimes,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faArrowDown,
    faCheck,
    faBan,
  )

  dom.watch()
}
