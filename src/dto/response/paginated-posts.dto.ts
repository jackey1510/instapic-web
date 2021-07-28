import { PostDto } from "./post.dto";

export interface PaginatedPostsDto {
  posts: PostDto[];
  nextCursor: Date | null;
}
