import { CloseBtnWrapper, CommentInputWrapper} from "./comment-input-block-style";
import { CommentInput } from "../comment-input/comment-input";
import { CloseBtn } from "../common/common";


type CommentInputBlockProps = {
  onCloseInput: () => void;
  newsId: string;
  commentId?: string;
  rootCommentId?: string;
  userNik?: string;
  defaultText?: string;
  image?: string;
}

export function CommentInputBlock ({
  onCloseInput, newsId, commentId, defaultText, image, rootCommentId, userNik
}: CommentInputBlockProps) {
  return (
    <CommentInputWrapper>
      <CloseBtnWrapper><CloseBtn onClick={onCloseInput} /></CloseBtnWrapper>
      <CommentInput
        newsId={newsId}
        commentId={commentId}
        rootCommentId={rootCommentId}
        userNik={userNik}
        defaultText={defaultText}
        image={image}
      />
    </CommentInputWrapper>
  )
}
