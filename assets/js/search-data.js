// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "post-control-system-design-of-a-2d-rocket",
        
          title: "Control system design of a 2D rocket",
        
        description: "LQG and nonlinear control of a 2D rocket for hovering, landing, and waypoint flight",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/2drocket/";
          
        },
      },{id: "post-nonlinear-control-of-a-dc-motor",
        
          title: "Nonlinear control of a DC motor",
        
        description: "Control system design using Lyapunov stability and sliding manifolds",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/nonlinear-controls/";
          
        },
      },{id: "post-basic-and-optimal-control-of-a-double-pendulum",
        
          title: "Basic and optimal control of a double pendulum",
        
        description: "Control system design using pole placement, linear quadratic regulator, and Kalman filter",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/pendulum/";
          
        },
      },{id: "post-iot-christmas-tree",
        
          title: "IoT Christmas Tree",
        
        description: "Coordinate- and sensor-based Christmas tree lighting",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/xmas-tree/";
          
        },
      },{id: "post-system-identification-of-a-dc-motor",
        
          title: "System identification of a DC motor",
        
        description: "White- and black-box approaches to motor control",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/sys-id/";
          
        },
      },{id: "post-eyes-in-the-pi-opencv",
        
          title: "Eyes in the Pi (OpenCV)",
        
        description: "Pocket-sized computer vision",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/opencv/";
          
        },
      },{id: "post-mini-foosball-table",
        
          title: "Mini foosball table",
        
        description: "Design, manufacturing, and assembly of a scaled-down foosball table",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/foosball/";
          
        },
      },{id: "post-deformation-of-a-wing",
        
          title: "Deformation of a wing",
        
        description: "Stress analysis of an airplane wing",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/aerostructures/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-started-my-bachelor-s-degree-at-the-george-washington-university-in-washington-dc-sparkles-smile",
          title: 'Started my bachelor’s degree at The George Washington University in Washington, DC! :sparkles:...',
          description: "",
          section: "News",},{id: "news-first-day-at-pennsylvania-department-of-transportation-as-a-summer-intern",
          title: 'First day at Pennsylvania Department of Transportation as a summer intern. 🚙🚃',
          description: "",
          section: "News",},{id: "news-began-study-abroad-semester-at-the-university-of-new-south-wales-in-sydney-australia",
          title: 'Began study abroad semester at the University of New South Wales in Sydney,...',
          description: "",
          section: "News",},{id: "news-first-day-as-instruments-intern-with-space-telescope-science-institute-telescope",
          title: 'First day as Instruments Intern with Space Telescope Science Institute! :telescope:🪐',
          description: "",
          section: "News",},{id: "news-presented-poster-on-cosmic-origins-spectrograph-cross-correlation-wavelength-calibration-at-aas-243-in-new-orleans-la",
          title: 'Presented poster on Cosmic Origins Spectrograph cross-correlation wavelength calibration at AAS 243 in...',
          description: "",
          section: "News",},{id: "news-began-research-and-training-in-ai-ml-as-an-undergraduate-research-assistant-with-the-intelligent-aerospace-systems-lab-at-gw-️-cloud",
          title: 'Began research and training in AI/ML as an undergraduate research assistant with the...',
          description: "",
          section: "News",},{id: "news-graduated-summa-cum-laude-from-gw-earning-the-bachelor-of-science-tada",
          title: 'Graduated summa cum laude from GW, earning the Bachelor of Science! 🎆:tada:',
          description: "",
          section: "News",},{id: "news-started-my-master-s-degree-at-gw",
          title: 'Started my master’s degree at GW! 📓🤖',
          description: "",
          section: "News",},{id: "news-first-day-as-graduate-teaching-assistant-for-the-cad-lab-mae-1004-at-gw-️-gear",
          title: 'First day as Graduate Teaching Assistant for the CAD Lab (MAE 1004) at...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/example_pdf.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
