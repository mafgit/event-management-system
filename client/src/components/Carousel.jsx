import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

const Carousel = ({featured}) => {
  SwiperCore.use([Navigation, Keyboard, Pagination]);

  return (
    <div>
        <Swiper autoplay navigation keyboard={{enabled:true}} speed={800} pagination={{ clickable: true  }} className='rounded-3xl bg-slate-300 shadow-md' style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff", '--swiper-pagination-bullet-width': '10%', '--swiper-pagination-bullet-height': '2px'}}>
            { featured.map((event) => (
              <SwiperSlide>
                <div style={{background: `url("${featured.image}") center/cover no-repeat`}} className='h-[23rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
                </div>
              </SwiperSlide>
            ))
            }
            <SwiperSlide>
              <div style={{background: `url("https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat`}} className='h-[23rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div style={{background: `url("https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat`}} className='h-[23rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
              </div>
            </SwiperSlide>

        </Swiper>
    </div>
  )
}

export default Carousel