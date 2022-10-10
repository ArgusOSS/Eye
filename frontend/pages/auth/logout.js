import Router, { useRouter } from 'next/router';
import { logoutUser } from '../../lib/auth';

export default function Login() {
    // const response = logoutUser();
    const router = useRouter();

    const handleLogout = async () => {
        const response = await logoutUser();
        if (response.success) {
            router.push('/login');
        }
    };

    return (
        <div>
            <img src="/asdas" onError={handleLogout} />
        </div>
    );
}
