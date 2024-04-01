import { useParams } from "react-router-dom"

import TitleUploader from "../components/TitleUploader"

function Tour() {
  const { slug } = useParams()
  TitleUploader(slug)

  return (
    <div>Tour</div>
  )
}

export default Tour