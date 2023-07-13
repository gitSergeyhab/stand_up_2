import { Dispatch, SetStateAction } from "react";
import { ImageCC } from "../../types/pic-types";
import { SERVER_URL } from "../../const/const";
import { AttachedImg,  } from "./chat-attached-image-style";


type ChatAttachedImageProps = {
  image: string;
  setCurrentImg: Dispatch<SetStateAction<ImageCC | null>>
}

export function ChatAttachedImage({ image,  setCurrentImg}: ChatAttachedImageProps) {
  const handleImgClick = () => {
    const imageData: ImageCC = { imageId: image, imagePath: image };
    setCurrentImg(imageData);
  }

  return <AttachedImg onClick={handleImgClick} src={`${SERVER_URL}${image}`} alt="pic from message"  width={100} height={100} />
}
