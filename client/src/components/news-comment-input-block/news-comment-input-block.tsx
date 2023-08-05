import { CloseBtnWrapper, CommentInputWrapper} from "./news-comment-input-block-style";
import { NewsCommentInput } from "../news-comment-input/news-comment-input";
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

export function NewsCommentInputBlock ({
  onCloseInput, newsId, commentId, defaultText, image, rootCommentId, userNik
}: CommentInputBlockProps) {
  return (
    <CommentInputWrapper>
      <CloseBtnWrapper><CloseBtn onClick={onCloseInput} /></CloseBtnWrapper>
      <NewsCommentInput
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
