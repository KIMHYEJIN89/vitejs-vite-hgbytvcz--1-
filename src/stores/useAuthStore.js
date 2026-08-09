// store/useAuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  userId: '',

  login: (id) =>
    set(() => {
      localStorage.setItem('token', 'fake-token');
      return { isLogin: true, userId: id };
    }),

  logout: () =>
    set(() => {
      localStorage.removeItem('token');
      return { isLogin: false, userId: '' };
    }),
}));

export default useAuthStore;
