import Sass from '../../assets/svg/sass.svg';
import Azure from '../../assets/svg/azure.svg';
import Javascript from '../../assets/svg/javascript.svg';
import Tailwind from '../../assets/svg/tailwind.svg';
import React from '../../assets/svg/react.svg'

export default function Logo() {
  return (
    <section id="logo" className="bg-light dark:bg-dark py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-primary dark:text-dprimary">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5 ">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={Javascript}
            alt="Javascript"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={Azure}
            alt="Azure"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src={React}
            alt="React"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src={Tailwind}
            alt="Tailwind"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src={Sass}
            alt="Sass"
            width={158}
            height={48}
          />
        </div>
      </div>
    </section>
  )
}
