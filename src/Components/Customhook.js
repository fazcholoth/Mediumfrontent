// hooks/useAdminAuth.js
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function useAdminAuth() {
  
  const router = useRouter();

  const isAdminLoggedIn = () => {
    const admin = JSON.parse(localStorage.getItem('admin'))
    if (!admin) {
      router.push('/admin/login');
    }
  };

  return isAdminLoggedIn;
}

export default useAdminAuth;
