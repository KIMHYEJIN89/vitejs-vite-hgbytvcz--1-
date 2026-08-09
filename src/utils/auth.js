// api/auth.js
export const loginApi = async ({ id, password }) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, password }),
  });

  if (!res.ok) {
    throw new Error('로그인 실패');
  }

  return res.json(); // { token, user }
};
