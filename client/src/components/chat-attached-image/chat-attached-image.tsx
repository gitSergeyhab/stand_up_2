import { Dispatch, SetStateAction, useState } from "react";
import { AiTwotonePicture, AiOutlinePicture } from "react-icons/ai";
import { ImageCC } from "../../types/pic-types";
import { SERVER_URL } from "../../const/const";
import { AttachedImg, AttachedImgDiv, ImageBtn } from "./chat-attached-image-style";


type ChatAttachedImageProps = {
  imgOpen?: boolean
  image: string;
  setCurrentImg: Dispatch<SetStateAction<ImageCC | null>>
}

export function ChatAttachedImage({ image, imgOpen, setCurrentImg}: ChatAttachedImageProps) {
  const [isOpen, setIsOpen] = useState(imgOpen);

  const handleOpenClick = () => setIsOpen((prev) => !prev)
  const handleImgClick = () => {
    const imageData: ImageCC = {
      imageId: image,
      imagePath: image
    }
    setCurrentImg(imageData)
  }

  const showPicImg = isOpen ? <AiTwotonePicture/> : <AiOutlinePicture/>;
  const showPicBtn = !image ? null : <ImageBtn onClick={handleOpenClick}  type="button">{showPicImg}</ImageBtn> ;
  const attachedImg = isOpen ?
   <AttachedImg onClick={handleImgClick} src={`${SERVER_URL}${image}`} alt="pic from message"  width={100} height={100} /> : null;

  return (
    <AttachedImgDiv>
      {showPicBtn}
      {attachedImg}
    </AttachedImgDiv>
  )
}
