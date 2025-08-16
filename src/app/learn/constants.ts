export type LearnContentType = {
  label: string
  value: string
}

export type LearnSectionType = {
  label: string
  value: string
  content: LearnContentType[]
}

export type LearnLevelType = {
  label: string
  value: string
  sections: LearnSectionType[]
}

export const learnLevels: LearnLevelType[] = [
  {
    label: 'เตรียมตัวก่อนเข้าค่าย',
    value: 'prePosn',
    sections: [
      {
        label: 'คณิตศาสตร์',
        value: 'math',
        content: [
          {
            label: 'จำนวน ระบบจำนวน การดำเนินการของจำนวน',
            value: 'number-operation'
          },
          {
            label: 'ความสัมพันธ์ ฟังก์ชัน',
            value: 'function-relation'
          },
          {
            label: 'สมการ และ อสมการ',
            value: 'equation-inequality'
          },
          {
            label: 'เซต และ ตรรกศาสตร์',
            value: 'logic-set'
          },
          {
            label: 'การวัดและเรขาคณิต',
            value: 'geometry'
          },
          {
            label: 'สถิติและความน่าจะเป็น',
            value: 'prob-stats'
          }
        ]
      },
      {
        label: 'กระบวนการคิด',
        value: 'problem-solving',
        content: [
          {
            label: 'กระบวนการแก้ปัญหาที่มีการใช้ตรรกะ และฟังก์ชัน',
            value: 'problem-solving'
          }
        ]
      }
    ]
  },
  {
    label: 'ค่ายสอวน. 1',
    value: 'posn',
    sections: [
      {
        label: 'คณิตศาสตร์',
        value: 'math',
        content: [
          {
            label: 'ทฤษฎีตัวเลข เมทริกซ์',
            value: 'matrix'
          },
          {
            label: 'ลำดับและอนุกรม',
            value: 'sequence-series'
          },
          {
            label: 'เลขฐาน',
            value: 'radix'
          }
        ]
      },
      {
        label: 'การเขียนโปรแกรม',
        value: 'programming',
        content: [
          {
            label: 'พื้นฐานภาษา C และ C++',
            value: 'cpp-basic'
          },
          {
            label: 'การติดตั้งโปรแกรม',
            value: 'installation'
          },
          {
            label: 'การเขียนโปรแกรมรับข้อมูลเข้าและการแสดงผลข้อมูล',
            value: 'io'
          },
          {
            label: 'ชนิดของข้อมูล',
            value: 'datatype'
          }
        ]
      }
    ]
  },
  {
    label: 'ค่ายสอวน. 2 และระดับชาติ',
    value: 'toi',
    sections: [
      {
        label: 'คณิตศาสตร์',
        value: 'math',
        content: [
          {
            label: 'เวกเตอร์และระบบพิกัดคาร์ทีเซียน',
            value: 'vector-cartesian'
          }
        ]
      }
    ]
  },
  {
    label: 'สสวท.',
    value: 'ipst',
    sections: [
      {
        label: 'คณิตศาสตร์',
        value: 'math',
        content: [
          {
            label: 'เวกเตอร์และระบบพิกัดคาร์ทีเซียน',
            value: 'vector-cartesian'
          }
        ]
      }
    ]
  },
  {
    label: 'IOI',
    value: 'ioi',
    sections: [
      {
        label: 'คณิตศาสตร์',
        value: 'math',
        content: [
          {
            label: 'เวกเตอร์และระบบพิกัดคาร์ทีเซียน',
            value: 'vector-cartesian'
          }
        ]
      }
    ]
  }
]

export const learnSidebarSelects = [
  {
    label: 'Overview',
    value: 'overview'
  },
  ...learnLevels.map(({ label, value }) => ({ label, value }))
]
