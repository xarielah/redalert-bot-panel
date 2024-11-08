import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ClerkUser } from "@/lib/get-clerk-user";
import { CommentDocument } from "@/models/Comment";
import moment from "moment";
import { getReportUserID } from "../../report-utils";

interface IReportComment {
  comment: CommentDocument & { user: ClerkUser };
}

export default function ReportComment({ comment }: IReportComment) {
  console.log("🚀 ~ ReportComment ~ comment:", comment);
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <img
            src={comment.user.img}
            className="w-8 h-8 rounded-full shadow-md"
          />
          <span>{getReportUserID(comment.user)}</span>
          <span>{">"}</span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">
        {comment.comment}
      </CardContent>
      <CardFooter>
        <Button size="sm">Reply</Button>
      </CardFooter>
    </Card>
  );
}
