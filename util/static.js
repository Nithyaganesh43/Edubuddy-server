let streams_exam_info = {
  streams_exam_info: {
    engineering: {
      name: 'Engineering',
      exams: {
        jee: {
          name: 'Joint Entrance Examination (JEE Main)',
          conductingBody: 'National Testing Agency (NTA)',
          eligibility:
            'Candidates who have passed 10+2 with Physics, Chemistry, and Mathematics.',
          examLocations: 'Across major cities in India.',
          registration:
            'Usually opens in December for the January session and in February for the April session.',
        },
        bitsat: {
          name: 'Birla Institute of Technology and Science Admission Test (BITSAT)',
          conductingBody:
            'Birla Institute of Technology and Science (BITS), Pilani',
          eligibility:
            '10+2 with Physics, Chemistry, and Mathematics and minimum 75% aggregate in PCM.',
          examLocations: 'Multiple centers across India.',
          registration: 'Begins typically in January and closes in April.',
        },
        viteee: {
          name: 'VIT Engineering Entrance Examination (VITEEE)',
          conductingBody: 'Vellore Institute of Technology (VIT)',
          eligibility: '10+2 with Physics, Chemistry, and Mathematics/Biology.',
          examLocations: 'Various cities across India.',
          registration: 'Usually starts in November and ends by March.',
        },
        manipal: {
          name: 'Manipal Entrance Test (MET)',
          conductingBody: 'Manipal Academy of Higher Education (MAHE)',
          eligibility:
            '10+2 or equivalent with Physics, Mathematics, and English as compulsory subjects.',
          examLocations:
            'Across India in online proctored mode or at designated test centers.',
          registration: 'Generally opens in December and closes by March.',
        },
        wbjee: {
          name: 'West Bengal Joint Entrance Examination (WBJEE)',
          conductingBody:
            'West Bengal Joint Entrance Examinations Board (WBJEEB)',
          eligibility: '10+2 with Physics, Chemistry, and Mathematics.',
          examLocations: 'Primarily in West Bengal and nearby states.',
          registration: 'Typically in December or January.',
        },
      },
    },
    medical: {
      name: 'Medical',
      exams: {
        neet: {
          name: 'National Eligibility cum Entrance Test (NEET)',
          conductingBody: 'National Testing Agency (NTA)',
          eligibility:
            '10+2 with Physics, Chemistry, Biology/Biotechnology with English.',
          examLocations: 'Multiple centers across India.',
          registration: 'Usually begins in February and closes by March.',
        },
        aiims: {
          name: 'AIIMS Entrance Exam',
          conductingBody: 'All India Institute of Medical Sciences (AIIMS)',
          eligibility: '10+2 with Physics, Chemistry, Biology and English.',
          examLocations: 'Major AIIMS campuses across India.',
          registration: 'Now merged into NEET; earlier conducted separately.',
        },
        jipmer: {
          name: 'JIPMER Entrance Exam',
          conductingBody:
            'Jawaharlal Institute of Postgraduate Medical Education & Research (JIPMER)',
          eligibility: '10+2 with PCB and English.',
          examLocations: 'Previously across various cities in India.',
          registration: 'Now merged into NEET UG.',
        },
        amc: {
          name: 'Armed Forces Medical College (AFMC) Entrance',
          conductingBody: 'Armed Forces Medical College (AFMC), Pune',
          eligibility:
            '10+2 with Physics, Chemistry, Biology and English with 60% aggregate.',
          examLocations: 'Selection through NEET; screening at AFMC campus.',
          registration: 'Register through NEET, followed by AFMC registration.',
        },
        aiapget: {
          name: 'All India AYUSH Post Graduate Entrance Test (AIAPGET)',
          conductingBody: 'National Testing Agency (NTA)',
          eligibility:
            'Graduates in AYUSH disciplines with completed internship.',
          examLocations: 'Various centers across India.',
          registration: 'Expected to begin in the last week of May 2025.',
        },
      },
    },
    commerce: {
      name: 'Commerce',
      exams: {
        cpt: {
          name: 'Common Proficiency Test (CPT)',
          conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
          eligibility:
            'Candidates who have registered with ICAI for the CPT course.',
          examLocations: 'Multiple centers across India.',
          registration:
            'The last date for online registration was November 23, 2024.',
        },
        cseet: {
          name: 'Company Secretary Executive Entrance Test (CSEET)',
          conductingBody: 'Institute of Company Secretaries of India (ICSI)',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Online mode.',
          registration:
            'July 2025 session registration is open until June 15, 2025.',
        },
        ca_foundation: {
          name: 'CA Foundation Exam',
          conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
          eligibility:
            'Candidates who have registered with ICAI for the Foundation course.',
          examLocations: 'Multiple centers across India.',
          registration:
            'The last date for registration for the May 2025 exam was December 18, 2024.',
        },
      },
    },
    arts: {
      name: 'Arts & Design',
      exams: {
        nift: {
          name: 'National Institute of Fashion Technology Entrance Exam (NIFT)',
          conductingBody: 'National Testing Agency (NTA)',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Various centers across India.',
          registration:
            'The online application started on November 22, 2024, and the last date for submission was January 6, 2025.',
        },
        nid: {
          name: 'National Institute of Design Entrance Exam (NID DAT)',
          conductingBody: 'National Institute of Design (NID)',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Various centers across India.',
          registration:
            'The application process for NID DAT 2025 started on September 3, 2024, and ended on December 6, 2024.',
        },
        ceed: {
          name: 'Common Entrance Examination for Design (CEED)',
          conductingBody: 'Indian Institute of Technology (IIT) Bombay',
          eligibility:
            'Candidates with a degree/diploma/postgraduate degree of at least 3 years after 10+2.',
          examLocations: 'Various centers across India.',
          registration:
            'The online registration started on October 1, 2024, and ended on November 18, 2024.',
        },
        uceed: {
          name: 'Undergraduate Common Entrance Exam for Design (UCEED)',
          conductingBody: 'Indian Institute of Technology (IIT) Bombay',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Various centers across India.',
          registration:
            'The online registration started on October 1, 2024, and ended on November 18, 2024.',
        },
      },
    },
    law: {
      name: 'Law',
      exams: {
        clat: {
          name: 'Common Law Admission Test (CLAT)',
          conductingBody: 'Consortium of National Law Universities (CNLU)',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Multiple centers across India.',
          registration:
            'The registration for CLAT 2025 opened on July 15, 2024, and closed on October 15, 2024.',
        },
        ailet: {
          name: 'All India Law Entrance Test (AILET)',
          conductingBody: 'National Law University, Delhi',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Various centers across India.',
          registration:
            'The application form for AILET 2025 was released on August 1, 2024, and the last date for submission was November 18, 2024.',
        },
        lsat: {
          name: 'Law School Admission Test (LSAT) India',
          conductingBody: 'Law School Admission Council (LSAC)',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Various centers across India.',
          registration:
            'Registration for the June 2025 LSAT ends on April 22, 2025.',
        },
        slat: {
          name: 'Symbiosis Law Admission Test (SLAT)',
          conductingBody: 'Symbiosis International (Deemed University)',
          eligibility: 'Candidates who have passed 10+2 or equivalent.',
          examLocations: 'Various centers across India.',
          registration:
            'The registration and payment for SLAT 2025 closed on November 22, 2024.',
        },
      },
    },
  },
};


let static_data = {
  static_data: {
    streams: {
      engineering: {
        name: 'Engineering',
        exams: {
          jee: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=jee+preparation',
              },
              {
                platform: 'GeeksforGeeks',
                platformLogoUrl:
                  'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png',
                link: 'https://www.geeksforgeeks.org/tag/jee/',
              },
            ],
          },
          bitsat: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=bitsat+preparation',
              },
              {
                platform: 'BITS Pilani',
                platformLogoUrl:
                  'https://seeklogo.com/images/B/bits-logo-19912.png',
                link: 'https://www.bitsadmit.com/',
              },
            ],
          },
          viteee: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=viteee+preparation',
              },
            ],
          },
          manipal: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=manipal+engineering+exam+preparation',
              },
            ],
          },
          wbjee: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=wbjee+preparation',
              },
            ],
          },
        },
      },
      medical: {
        name: 'Medical',
        exams: {
          neet: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=neet+preparation',
              },
              {
                platform: 'GeeksforGeeks',
                platformLogoUrl:
                  'https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200X200.png',
                link: 'https://www.geeksforgeeks.org/tag/neet/',
              },
            ],
          },
          aiims: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=aiims+preparation',
              },
            ],
          },
          jipmer: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=jipmer+preparation',
              },
            ],
          },
          afmc: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=afmc+preparation',
              },
            ],
          },
          aiapget: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=aiapget+preparation',
              },
            ],
          },
        },
      },
      commerce: {
        name: 'Commerce',
        exams: {
          cpt: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=cpt+exam+preparation',
              },
            ],
          },
          cseet: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=cseet+exam+preparation',
              },
            ],
          },
          ca_foundation: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=ca+foundation+exam+preparation',
              },
            ],
          },
          clat: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=clat+exam+preparation',
              },
            ],
          },
        },
      },
      arts: {
        name: 'Arts & Design',
        exams: {
          nift: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=nift+exam+preparation',
              },
            ],
          },
          nid: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=nid+exam+preparation',
              },
            ],
          },
          ceed: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=ceed+exam+preparation',
              },
            ],
          },
          uceed: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=uceed+exam+preparation',
              },
            ],
          },
        },
      },
      law: {
        name: 'Law',
        exams: {
          clat: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=clat+exam+preparation',
              },
            ],
          },
          ailet: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=ailet+exam+preparation',
              },
            ],
          },
          lsat: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=lsat+india+exam+preparation',
              },
            ],
          },
          slat: {
            learningMaterials: [
              {
                platform: 'YouTube',
                platformLogoUrl:
                  'https://img.icons8.com/color/48/youtube-play.png',
                link: 'https://www.youtube.com/results?search_query=slat+exam+preparation',
              },
            ],
          },
        },
      },
    },
  },
};

module.exports={static_data,streams_exam_info}
