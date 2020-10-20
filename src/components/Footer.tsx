import React from 'react'

export const Footer = () => (
  <footer className="border-t border-gray-200 text-gray-700">
    <div className="mx-auto p-6">
      <div className="flex w-full flex-col sm:flex-row justify-around">
        <div className="w-full sm:w-1/4">
          <p className="font-bold text-gray-600">PROGRAMMING.IN.TH</p>
          <p>
            ยินดีต้อนรับสู่โปรแกรมมิ่งอินทีเอช ศูนย์รวมของโจทย์และเนื้อหาสำหรับ
            การเขียนโปรแกรมเพื่อการแข่งขัน และวิทยาการคอมพิวเตอร์
          </p>

          <div className="mt-2 hidden sm:block">
            <p className="text-xs">
              © 2019-{new Date().getFullYear()} the PROGRAMMING.IN.TH team
            </p>
            <p className="text-xs">
              The source code for this website is available on{' '}
              <a
                className="hover:underline"
                href="https://github.com/programming-in-th"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>

        <div className="mt-2 sm:mt-0 font-semibold">Resources</div>
        <div className="mt-2 sm:mt-0 font-semibold">Archives</div>
        <div className="mt-2 sm:mt-0 font-semibold">About</div>
        <div className="mt-2 sm:mt-0 font-semibold">Contact</div>
      </div>

      <div className="text-xs text-center mt-4">
        <div className="mt-2 block sm:hidden">
          <p className="text-xs">
            © 2019-{new Date().getFullYear()} the PROGRAMMING.IN.TH team
          </p>
          <p className="text-xs">
            The source code for this website is available on{' '}
            <a
              className="hover:underline"
              href="https://github.com/programming-in-th"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p>Made with ♥ by PROGRAMMING.IN.TH team</p>
        </div>
      </div>
    </div>
  </footer>
)
