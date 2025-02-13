import useServiceManager from './useServiceManager'

async function useBookmark(paramId: string) {
    const serviceManager = useServiceManager()

    try {
        const { data } = await serviceManager.dataService.likesAPI.postLikes(
            paramId
        )
        if (data.data) {
            alert('해당 공고가 북마크되었습니다.')
            window.location.reload()
        } else {
            alert('북마크를 취소했습니다.')
            window.location.reload()
        }
    } catch (e) {
        alert(e)
    }
}

export default useBookmark
