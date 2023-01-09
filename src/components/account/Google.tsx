import { useQuery } from 'react-query'
import useServiceManager from 'src/hooks/useServiceManager'

function Google() {
    const code = new URL(window.location.href).searchParams.get('code')
    const serviceManager = useServiceManager()

    useQuery(
        ['GoogleLogin', code],
        () => serviceManager.dataService.accountAPI.getGoogleLogin(code),
        {
            // options
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                if (res.data.success === true) {
                    localStorage.setItem('token', res.data.data.accessToken)
                    localStorage.setItem(
                        'refreshToken',
                        res.data.data.refreshToken
                    )

                    window.location.replace('/')
                }
            },
            onError: () => {
                alert('로그인 실패')
                window.location.replace('/')
            },
        }
    )

    return <p>Loading...</p>
}

export default Google