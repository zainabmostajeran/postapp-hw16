import { urls } from "./urls";
import { generateClient } from "./client";
import { listLimit } from "../utils/config";
import { IComments } from "../types/comment-type";
import { IPagination, IResDto } from "../types/global-type";

interface IFetchPostCommentsReqDto extends IPagination {
  postId: number;
}
interface IFetchPostCommentsResDto extends IResDto {
  comments: IComments[];
}
type fetchPostComments = (
  _: IFetchPostCommentsReqDto
) => Promise<IFetchPostCommentsResDto>;
export const fetchPostComments: fetchPostComments = async ({
  postId,
  ...params
}) => {
  const client = generateClient();
  const response = await client.get<IFetchPostCommentsResDto>(
    urls.comments.byPostId(postId),
    {
      params: { limit: params?.limit || listLimit, skip: params?.skip || 0 },
    }
  );
  return response.data;
};


interface IFetchAllCommentsReqDto extends IPagination {}
interface IFetchAllCommentsResDto extends IResDto {
  comments: IComments[];
}

type fetchAllCommentsType = (
  _?: IFetchAllCommentsReqDto
) => Promise<IFetchAllCommentsResDto>;
export const fetchAllComments: fetchAllCommentsType = async (params) => {
  const client = generateClient();
  const response = await client.get<IFetchAllCommentsResDto>(
    urls.comments.list,
    {
      params: { limit: params?.limit || listLimit, skip: params?.skip || 0 },
    }
  );
  return response.data;
};
