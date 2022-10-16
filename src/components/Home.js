import React, { useEffect, useState } from 'react';

// slider
import SwiperCore, { Scrollbar, Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Scrollbar, Navigation]);

const Home = ({ data, coveredNews, handleCovered }) => {
    const [swiper, setSwiper] = useState(null);
    const [verticalIndex, setVerticalIndex] = useState(null);
    const [horizontalIndex, setHorizontalIndex] = useState(0);
    const height = (window.innerHeight - 80) + "px";
    const handleIndex = (index) => {
        if (horizontalIndex === 1) {
            setVerticalIndex(index);
        }
    }
    const slideTo = (index) => swiper.slideTo(index);

    useEffect(() => {
        if (data[verticalIndex]) {
            if (!coveredNews.map((item) => item.url !== data[verticalIndex].url).includes(false)) {
                handleCovered(data[verticalIndex]);
                localStorage.setItem("coveredNews", JSON.stringify([data[verticalIndex], ...coveredNews]));
                if (data[verticalIndex - 1]) {
                    data.splice(verticalIndex - 1, 1);
                    slideTo(0);
                }
            }
        }
    }, [verticalIndex])

    const handleFilter = () => {
        if (horizontalIndex === 0 && verticalIndex !== null) {
            data.splice(0, 1);
        }
        if (horizontalIndex === 1 && verticalIndex !== null && data.length !== 0) {
            if (!coveredNews.map((item) => item.url !== data[0].url).includes(false)) {
                handleCovered(data[0]);
                localStorage.setItem("coveredNews", JSON.stringify([data[0], ...coveredNews]));
            }
        }
    }

    return (
        <div className="overflow-x-hidden small_scrollbar">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                    setHorizontalIndex(swiper.activeIndex);
                    if (verticalIndex === null) {
                        setVerticalIndex(0)
                    }
                }}
                onTransitionEnd={() => handleFilter()}
                scrollbar={{
                    hide: true,
                }}
            >
                <SwiperSlide>
                    <div>
                        <p style={{ fontSize: "20px", margin: "16px 24px", textAlign: "center" }}>
                            Discover
                        </p>
                        <div style={{ margin: "0px 24px" }}>
                            <p style={{ fontSize: "16px", margin: "0px 0px 4px 0px" }}>Headlines Covered</p>
                            <div style={{
                                width: "50px",
                                height: "4px",
                                borderRadius: "100px",
                                background: "darkturquoise"
                            }}></div>
                            {coveredNews.map((item, i) => (
                                <div key={i} style={{ marginTop: "20px" }}>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontSize: "12px", margin: "0px" }}>{item.title.slice(0, 80)}</p>
                                        <img src={item.urlToImage} alt="" style={{
                                            height: "50px",
                                            borderRadius: "6px",
                                            width: "50px"
                                        }} />
                                    </div>
                                    <hr style={{ margin: "8px 0px" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <p style={{ fontSize: "20px", margin: "16px 24px", textAlign: "center" }}>
                            News Feed
                        </p>
                        <div className="overflow-x-hidden small_scrollbar">
                            <Swiper
                                spaceBetween={30}
                                direction="vertical"
                                onSlideChange={(swiper) => handleIndex(swiper.activeIndex)}
                                slidesPerView={1}
                                scrollbar={{
                                    hide: true,
                                }}
                                onSwiper={setSwiper}
                                style={{ height: height, overflowY: "hidden" }}
                            >
                                {data?.map((each, i) => (
                                    <SwiperSlide key={i}>
                                        <div>
                                            <img src={each.urlToImage ? each.urlToImage : "https://media.istockphoto.com/photos/juniperus-occidentalis-or-juniperus-grandis-western-juniper-sierra-picture-id1386284142"} alt="" style={{ width: "100vw", height: "260px" }} />
                                        </div>
                                        <div style={{ margin: "0px 24px" }}>
                                            <p style={{ fontSize: "16px" }}><b>{each.title}</b></p>
                                            <p style={{ fontSize: "16px" }}>{each.description}</p>
                                            <p style={{ fontSize: "14px" }}>Date : {each.publishedAt.split("T")[0]}, Time : {each.publishedAt.split("T")[1].split("Z")[0]}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Home