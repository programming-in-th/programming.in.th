import React from 'react'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-0 my-auto p-6">
        <div className="flex w-full justify-around flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p className="text-gray-500 font-extrabold">PROGRAMMING.IN.TH</p>
            <p className="text-gray-500 font-light font-display">
              ยินดีต้อนรับสู่โปรแกรมมิ่งอินทีเอช
              ศูนย์รวมของโจทย์และเนื้อหาสำหรับ การเขียนโปรแกรมเพื่อการแข่งขัน
              และวิทยาการคอมพิวเตอร์
            </p>
            <div className="mt-2 hidden md:block">
              <p className="text-xs">
                © 2019-{new Date().getFullYear()} the PROGRAMMING.IN.TH team
              </p>
              <p className="text-xs">
                The source code for this website is available on{' '}
                <a
                  href="https://github.com/programming-in-th"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="font-medium">Resources</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="font-medium">Archives</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="font-medium">About</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="font-medium">Contact</p>
          </div>
        </div>
        <div className="text-xs text-center mt-4">
          <div className="mt-2 block md:hidden">
            <p className="text-xs">
              © 2019-{new Date().getFullYear()} the PROGRAMMING.IN.TH team
            </p>
            <p className="text-xs">
              The source code for this website is available on{' '}
              <a
                href="https://github.com/programming-in-th"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <p>Made with ♥ by PROGRAMMING.IN.TH team</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
