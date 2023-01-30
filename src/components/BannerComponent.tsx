import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import styled from 'styled-components'

const BannerBox = styled.div<{
    imgSrc?: string
}>`
    height: 320px;
    background: center / cover no-repeat url(${(props) => props.imgSrc});
    background-color: gray;
`

function BannerComponent() {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <BannerBox imgSrc="/src/assets/images/banner/banner_1.svg" />
            </SwiperSlide>
            <SwiperSlide>
                <BannerBox>배너2</BannerBox>
            </SwiperSlide>
        </Swiper>
    )
}

export default BannerComponent
