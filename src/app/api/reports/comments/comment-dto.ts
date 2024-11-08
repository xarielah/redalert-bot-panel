import { getClerkUser } from "@/lib/get-clerk-user";
import { CommentDocument } from "@/models/Comment";

export function commentsDto(comments: CommentDocument[]) {
  return new Promise(async (resolve, reject) => {
    const commentsDto = [];
    for (const comment of comments) {
      const commentDtoVar = await commentDto(comment);
      commentsDto.push(commentDtoVar);
    }
    resolve(commentsDto);
  });
}

export async function commentDto(comment: CommentDocument) {
  const user = await getClerkUser(comment.commenterId);
  return {
    id: comment.id,
    comment: comment.comment,
    user: user,
    parent: comment.parent,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
}
