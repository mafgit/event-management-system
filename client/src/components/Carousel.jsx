import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Keyboard, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

const Carousel = ({featured}) => {
  SwiperCore.use([Navigation, Keyboard, Pagination, Autoplay]);

  return (
    <div>
        <Swiper effect="fade" autoplay navigation keyboard={{enabled:true}} speed={800} pagination={{ clickable: true  }} className='rounded-3xl bg-slate-300 shadow-md' style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff", '--swiper-pagination-bullet-width': '10%', '--swiper-pagination-bullet-height': '2px'}}>
            { featured && featured.map((event) => (
              <SwiperSlide key={event.id}>
                <div style={{background: `url("${event.image_url}") center/cover no-repeat`}} className='h-[23rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
                  <h2 className='absolute text-3xl left-6 bottom-5 font-semibold text-white z-10'>{event.image_url}</h2>
                  <div className="absolute left-0 bottom-0 h-[4.5rem] w-full opacity-70 bg-gradient-to-b to-zinc-950 from-zinc-800"></div>
                </div>
              </SwiperSlide>
            ))
            }
            <SwiperSlide>
              <div style={{background: `url("https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat`}} className='h-[23rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
              </div>
              <h2 className='absolute text-3xl left-6 bottom-5 font-semibold text-white z-10'>October Fest 2024</h2>
              <div className="absolute left-0 bottom-0 h-[4.5rem] w-full opacity-70 bg-gradient-to-b to-zinc-950 from-zinc-800"></div>
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