import { create } from 'zustand';
import { UserDetail } from '@/entities/user/config/user';

interface UserState {
  selectedUser: UserDetail | null;
  setSelectedUser: (selectedUser: UserDetail | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));