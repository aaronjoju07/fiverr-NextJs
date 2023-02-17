import { Box, Image, Badge, Text, Button, useColorModeValue } from '@chakra-ui/react';

const GigCArd = ({ gig }) => {
  return (
    <section id="Products"><div class="product-box">
      <img src="https://fiverr-res.cloudinary.com/t_mobile_web_2,q_auto,f_auto/gigs/129148066/original/4045bd06bc6c5b81a250bfe25e1a2eaaa119ec5f.jpg" />
      <div class="prs-id">
        <img src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/f6fa36d845d712e5d7cb9d7085d58e66-1558545571663/2f3230e6-b78c-4277-879b-d975f8351326.jpg" />
        <p>byastridpr</p>
      </div>
      <div class="title">
        <p>I will create awesome digital illustrations</p>
        <p class="rating">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="16" height="16">
            <path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z">
            </path>
          </svg><span>5.0</span></p>
          </div><div class="pricing">
        <div>
          <svg viewBox="0 0 16 13" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.0769 0H0.923077C0.413276 0 0 0.415736 0 0.928571C0 1.44141 0.413276 1.85714 0.923077 1.85714H15.0769C15.5867 1.85714 16 1.44141 16 0.928571C16 0.415736 15.5867 0 15.0769 0Z">
            </path>
            <path d="M15.0769 5.57143H0.923077C0.413276 5.57143 0 5.98717 0 6.5C0 7.01284 0.413276 7.42857 0.923077 7.42857H15.0769C15.5867 7.42857 16 7.01284 16 6.5C16 5.98717 15.5867 5.57143 15.0769 5.57143Z">
            </path>
            <path d="M15.0769 11.1429H0.923077C0.413276 11.1429 0 11.5586 0 12.0714C0 12.5843 0.413276 13 0.923077 13H15.0769C15.5867 13 16 12.5843 16 12.0714C16 11.5586 15.5867 11.1429 15.0769 11.1429Z">
            </path>
          </svg>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z">
            </path>
          </svg>
        </div>
        <div>
          <span>Starting From</span>
          ₹12,579</div>
      </div>
    
    </div>
    </section>
  );
};
export default GigCArd;