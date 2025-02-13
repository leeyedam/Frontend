import { EventSourcePolyfill } from 'event-source-polyfill'

// todo: 여기 있어도 좋은가?

function sseEvent() {
    const isLogin = localStorage.getItem('token')

    if (isLogin) {
        const domain = import.meta.env.VITE_API_END_POINT
        const es = new EventSourcePolyfill(`${domain}notifications/subscribe`, {
            headers: {
                Access_Token: localStorage.getItem('token'),
                'Content-Type': 'text/event-stream',
            },
            heartbeatTimeout: 120000,
        })
        return es
    }

    return null
}

export default sseEvent
