import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";

const Testimonials = ({ testimonial }) => {
  const items =
    testimonial?.testimonials ??
    testimonial?.reviews?.map((r) => ({
      text: r?.review,
      name: r?.name,
    })) ??
    [];

  return (
    <div className="bg-white text-[#1E1E1E] py-20">
      <div className="mycontainer">
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-bold">
            {testimonial?.title}
          </h2>
          <p className="text-[#1E1E1E] max-w-2xl text-[16px] sm:text-[18px]">
            {testimonial?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-[#164C1A]/15 to-[#34B23D]/15  rounded-4xl p-6"
            >
              <div className="mb-3 inline-block bg-gradient-to-b from-[#164C1A] to-[#34B23D] bg-clip-text text-transparent">
                ★★★★★
              </div>

              <p className="text-md text-[#000000] mb-6 max-w-xs">
                {item?.text}
              </p>

              <div className="flex items-center gap-3">
                <UserIcon className="w-9 h-9 text-[#303030] ring-2 ring-[#303030] rounded-lg p-1" />
                <span className="text-sm">{item?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
