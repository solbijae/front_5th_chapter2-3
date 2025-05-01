import { fetchInstance } from '@/shared/api/fetchInstance';
import { GetUserList, UserDetail } from '@/entities/user/config/user';
const BASE_URL = "/api/users";

// API: 사용자 데이터 가져오기
export const fetchUsersData = async (): Promise<GetUserList> => {
  return await fetchInstance(`${BASE_URL}?limit=0&select=username,image`);
};

// API: 사용자 정보 가져오기
export const fetchOpenUserModalData = async (user: UserDetail | null): Promise<UserDetail> => {
  return await fetchInstance(`${BASE_URL}/${user?.id}`);
}
