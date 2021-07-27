import { UserDto } from "./user.dto";
export interface registerResponseDto {
  user?: UserDto;
  errors?: userError[];
}

export interface userError {
  field: string;
  error: string;
}
