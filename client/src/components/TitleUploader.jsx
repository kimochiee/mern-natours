import { useEffect } from "react"

function TitleUploader(title) {
  useEffect(() => {
    document.title = "Natours | " + title
  }, [])
}

export default TitleUploader